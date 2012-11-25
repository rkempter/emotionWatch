define([
    "backbone",
    "underscore",
    "jquery",
    "emotionwatch"
], function(Backbone, _, $, emotionWatch) {

    var emotionWatchCollection = Backbone.Collection.extend({

        model: emotionWatch,

        initialize: function() {
            this.bind('add', function() {
                console.log(this.toJSON());
            });
        },

    });

    return emotionWatchCollection;
});