define([
    "app",
    "backbone",
    "jquery",
    "lodash",
    "util",
    "constants"

], function(app, Backbone, $, _, util, Constants) {
    
    var compareTitleView = Backbone.View.extend({

        template: 'compare-title-template',

        initialize: function() {
            
            // Listen to global close event
            this.listenTo(app, 'close', this.close);

        },

        close: function() {
            this.remove();
            this.unbind();
        }

        
    });

    return compareTitleView;
});