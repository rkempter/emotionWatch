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

            this.listenTo(app, 'change:globalTime', function(dateTime) {
                var oldDateTime = self.collection.currentDateTime;
                var newDateTime = new Date(oldDateTime.getTime() + self.collection.timeStep*1000);
                self.collection.currentDateTime = dateTime;

                if(dateTime.getTime() != newDateTime.getTime()) {
                    this.$el.empty();
                    this.$el.find('li').removeClass('stop-animation');
                }

                self.collection.fetch({
                    data: $.param({
                        datetime: self.collection.currentDateTime,
                        emotion: self.collection.emotion,
                        hashtag: self.collection.keyword,
                        windowsize: self.collection.timeStep,
                        network: self.collection.network,
                        keywordType: self.collection.keywordType
                    })
                });
            });
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