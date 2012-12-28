define([
    "app",
    "backbone",
    "underscore",
    "jquery",
    "tweetmodel",
], function(app, Backbone, _, $, tweetModel) {

    var tweetCollection = Backbone.Collection.extend({

        initialize: function(options) {
            var self = this;
            this.datetime = new Date('July 28, 2012 18:00:00');
            this.windowsize = 120;
            this.hashtag = options.hashtag || '#gymnastics';
            this.emotion = undefined;
            this.network = options.network || 'twitter';
            this.fetch({ 
                data: $.param({ 
                    datetime: this.datetime,
                    emotion: this.emotion,
                    hashtag: this.hashtag,
                    windowsize: this.windowsize,
                    network: self.network,
                })
            });

            app.on('set:globalTime', function(currentDateTime) {
                self.datetime = currentDateTime;
                self.reset();
                self.fetch({ 
                    data: $.param({ 
                        datetime: currentDateTime,
                        emotion: self.emotion,
                        hashtag: self.hashtag,
                        windowsize: self.windowsize,
                        network: self.network,
                    })
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
                    hashtag: self.hashtag,
                    windowsize: self.windowsize,
                    network: self.network,
                })
            });
        },

        url: function() {
            return 'http://localhost:8080/tweets';
        },

        parse: function(response) {
            for(var i = 0; i < response.length; i++) {
                var text = response[i].tweet;
                console.log(text);
                text = this.replaceHashtags(text);
                console.log(text);
                text = this.replaceUsers(text);
                console.log(text);
                response[i].tweet = text;
            }
            this.add(response);
        },

        replaceHashtags: function(text) {
            console.log(text);
            var hashtags = text.match(/\B#\w+/gi) || new Array();
            for(var i = 0; i < hashtags.length; i++) {
                var url = '/search/keyword/'+hashtags[i].slice(1);
                var replacement = '<a href="'+url+'">'+hashtags[i]+'</a>';
                text = text.replace(hashtags[i], replacement);
                console.log(text);
            }

            return text;
        },

        replaceUsers: function(text) {
            var hashtags = text.match(/\B@\w+/gi) || new Array();
            for(var i = 0; i < hashtags.length; i++) {
                var url = '/search/user/'+hashtags[i].slice(1);
                var replacement = '<a href="'+url+'">'+hashtags[i]+'</a>';
                text = text.replace(hashtags[i], replacement);
            }

            return text;
        },
    });

    return tweetCollection;
});