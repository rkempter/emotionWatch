define([
    "app",
    "backbone",
    "jquery",
    "lodash",
    "util",
    "constants",

], function(app, Backbone, $, _, util, Constants) {
    
    var welcomeView = Backbone.View.extend({

        template: 'welcome',


        initialize: function() {
            
        },

        render: function() {
            var output = window.JST['app/templates/welcome.html']();
            $( this.el ).html( output );
        },
    });

    return welcomeView;
})  