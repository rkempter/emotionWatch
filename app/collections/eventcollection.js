define([
    "backbone",
    "underscore",
    "jquery",
    "eventmodel"
], function(Backbone, _, $, eventModel) {

    var eventCollection = Backbone.Collection.extend({

        model: eventModel,

        initialize: function(options) {
            var self = this;
            this.fetch({success: function() {
                self.trigger('collection:complete');
            }});
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