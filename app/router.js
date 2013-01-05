define([
  // Application.
  "util",
  "app",
  "lodash",
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
  "videoview",
  "timeview",
  "titleview",
  "navigationview",
  "tweetfrequencycollection",
  "frequencypaperview",
  "paperview",
  "emotioncollectionview",
  "welcomeview",
  "detailview",
],

function(util, app, _, $, Backbone, Raphael, Constants, emotionWatch, emotionWatchView, emotionWatchCollection, emotionWatchCollectionView, tweetCollection, tweetCollectionView, videoView, timeView, titleView, navigationView, tweetFrequencyCollection, frequencyPaperView, paperView, emotionCollectionView, welcomeView, detailView) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      "": "index",
      "about/": "about",
      "search": "search",
      "search/:network/:keywordType/:keyword/:timeStep/:startDateTime/:endDateTime": 'search',
      "search/:network/:keywordType/:keyword/:timeStep/:startDateTime/:endDateTime/:currentDateTime": 'search',
      "pattern/:network/:keywordType/:keyword/:timeStep/:startDateTime/:endDateTime": 'pattern',
      "pattern/:network/:keywordType/:keyword/:timeStep/:startDateTime/:endDateTime/:currentDateTime": 'pattern',
      "compare/:keywordType/:keyword/:timeStep/:startDateTime/:endDateTime": 'compare',
      "compare/:keywordType/:keyword/:timeStep/:startDateTime/:endDateTime/:currentDateTime": 'compare',
    },

    index: function() {
      $('#main').empty();
      app.trigger('close');
      
      app.useLayout('frontpage').setViews({
        ".paper": new emotionCollectionView({
          "width": "100%",
          "height": "100%",
          "x": 0,
          "y": 0,
        }),
        ".welcome": new welcomeView()
      }).render();
    },

    search: function(network, keywordType, keyword, timeStep, startDateTime, endDateTime, currentDateTime) {
      $('#main').empty();

      app.trigger('close');

      var options = {};
      options.keyword = util.combineKeyword(keyword, keywordType);
      options.network = network || 'twitter';
      options.mode = 'regular';
      options.timeStep = timeStep;

      var startDateTime_raw = parseInt(startDateTime) ||  new Date("2012-07-26 00:00:00");
      var endDateTime_raw =  parseInt(endDateTime) ||  new Date("2012-08-13 24:00:00");
      var currentDateTime_raw =  parseInt(currentDateTime) || startDateTime_raw;

      options.startDateTime = new Date(startDateTime_raw);
      options.endDateTime = new Date(endDateTime_raw);
      options.currentDateTime = new Date(currentDateTime_raw);

      app.useLayout('main-layout').setViews({
        ".time-block": new timeView(options),

        ".detail-block": new detailView({
          model: new Backbone.Model(),
        }),

        ".watch .paper": new paperView( { "parent": ".watch .paper" } ),
        ".date-time-freq .paper": new frequencyPaperView({ 
          "parent": ".date-time-freq .paper",
          "network": options.network,
        }),
        ".navigation": new navigationView(options),
        // "#player": new videoView(),
        ".watches": new emotionWatchView({ 
          model: new emotionWatch({ 
            paper: app.paper, 
            mode: options.mode,
            emotionCircleRadius: 250,
            timeStep: options.timeStep,
            startDate: options.startDateTime,
            currentDateTime: options.currentDateTime,
            endDate: options.endDateTime,
            centerPoint: {"x": 500, "y": 400},
            topic: options.keyword,
            network: options.network,
          }) 
        }),
        ".tweets": new tweetCollectionView({
          collection: new tweetCollection(options),
        }),
        "#middle-column .keyword-title": new titleView({
            model: new Backbone.Model(options),
            el: '#middle-column .keyword-title',
        }),
        ".bottom": new Backbone.View({
          collection: new tweetFrequencyCollection(options),
        }),
      }).render();
    },

    pattern: function(network, keywordType, keyword, timeStep, startDateTime, endDateTime, currentDateTime ) {
      $('#main').empty();
      app.trigger('close');

      var options = {};
      options.keyword = util.combineKeyword(keyword, keywordType);
      options.network = network || 'twitter',
      options.mode = 'pattern';
      startDateTime_raw = parseInt(startDateTime) || "2012-07-26 00:00:00";
      endDateTime_raw = parseInt(endDateTime) || "2012-08-13 14:00:00";
      options.timeStep = timeStep;
      currentDateTime_raw = parseInt(currentDateTime) || options.startDateTime;

      options.startDateTime = new Date(startDateTime_raw);
      options.endDateTime = new Date(endDateTime_raw);
      options.currentDateTime = new Date(currentDateTime_raw);

      app.useLayout('pattern-layout').setViews({
        ".detail-block": new detailView({
          model: new Backbone.Model(),
        }),

        ".date-time-freq .paper": new frequencyPaperView({ 
          "parent": ".date-time-freq .paper",
          "network": options.network, 
        }),

        ".navigation": new navigationView(options),

        "#middle-column .keyword-title": new titleView({
          model: new Backbone.Model(options),
          el: '#middle-column .keyword-title',
        }),

        ".bottom": new Backbone.View({
          collection: new tweetFrequencyCollection(options),
        }),
        
        ".watch": new emotionWatchCollectionView({ 
          collection: new emotionWatchCollection({
            'startDateTime': options.startDateTime,
            'endDateTime': options.endDateTime,
            'keyword': options.keyword,
            'network': options.network,
            'timeStep': options.timeStep,
            'currentDateTime': options.currentDateTime,
          }) 
        }),
      }).render();
    },

    compare: function(keywordType, keyword, timeStep, startDateTime, endDateTime, currentDateTime) {
      $('#main').empty();
      app.trigger('close');
      var options = {};
      console.log(keyword);
      options.keyword = util.combineKeyword(keyword, keywordType);
      options.mode = 'compare';
      startDateTime_raw = parseInt(startDateTime) || "2012-07-26 00:00:00";
      endDateTime_raw = parseInt(endDateTime) || "2012-08-13 14:00:00";
      options.timeStep = timeStep;
      currentDateTime_raw = parseInt(currentDateTime) || options.startDateTime;

      options.startDateTime = new Date(startDateTime_raw);
      options.endDateTime = new Date(endDateTime_raw);
      options.currentDateTime = new Date(currentDateTime_raw);

      app.useLayout('compare-layout').setViews({
        ".time-block": new timeView({
            startDateTime: options.startDateTime,
            endDateTime: options.endDateTime,
            timeStep: options.timeStep,
            currentDateTime: options.currentDateTime,
        }),
        ".weibo .watch .paper": new paperView({ 
          "parent": ".weibo .watch .paper",
          "mode": "compare",
          "network": "weibo",
        }),
        ".twitter .watch .paper": new paperView({ 
          "parent": ".twitter .watch .paper",
          "mode": "compare",
          "network": "twitter",
        }),
        ".weibo .date-time-freq .paper": new frequencyPaperView({ 
          "parent": ".weibo .date-time-freq .paper", 
          "network": "weibo",
        }),
        ".twitter .date-time-freq .paper": new frequencyPaperView({
          "parent": ".twitter .date-time-freq .paper", 
          "network": "twitter",
        }),
        ".navigation": new navigationView(options),
        "#middle-column .keyword-title": new titleView({
          model: new Backbone.Model(options),
          el: '#middle-column .keyword-title',
        }),
        ".twitter .bottom .freq": new Backbone.View({
          collection: new tweetFrequencyCollection({
            'startDateTime': options.startDateTime,
            'endDateTime': options.endDateTime,
            'keyword': options.keyword,
            'network': 'twitter',
            'timeStep': options.timeStep,
            'mode': options.mode,
            'currentDateTime': options.currentDateTime,
          }),
          mode: 'compare',
        }),
        ".weibo .bottom .freq": new Backbone.View({
          collection: new tweetFrequencyCollection({
            'startDateTime': options.startDateTime,
            'endDateTime': options.endDateTime,
            'keyword': options.keyword,
            'network': 'weibo',
            'timeStep': options.timeStep,
            'mode': options.mode,
            'currentDateTime': options.currentDateTime,
          }),
          mode: 'compare',
        }),
        ".twitter .watch .watch-view": new emotionWatchView({ 
          model: new emotionWatch({
            paper: app.paper["twitter"], 
            mode: options.mode,
            emotionCircleRadius: 250,
            timeStep: options.timeStep,
            startDate: options.startDateTime,
            currentDateTime: options.currentDateTime,
            endDate: options.endDateTime,
            centerPoint: {"x": 400, "y": 400},
            topic: options.keyword,
            network: 'twitter',
          }),
          mode: 'compare',
        }),
        ".weibo .watch .watch-view": new emotionWatchView({ 
          model: new emotionWatch({
            paper: app.paper['weibo'], 
            mode: options.mode,
            emotionCircleRadius: 250,
            timeStep: options.timeStep,
            startDate: options.startDateTime,
            currentDateTime: options.currentDateTime,
            endDate: options.endDateTime,
            centerPoint: {"x": 400, "y": 400},
            topic: options.keyword,
            network: 'weibo',
          }),
          mode: 'compare',
        }),
      }).render();
    },

    about: function() {
      app.useLayout().setViews({
        ".navigation": new searchView({"template": "search-topbar"} )
      }).render();
    },

    initialize: function() {

    }
  });

  return Router;

});
