define([
    "backbone",
    "jquery",
    "lodash",
    "tweetcollection",
], function(Backbone, $, _, tweetCollection) {

    var tweetCollectionView = Backbone.View.extend({

        template: 'tweetview',

        events: {
            'change #emotion-category': 'triggerEmotionCategory',
        },

        initialize: function() {
            this.listenTo(app, 'close', this.close);
        },

        // If an emotion is selected in the dropdown box, change model
        triggerEmotionCategory: function(event) {
            var emotion = $('#emotion-category option:selected').val();

            if(emotion == 'all') {
                emotion = '';
            }

            this.collection.setEmotion(emotion);
        },

        // Render template
        render: function() {
            var output = window.JST['app/templates/tweetview.html']();
            this.$el.html(output);
        },

        // Close view
        close: function() {
            // Remove all subviews
            for(var view in this.collection.viewPointer) {
                view.close();
            }

            this.unbind();
            this.remove();
        } ,
    })

    return tweetCollectionView;
});