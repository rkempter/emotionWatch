define([
    "backbone",
    "jquery",
    "lodash",
    "tweetcollection",
], function(Backbone, $, _, tweetCollection) {

    var tweetCollectionView = Backbone.View.extend({

        template: 'tweetview',

        events: {
            'click': 'triggerTest',
            'change #emotion-category': 'triggerEmotionCategory',
        },

        triggerTest: function() {
            console.log('rrrrrr');
        },

        triggerEmotionCategory: function(event) {
            console.log('event triggered');
            var emotion = $('#emotion-category option:selected').val();

            if(emotion == 'all') {
                emotion = '';
            }

            this.collection.setEmotion(emotion);
        },

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