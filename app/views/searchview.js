define([
    "app",
    "underscore",
    "jquery", 
    "backbone", 
    "raphael",
    'constants',
    "emotionwatch",
    "emotionwatchview",
    "emotionwatchcollection",
    "emotionwatchcollectionview",
    "tweetcollection",
    "tweetcollectionview",
    "eventcollectionview",
    "eventcollection",
    "plugins/bootstrap-tab"
], function(app, _, $, Backbone, Raphael, Constants, emotionWatch, emotionWatchView, emotionWatchCollection, emotionWatchCollectionView, tweetCollection, tweetCollectionView, eventCollectionView, eventCollection) {

    var searchView = Backbone.View.extend({

        template: 'search',

        events: {
            'click #search-form .search-btn': 'triggerSearch',
            'click #event-form .search-event-btn': 'triggerEventSearch',
            'click #start-watch': 'triggerStartWatch',
            'click #stop-watch': 'triggerStopWatch',
        },

        initialize: function() {
            this.insertViews({ ".event-selector": new eventCollectionView({
                    collection: new eventCollection(),
                })
            });

            this.hashtag = "#gymnastics"
        },

        createIndexWatch: function() {
            var watch = new emotionWatch({ 
                                paper: app.paper, 
                                emotionCircleRadius: 300,
                                startDate: new Date(this.startDateTime),
                                currentDateTime: new Date(this.startDateTime),
                                endDate: new Date(this.endDateTime),
                                centerPoint: {"x": 400, "y": 400},
                                topic: this.keyword,
                                network: this.network,
                            });
            var view = new emotionWatchView( { model: watch } );

            view.activateWatch();
            view.drawLabelTexts();

            this.insertViews({".watches": view});
        },

        createIndexTweets: function() {
            console.log("create Index tweets");
            this.insertViews({ ".info": new tweetCollectionView({
                    el: ".info",
                    collection: new tweetCollection({
                        hashtag: this.hashtag,
                        network: this.network,
                    }),
                })
            });
        },

        createPatternCollection: function() {
            this.insertViews({".watch": new emotionWatchCollectionView({ 
                collection: new emotionWatchCollection({
                    'radius': 100,
                    'startdate': new Date(this.startDateTime),
                    'enddate': new Date(this.endDateTime),
                    'keyword': this.keyword,
                    'network': this.network,
                  }) 
                })
            });
        },

        triggerSearch: function(event) {
            event.preventDefault();
            app.paper.clear();
            this.keyword = $('#search-form #keyword').val();
            this.startdate = $('#search-form select option:selected').attr('value');

            var route = Backbone.history.fragment;

            switch(route) {
                case "": 
                    this.createIndexWatch();
                    this.createIndexTweets();
                    break;
                case "pattern":
                    this.createPatternCollection();
                    break;
            };
        },

        triggerEventSearch: function(event) {
            event.preventDefault();
            app.paper.clear();
            this.keyword = $('#events option:selected').attr('data-hashtag');
            this.startDateTime = $('#events option:selected').attr('data-startDateTime');
            this.endDateTime = $('#events option:selected').attr('data-endDateTime');
            this.network = $('#network-event-selector option:selected ').attr('value');
            console.log('network: '+this.network);

            var route = Backbone.history.fragment;

            switch(route) {
                case "": 
                    this.createIndexWatch();
                    this.createIndexTweets();
                    break;
                case "pattern":
                    this.createPatternCollection();
                    break;
            };
        },

        triggerStartWatch: function() {
            console.log("Trigger the start of the watch");
            app.trigger('start:watch');
        },

        triggerStopWatch: function() {
            console.log("Trigger the stop of the watch");
            app.trigger('stop:watch');
        },
    });

    return searchView;
});