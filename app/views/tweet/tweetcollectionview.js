define([
    "backbone",
    "jquery",
    "lodash",
    "tweetcollection",
], function(Backbone, $, _, tweetCollection) {

    var tweetCollectionView = Backbone.View.extend({

        template: 'tweetview',

        initialize: function(options) {
            _.bindAll(this, 'render');

            this.collection = new tweetCollection( {
                "datetime": new Date('July 28, 2012 22:00:00'),
                "emotion": "love",
                "windowSize": "120",
            });
            this.collection.bind('add', this.render, this);

            // limit tweets to 50 per collection!!!!
        },

        render: function() {
            console.log( this.collection.models );
            this.template = window.JST['app/templates/tweetview.html']( { tweets: this.collection.models } );
            $(this.el).html( this.template );
        }
        

        // foreach tweet-> create new item        
    })

    return tweetCollectionView;
});