define([
    "backbone",
    "jquery",
    "lodash",
], function(Backbone, $, _) {

    var eventCollectionView = Backbone.View.extend({

        template: 'eventview',

        initialize: function(options) {

            this.collection.bind('collection:complete', this.render, this);
        },

        render: function() {
            var self = this;
            self.template = window.JST['app/templates/eventview.html']( { events: self.collection.models } );
            $('.search-event').html( self.template );
            console.log( self.template );
        },  
    });

    return eventCollectionView;
});