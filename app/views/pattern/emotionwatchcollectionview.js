define([
    "app",
    "backbone",
    "raphael",
    "lodash",
    "jquery",
    "emotionwatchview",
    "emotionwatchcollection",
], function(app, Backbone, Raphael, _, $, emotionWatchView, emotionWatchCollection) {

    var emotionWatchCollectionView = Backbone.View.extend({

        initialize: function() {
            var height = $(window).height() - 200;
            app.paper = Raphael(0, 100, "100%", 2000);
            app.paper.setViewBox(0, 0, "100%", height, false);

            // this.collection.bind('add', function(model) {
            //     this.renderEmotionWatch(model);
            // }, this);

            this.collection.trigger('view:initialized');
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