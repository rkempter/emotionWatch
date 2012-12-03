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

            app.on('change:currentDateTime', function(currentDateTime) {
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
            console.log(response);
            this.add(response);
        },
    });

    return tweetCollection;
});