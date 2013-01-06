define([
    "app",
    "raphael",
    "backbone",
    "lodash",
    "jquery",
    "emotioncollection"
], function(app, Raphael, Backbone, _, $, emotionCollection) {

    var emotionCollectionView = Backbone.View.extend({

        initialize: function() {
            // Define the paper for the frontpage
            app.paper = Raphael(0, 0, "100%", "100%");
            // Create new model for all emotion figures
            this.model = new emotionCollection();
            // Assign the canvas element to the view el
            this.el = app.paper.canvas;

            this.listenTo(app, 'close', this.close);
        },

        close: function() {
            this.remove();
            this.unbind();
        }

    });

    return emotionCollectionView;
});