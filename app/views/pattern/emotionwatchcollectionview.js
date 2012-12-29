define([
    "backbone",
    "lodash",
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
            var modelView = new emotionWatchView( { model: watch } );
            modelView.createEmotionShape();
            modelView.createTimeLineShape();
            $(this.el).append(modelView);
        },

    });

    return emotionWatchCollectionView;
});