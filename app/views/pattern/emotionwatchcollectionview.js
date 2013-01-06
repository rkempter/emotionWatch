define([
    "app",
    "backbone",
    "raphael",
    "lodash",
    "jquery",
    "emotionwatchview",
    "emotionwatchcollection"
], function(app, Backbone, Raphael, _, $, emotionWatchView, emotionWatchCollection) {

    var emotionWatchCollectionView = Backbone.View.extend({

        initialize: function() {
            // Create canvas for Paper
            app.paper = Raphael(0, 140, "100%", 2000);
            // Assign canvas DOM element to view element
            this.el = app.paper.canvas;
            // Let the collection know that the view has been initialized
            this.collection.trigger('view:initialized');
            // Clear everything that is drawn on the paper
            app.paper.clear();

            this.listenTo(app, 'close', this.close);
        },

        close: function() {
            this.remove();
            this.unbind();
        }

    });

    return emotionWatchCollectionView;
});