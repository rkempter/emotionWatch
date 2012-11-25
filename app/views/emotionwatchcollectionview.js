define([
    "backbone",
    "underscore",
    "jquery",
    "emotionwatchview",
    "emotionwatchcollection",
], function(Backbone, _, $, emotionWatchView, emotionWatchCollection) {

    var emotionWatchCollectionView = Backbone.View.extend({

        initialize: function() {
            this.collection.bind('add', function(model) {
                this.renderEmotionWatch(model);
            }, this);
        },

        renderEmotionWatch: function(watch) {
            console.log('render simple model');
            var modelView = new emotionWatchView( { model: watch } );
            $(this.el).append(modelView);
        },

    });

    return emotionWatchCollectionView;
});