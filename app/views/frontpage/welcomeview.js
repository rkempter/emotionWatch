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