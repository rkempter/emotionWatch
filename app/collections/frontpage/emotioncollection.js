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

            this.fetch();
        },

        url: function() {
            return "http://localhost:8080/frontPage";
        },

        parse: function(response) {
            for(var i = 0; i < response.length; i++) {
                var label = response[i]['hashtag'];
                var emotions = new Array();
                for(var index in response[i]) {
                    if(index !== 'hashtag') {
                        var emotion = {};
                        emotion.value = response[i][index];
                        emotions.push(emotion);
                    }
                }
                var model = new emotionModel({
                    label: label,
                    dataset: emotions,
                });

                var view = new emotionView({
                    model: model,
                });

                this.add(model);
                this.viewpointer.push(view);
            }
            this.add(response);
        },
    })

    return emotionCollection;
});