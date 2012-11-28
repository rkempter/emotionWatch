define([
    "backbone",
    "underscore",
    "jquery",
], function(Backbone, _, $) {

    var eventModel = Backbone.Model.extend({

        initialize: function() {
            console.log('new Event created');
        }

    })

    return eventModel;
});