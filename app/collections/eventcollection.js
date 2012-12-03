define([
    "backbone",
    "underscore",
    "jquery",
], function(Backbone, _, $) {

    var eventCollection = Backbone.Collection.extend({

        initialize: function(options) {
            this.fetch();
        },

        url: function() {
            return "http://localhost:8080/allEvents";
        },

        parse: function(response) {
            this.add(response);
        },
    })

    return eventCollection;
});