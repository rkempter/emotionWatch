define([
    "backbone",
    "underscore",
    "jquery",
    "emotionmodel",
    "emotionview",
], function(Backbone, _, $, emotionModel, emotionView) {

    var emotionCollection = Backbone.Collection.extend({

        initialize: function(options) {
            this.viewpointer = new Array();

            for(var i = 0; i < 40; i++) {
                var emotions = new Array();
                for(var j = 0; j < 20; j++) {
                    var emotion = {};
                    emotion.value = Math.random();
                    emotions.push(emotion);
                }

                var model = new emotionModel({
                    "dataset": emotions,
                });

                var view = new emotionView({
                    model: model,
                });
                
                this.add(model);
                this.viewpointer.push(view);

            }
        },

        url: function() {
            return "http://localhost:8080/frontPage";
        },

        parse: function(response) {
            // Create new Model and View for each of these elements
            this.add(response);
        },
    })

    return emotionCollection;
});