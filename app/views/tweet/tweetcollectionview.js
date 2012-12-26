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

            this.collection.bind('add', this.render, this);
        },

        events: {
            'change #emotion-category': 'triggerEmotionCategory',
        },

        triggerEmotionCategory: function(event) {
            event.preventDefault();
            var emotion = $('#emotion-category option:selected').val();

            if(emotion == 'all') {
                emotion = undefined;
            }

            this.collection.setEmotion(emotion);
        },

        render: function() {
            this.template = window.JST['app/templates/tweetview.html']( { tweets: this.collection.models, emotion: this.collection.emotion } );
            $(this.el).html( this.template );
        },  
    })

    return tweetCollectionView;
});