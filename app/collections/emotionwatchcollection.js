define([
    "backbone",
    "underscore",
    "jquery",
    "emotionwatch"
], function(Backbone, _, $, emotionWatch) {

    var emotionWatchCollection = Backbone.Collection.extend({

        model: emotionWatch,

    });

    return emotionWatchCollection;
});