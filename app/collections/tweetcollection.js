define([
    "backbone",
    "underscore",
    "jquery",
    "tweetmodel",
], function(Backbone, _, $, tweetModel) {

    var tweetCollection = Backbone.Collection.extend({

        initialize: function(options) {
            this.datetime = new Date('July 28, 2012 22:00:00');
            this.windowsize = 120;
            this.hashtag = '#gymnastics';
            this.emotion = 'love';
            this.fetch({ 
                data: $.param({ 
                    datetime: this.datetime,
                    emotion: this.emotion,
                    hashtag: this.hashtag,
                    windowsize: this.windowsize,
                })
            });
            // need: windowsize, datetime, emotion & evtl hashtag & evtl. user
        },

        url: function() {
            return 'http://localhost:8080/tweets';
        },

        setCurrentDateTime: function(datetime) {
            
        },

        parse: function(response) {
            this.add(response);
        },
    });

    return tweetCollection;
});