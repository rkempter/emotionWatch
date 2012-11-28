define([
    "backbone",
    "underscore",
    "jquery",
    "eventmodel",
], function(Backbone, _, $, eventModel) {

    var eventCollection = Backbone.Collection.extend({

        initialize: function(options) {
            this.currentTime = options.currentTime || null;
        },

        urlRoot: function() {
            return "http://localhost:8080/events";
        },

        setCurrentTime: function(datetime) {
            this.set("datetime", datetime);

            this.fetch({ data: $.param({ datetime: this.get("datetime") }) });

            // Check for each element in the collection, if still up to date
        },

        removeElement: function(model) {

        },
    })

    return eventModel;
});