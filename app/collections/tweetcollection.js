define([
    "app",
    "backbone",
    "lodash",
    "jquery",
    "constants",
    "tweetview"
], function(app, Backbone, _, $, Constants, tweetView) {

    var tweetCollection = Backbone.Collection.extend({

        viewPointer: [],

        initialize: function(options) {
            var self = this;
            this.emotion = '';
            this.keyword = options.keyword;
            this.timeStep = options.timeStep;
            this.network = options.network;
            this.keywordType = options.keywordType;
            this.currentDateTime = options.currentDateTime;
            this.fetch({ 
                data: $.param({ 
                    datetime: self.dateTime,
                    emotion: this.emotion,
                    hashtag: options.keyword,
                    windowsize: options.timeStep,
                    network: options.network,
                    keywordType: options.keywordType
                })
            });

            // Listen to the globalTime change event triggered from the clock.
            // Fetch new tweets according to the dateTime and the time slot length
            this.listenTo(app, 'change:globalTime', function(dateTime) {
                self.currentDateTime = dateTime;
                self.fetch({
                    data: $.param({
                        datetime: self.currentDateTime,
                        emotion: self.emotion,
                        hashtag: self.keyword,
                        windowsize: self.timeStep,
                        network: self.network,
                        keywordType: self.keywordType
                    })
                });
            });
        },

        // If emotion choosen, fetch tweets according to the emotion
        setEmotion: function(emotion) {
            this.emotion = emotion;
            
            this.fetch({
                data: $.param({
                    datetime: this.currentDateTime,
                    emotion: this.emotion,
                    hashtag: this.keyword,
                    windowsize: this.timeStep,
                    network: this.network,
                    keywordType: this.keywordType
                })
            });
        },

        url: function() {
            return 'http://localhost:8080/tweets';
        },

        parse: function(response) {

            // Delete tweets from the dom
            if(this.viewPointer.length > 30) {
                for(var i = 0; i < 10; i++) {
                    var model = this.shift();
                    var view = this.viewPointer.shift();
                    view.close();
                }
            }

            var x_numbers = this.generateRandomNumbers(response.length);
            var y_numbers = _.shuffle(x_numbers);
            
            var startDateTime = this.startDateTime;
            var endDateTime = this.endDateTime;

            for(var i = 0; i < response.length; i++) {
                var text = response[i].tweet;
                text = this.replaceHashtags(text);
                text = this.replaceUsers(text);
                response[i].tweet = text;

                var model = new Backbone.Model(response[i]);
                model.set('x', x_numbers[i]);
                model.set('y', y_numbers[i]);
                model.set('timeStep', this.timeStep);
                model.set('currentDateTime', this.currentDateTime);
                
                this.add(model);
            }
        },

        // Uses Regex to replace hashtags with links to visualizations
        // of these hashtags
        replaceHashtags: function(text) {
            var hashtags = text.match(/(\B#\w+|\B#([\u4E00-\uFA29]+|\w+)\#)/gi) || [];
            for(var i = 0; i < hashtags.length; i++) {
                // Create the link to the visualization page
                var url = '/search/'+this.network+'/keyword/'+hashtags[i].slice(1)+'/'+86400+'/'+Constants.startDateTime+'/'+Constants.endDateTime;
                var replacement = '<a href="'+url+'">'+hashtags[i]+'</a>';
                // Replace the hashtags with links
                text = text.replace(hashtags[i], replacement);
            }

            return text;
        },

        // Uses Regex to replace users with links to visualizations
        // of these users
        replaceUsers: function(text) {
            var hashtags = text.match(/(\B@\w+|\B@([\u4E00-\uFA29]+|\w+))/gi) || [];
            for(var i = 0; i < hashtags.length; i++) {
                var url = '/search/'+this.network+'/user/'+hashtags[i].slice(1)+'/'+86400+'/'+Constants.startDateTime+'/'+Constants.endDateTime;
                var replacement = '<a href="'+url+'">'+hashtags[i]+'</a>';
                text = text.replace(hashtags[i], replacement);
            }

            return text;
        },

        generateRandomNumbers: function(limit) {
            var unique_random_numbers = [];
            while (unique_random_numbers.length < limit ) {
                var random_number = Math.round(Math.random()*(limit-1));
                if (unique_random_numbers.indexOf(random_number) == -1) {
                    unique_random_numbers.push( random_number );
                }
            }

            return unique_random_numbers;
        }
    });

    return tweetCollection;
});