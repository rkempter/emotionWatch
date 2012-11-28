define([
    "backbone",
    "underscore",
    "jquery",
], function(Backbone, _, $) {

    var tweetModel = Backbone.Model.extend({

        initialize: function() {
            console.log('new Event created');
        }

    })

    return tweetModel;
});