define([
    "underscore",
    "jquery", 
    "backbone", 
    "raphael",
    'constants',
], function(_, $, Backbone, Raphael, Constants) {

    var navigationView = Backbone.View.extend({

        template: 'navbar',

        events: {
            'click .search-button': 'searchResult',
        },

        initialize: function() {
            console.log("test");
        },

        searchResult: function() {
            console.log("Event triggered");
        },

    });

    return navigationView;
});