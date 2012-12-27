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
    "videoview",
    "timeview",
    "titleview",
    "plugins/bootstrap-tab",

], function(app, _, $, Backbone, Raphael, Constants, emotionWatch, emotionWatchView, emotionWatchCollection, emotionWatchCollectionView, tweetCollection, tweetCollectionView, eventCollectionView, eventCollection, videoView, timeView, titleView) {

    var navigationView = Backbone.View.extend({

        template: 'navbar',

        events: {
            'click #search-form .search-btn': 'triggerSearch',
            'click #event-form .search-event-btn': 'triggerEventSearch',
            'click #start-watch': 'triggerStartWatch',
            'click #stop-watch': 'triggerStopWatch',
            'click #search-hashtag #hashtag-search-button': 'triggerHashtagSearch',
        },

        initialize: function(options) {
            this.insertViews({ "#search-event": new eventCollectionView({
                    collection: new eventCollection(),
                })
            });
            var options = options || {};
            var keyword = options.keyword || null;

            if(null !== keyword) {
                this.hashtag = '#'+keyword;
                this.createIndexWatch();
                this.createIndexTweets();
                this.createIndexVideo();
                this.createTimeView();
            }

            this.hashtag = "#gymnastics"
        },

        createIndexWatch: function() {
            var watch = new emotionWatch({ 
                                paper: app.paper, 
                                emotionCircleRadius: 250,
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

            this.insertViews( { ".date-time-freq": view } );
        },

        createIndexVideo: function() {
            console.log("Videoview creation");
            var video = new videoView();

            this.insertViews( { "#player": video } );
        },

        createIndexTweets: function() {
            console.log("create Index tweets");
            this.insertViews({ ".tweets": new tweetCollectionView({
                    el: ".tweets",
                    collection: new tweetCollection({
                        hashtag: this.hashtag,
                        network: this.network,
                    }),
                })
            });
        },

        createTimeView: function() {
            this.insertViews({ ".time-block": new timeView({
                el: ".time-block",
                })
            });
        },

        createTitleView: function() {
            this.insertViews( {
                "#middle-column .keyword-title": new titleView({
                    title: this.keyword,
                    el: '#middle-column .keyword-title',
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

            console.log(route);

            switch(route) {
                case "search": 
                    this.createIndexWatch();
                    this.createIndexTweets();
                    this.createIndexVideo();
                    this.createTimeView();
                    break;
                case "pattern":
                    this.createPatternCollection();
                    break;
            };
        },

        triggerEventSearch: function(event) {
            event.preventDefault();
            app.paper.clear();
            this.keyword = $('#search-event option:selected').attr('data-hashtag');
            this.startDateTime = $('#search-event option:selected').attr('data-startDateTime');
            this.endDateTime = $('#search-event option:selected').attr('data-endDateTime');
            this.network = $('#search-event #network-event-selector option:selected ').attr('value');

            var route = Backbone.history.fragment;

            switch(route) {
                case "": 
                    this.createIndexWatch();
                    this.createIndexTweets();
                    this.createIndexVideo();
                    this.createTimeView();
                    this.createTitleView(this.keyword);
                    break;
                case "pattern":
                    this.createPatternCollection();
                    break;
            };
        },

        triggerHashtagSearch: function(event) {
            console.log("Search trigger");
            event.preventDefault();
            app.paper.clear();
            this.keyword = $('#search-hashtag #hashtag-field').attr('value');
            this.startDateTime = $('#search-hashtag #start-date-time').attr('value');
            this.endDateTime = $('#search-hashtag #end-date-time').attr('value');
            this.network = $('#search-hashtag #network option:selected').attr('value');

            var route = Backbone.history.fragment;

            console.log(route);

            switch(route) {
                case "search":
                    this.createIndexWatch();
                    this.createIndexTweets();
                    this.createIndexVideo();
                    this.createTimeView();
                    this.createTitleView();
                    break;
                case "pattern":
                    this.createPatternCollection();
                    break;
            }
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

    return navigationView;
});