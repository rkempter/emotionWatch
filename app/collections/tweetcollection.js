define([
    "app",
    "backbone",
    "underscore",
    "jquery",
    "tweetmodel",
    "constants",
], function(app, Backbone, _, $, tweetModel, Constants) {

    var tweetCollection = Backbone.Collection.extend({

        initialize: function(options) {
            var self = this;
            this.emotion = undefined;
            this.keyword = options.keyword;
            this.timeStep = options.timeStep;
            this.network = options.network;
            this.fetch({ 
                data: $.param({ 
                    datetime: options.currentDateTime,
                    emotion: this.emotion,
                    hashtag: options.keyword,
                    windowsize: options.timeStep,
                    network: options.network,
                })
            });

            app.on('change:globalTime', function(dateTime) {
                self.fetch({
                    data: $.param({
                        datetime: dateTime,
                        emotion: self.emotion,
                        hashtag: self.keyword,
                        windowsize: self.timeStep,
                        network: self.network,
                    }),
                });
            });
        },

        setEmotion: function(emotion) {
            var self = this;
            self.emotion = emotion;

            self.fetch({
                data: $.param({
                    datetime: self.datetime,
                    emotion: self.emotion,
                    hashtag: self.keyword,
                    windowsize: self.timeStep,
                    network: self.network,
                })
            });
        },

        url: function() {
            return 'http://localhost:8080/tweets';
        },

        // addAllTweets: function() {
        //     this.each(this.addOneTweet);
        // },

        // addOneTweet: function(tweet) {
        //     var view = new Backbone.View({
        //         tagname: li,
        //         model: tweet,
        //     });
        //     this.$('ul').append(view.render().el);
        // },

        parse: function(response) {
            for(var i = 0; i < response.length; i++) {
                var text = response[i].tweet;
                text = this.replaceHashtags(text);
                text = this.replaceUsers(text);
                response[i].tweet = text;
            }
            this.add(response);
        },

        replaceHashtags: function(text) {
            var hashtags = text.match(/\B#\w+/gi) || new Array();
            for(var i = 0; i < hashtags.length; i++) {
                var url = '/search/'+this.network+'/keyword/'+hashtags[i].slice(1)+'/'+86400+'/'+Constants.startDateTime+'/'+Constants.endDateTime;
                var replacement = '<a href="'+url+'">'+hashtags[i]+'</a>';
                text = text.replace(hashtags[i], replacement);
            }

            return text;
        },

        replaceUsers: function(text) {
            var hashtags = text.match(/\B@\w+/gi) || new Array();
            for(var i = 0; i < hashtags.length; i++) {
                var url = '/search/'+this.network+'/user/'+hashtags[i].slice(1)+'/'+86400+'/'+Constants.startDateTime+'/'+Constants.endDateTime;
                var replacement = '<a href="'+url+'">'+hashtags[i]+'</a>';
                text = text.replace(hashtags[i], replacement);
            }

            return text;
        },
    });

    return tweetCollection;
});