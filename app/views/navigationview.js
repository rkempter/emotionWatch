define([
    "app",
    "lodash",
    "jquery", 
    "backbone", 
    "raphael",
    'constants',
], function(app, _, $, Backbone, Raphael, Constants) {

    var navigationView = Backbone.View.extend({

        template: 'navbar',

        initialize: function() {
            console.log("test");
        },

        searchResult: function() {
            console.log("Event triggered");
        },

    });

    return navigationView;
});