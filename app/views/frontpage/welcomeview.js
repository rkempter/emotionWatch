define([
    "app",
    "backbone",
    "jquery",
    "lodash",
    "util",
    "constants",
    "searcheventview",
    "searchkeywordview"

], function(app, Backbone, $, _, util, Constants, searchEventView, searchKeywordView) {
    
    var welcomeView = Backbone.View.extend({

        template: 'welcome',

        initialize: function() {

            // Insert the eventSearch view on the left side and the
            // keyword search view on the right.
            this.insertViews({ 
                ".left": new searchEventView(),
                ".right": new searchKeywordView()
            });

            // Bind view to close event
            this.listenTo(app, 'close', this.close);
        },

        close: function() {
            this.remove();
            this.unbind();
        }
    });

    return welcomeView;
});