define([
    "backbone",
    "underscore",
    "jquery",
    "emotionmodel",
    "emotionview",
    "app"
], function(Backbone, _, $, emotionModel, emotionView, app) {

    var emotionCollection = Backbone.Collection.extend({

        initialize: function(options) {
            this.viewpointer = [];

            this.fetch();
        },

        url: function() {
            return app.server+"frontPage";
        },

        parse: function(response) {
            for(var i = 0; i < response.length; i++) {
                var label = response[i].hashtag;
                var network = response[i].network;
                console.log(network);
                var emotions = [];
                for(var index in response[i]) {
                    if(index !== 'hashtag' && index !== 'network') {
                        var emotion = {};
                        emotion.value = response[i][index];
                        emotions.push(emotion);
                    }
                }
                var model = new emotionModel({
                    label: label,
                    network: network,
                    dataset: emotions
                });

                var view = new emotionView({
                    model: model
                });

                this.add(model);
                this.viewpointer.push(view);
            }
            this.add(response);
        }
    });

    return emotionCollection;
});