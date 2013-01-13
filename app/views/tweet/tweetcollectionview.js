define([
    "backbone",
    "jquery",
    "lodash",
    "tweetcollection",
    "app",
    "tweetview"
], function(Backbone, $, _, tweetCollection, app, tweetView) {

    var tweetCollectionView = Backbone.View.extend({

        tagName: 'ul',

        events: {
            'change #emotion-category': 'triggerEmotionCategory'
        },

        initialize: function() {
            _.bindAll(this, 'addOne');
            var self = this;
            this.listenTo(app, 'close', this.close);
            this.collection.on('add', this.addOne);
        },

        // If an emotion is selected in the dropdown box, change model
        triggerEmotionCategory: function(event) {
            var emotion = $('#emotion-category option:selected').val();

            if(emotion == 'all') {
                emotion = '';
            }

            this.collection.setEmotion(emotion);
        },

        addOne: function(model) {
            console.log('this takes hours');
            var view = new tweetView({
                model: model
            });
            this.collection.viewPointer.push(view);
            this.$el.append(view.el);
        },

        // Close view
        close: function() {
            // Remove all subviews

            for(var i = 0; i < this.collection.viewPointer.length; i++) {
                var view = this.collection.viewPointer[i];
                view.close();
            }

            if(this.collection) {
                this.collection.stopListening();
                this.collection.remove();
            }

            this.unbind();
            this.remove();
        }
    });

    return tweetCollectionView;
});