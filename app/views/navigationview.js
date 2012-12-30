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

            var mode = options.mode || 'search';

            this.startDateTime = parseInt(options.startDateTime) || "2012-07-26 00:00:00";
            this.endDateTime = parseInt(options.endDateTime) || "2012-08-13 24:00:00";
            this.currentDateTime = options.currentDateTime || this.startDateTime;
            this.network = options.network || 'twitter';
            this.timeStep = 24*60*60;

            switch(mode) {
                case 'search':
                    if(null !== keyword) {
                        console.log(keyword);
                        this.keyword = '#'+keyword;
                        this.createSearchView();
                    }
                    break;
                case 'pattern':
                    if(null !== keyword) {
                        console.log(keyword);
                        this.keyword = '#'+keyword;
                        this.createPatternView();
                    }
                    break;
            }
            
        },

        createSearchView: function() {
            this.createIndexWatch();
            this.createIndexTweets();
            this.createIndexVideo();
            this.createTimeView();
            this.createTitleView();
        },

        createPatternView: function() {
            this.createTitleView();
            this.createTimeView(),
            this.createPatternCollection();
        },

        createIndexWatch: function() {
            var watch = new emotionWatch({ 
                                paper: app.paper, 
                                emotionCircleRadius: 250,
                                timeStep: this.timeStep,
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
                        hashtag: this.keyword,
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
            console.log("Create pattern view");
            this.insertViews({".watch": new emotionWatchCollectionView({ 
                collection: new emotionWatchCollection({
                    'startDateTime': new Date(this.startDateTime),
                    'endDateTime': new Date(this.endDateTime),
                    'keyword': this.keyword,
                    'network': this.network,
                    'currentDateTIme': this.currentDateTime,
                  }) 
                })
            });
        },

        triggerSearch: function(event) {
            event.preventDefault();
            app.paper.clear();
            this.keyword = $('#search-form #keyword').val();
            this.startDateTime = $('#search-form select option:selected').attr('value');

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
                    this.createSearchView();
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