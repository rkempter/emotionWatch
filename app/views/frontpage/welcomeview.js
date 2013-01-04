define([
    "app",
    "backbone",
    "jquery",
    "lodash",
    "util",
    "constants",
    "searcheventview",
    "searchkeywordview",

], function(app, Backbone, $, _, util, Constants, searchEventView, searchKeywordView) {
    
    var welcomeView = Backbone.View.extend({

        template: 'welcome',

        initialize: function() {

            this.model = new Backbone.Model();

            this.insertViews({ 
                ".left": new searchEventView(),
                ".right": new searchKeywordView(),
            });
        },

        clear: function() {
          this.model.destroy();
        },
    });

    return welcomeView;
})  