define([
    "app",
    "raphael",
    "backbone",
    "lodash",
    "jquery",
], function(app, Raphael, Backbone, _, $) {

    var tweetFrequencyCollectionView = Backbone.View.extend({

    	initialize: function() {
    		var self = this;
    		this.listenTo(app, 'close', self.close);
    	},

        close: function() {

            if(this.collection) {
                this.collection.stopListening();
                this.collection.remove();
                this.collection.unbind();
            }
            
            this.remove();
            this.unbind();
        }

    });

    return tweetFrequencyCollectionView;
});