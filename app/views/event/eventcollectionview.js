define([
    "backbone",
    "jquery",
    "lodash",
    "tweetcollection",
], function(Backbone, $, _, tweetCollection) {

    var eventCollectionView = Backbone.View.extend({

        template: 'eventview',

        initialize: function(options) {
            _.bindAll(this, 'render');
            this.collection.on('add', this.render);
        },

        render: function() {
            this.template = window.JST['app/templates/eventview.html']( { events: this.collection.models } );
            $('.event-selector').html( this.template );
        },  

    })

    return eventCollectionView;
});