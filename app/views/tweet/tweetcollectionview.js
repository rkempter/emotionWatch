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

        className: 'stop-animation',

        initialize: function() {
            _.bindAll(this, 'addOne');
            var self = this;
            this.listenTo(app, 'close', this.close);
            this.collection.on('add', this.addOne);
            this.listenTo(app, 'start:all', this.startTweetAnimation);

            this.listenTo(app, 'change:globalTime', function(dateTime) {
                var oldDateTime = self.collection.currentDateTime;
                var newDateTime = new Date(oldDateTime.getTime() + self.collection.timeStep*1000);
                self.collection.currentDateTime = dateTime;

                // Jump
                if(dateTime.getTime() != newDateTime.getTime()) {
                    this.$el.empty();
                    this.$el.find('li').removeClass('stop-animation');
                }

                self.collection.fetch({
                    data: $.param({
                        datetime: self.collection.currentDateTime,
                        hashtag: self.collection.keyword.split(","),
                        windowsize: self.collection.timeStep,
                        network: self.collection.network,
                        keywordType: self.collection.keywordType
                    })
                });
            });
        },

        addOne: function(model) {
            var view = new tweetView({
                model: model
            });
            this.collection.viewPointer.push(view);
            this.$el.append(view.el);
        },

        startTweetAnimation: function() {
            this.$el.removeClass('stop-animation');
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
                this.collection.unbind();
            }

            this.unbind();
            this.remove();
        }
    });

    return tweetCollectionView;
});