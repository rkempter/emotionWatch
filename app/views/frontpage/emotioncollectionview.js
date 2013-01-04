define([
    "app",
    "raphael",
    "backbone",
    "lodash",
    "jquery",
    "emotioncollection",
], function(app, Raphael, Backbone, _, $, emotionCollection) {

    var emotionCollectionView = Backbone.View.extend({

        initialize: function() {
            app.paper = Raphael(0, 0, "100%", "100%");

            this.model = new emotionCollection();

            this.el = app.paper.canvas;
        },

        cleanup: function() {
          this.collection.off(null, null, this);
        },

        clear: function() {
          this.model.destroy();
        },

    });

    return emotionCollectionView;
});