define([
  // Application.
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
  "eventcollectionview",
  "eventcollection",
  "videoview",
  "timeview",
  "titleview",
  "navigationview",
  "tweetfrequencycollection",
  "frequencypaperview",
  "paperview",
  "emotioncollectionview",
  "welcomeview"
],

function(app, _, $, Backbone, Raphael, Constants, emotionWatch, emotionWatchView, emotionWatchCollection, emotionWatchCollectionView, tweetCollection, tweetCollectionView, eventCollectionView, eventCollection, videoView, timeView, titleView, navigationView, tweetFrequencyCollection, frequencyPaperView, paperView, emotionCollectionView, welcomeView) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      "": "index",
      "about/": "about",
      "search": "search",
      "search/person/:name": "search",
      "search/keyword/:keyword": "search",
      "search/:network/keyword/:keyword/:timeStep/:startDateTime/:endDateTime": 'search',
      "search/:network/keyword/:keyword/:timeStep/:startDateTime/:endDateTime/:currentDateTime": 'search',
      "search/:network/user/:user/:timeStep/:startdatetime/:enddatetime": 'search',
      "search/:network/user/:user/:timeStep/:startdatetime/:enddatetime/:currentDateTime": 'search',
      "pattern/:network/keyword/:keyword/:timeStep/:startDateTime/:endDateTime": 'pattern',
      "pattern/:network/keyword/:keyword/:timeStep/:startDateTime/:endDateTime/:currentDateTime": 'pattern',
      "pattern/:network/user/:user/:timeStep/:startdatetime/:enddatetime": 'pattern',
      "pattern/:network/user/:user/:timeStep/:startdatetime/:enddatetime/:currentDateTime": 'pattern',
    },

    index: function() {
      app.useLayout('frontpage').setViews({
        ".paper": new emotionCollectionView({
          "width": "100%",
          "height": "100%",
          "x": 0,
          "y": 0,
        }),
        ".welcome": new welcomeView(),
      }).render();
    },

    search: function(network, keyword, timeStep, startDateTime, endDateTime, currentDateTime) {
      console.log("In search");
      var options = {};
      options.keyword = keyword || null;
      options.network = network || 'twitter',
      options.mode = 'search';
      options.timeStep = timeStep;
      options.startDateTime = startDateTime || "2012-07-26 00:00:00";
      options.endDateTime = endDateTime || "2012-08-13 14:00:00";
      options.currentDateTime = currentDateTime || options.startDateTime;
      options.timeStep = 24*60*60;

      app.useLayout('main-layout').setViews({
        ".watch .paper": new paperView( { "parent": ".watch .paper" } ),
        ".date-time-freq .paper": new frequencyPaperView( { "parent": ".date-time-freq .paper" } ),
        ".navigation": new navigationView(options),

      }).render();
    },

    pattern: function(network, keyword, timeStep, startDateTime, endDateTime, currentDateTime ) {
      console.log("In route pattern with keyword: "+keyword);
      var options = {};
      options.keyword = keyword || null;
      options.network = network || 'twitter',
      options.mode = 'pattern';
      options.startDateTime = parseInt(startDateTime) || "2012-07-26 00:00:00";
      options.endDateTime = parseInt(endDateTime) || "2012-08-13 14:00:00";
      options.timeStep = timeStep;
      options.currentDateTime = parseInt(currentDateTime) || options.startDateTime;
      app.useLayout('pattern-layout').setViews({
        ".date-time-freq .paper": new frequencyPaperView( { "parent": ".date-time-freq .paper" } ),
        ".navigation": new navigationView(options),
        "#middle-column .keyword-title": new titleView({
          model: new Backbone.Model({
            title: options.keyword
          }),
          el: '#middle-column .keyword-title',
        }),
        ".bottom": new Backbone.View({
          collection: new tweetFrequencyCollection(options),
        }),
        ".watch": new emotionWatchCollectionView({ 
          collection: new emotionWatchCollection({
            'startDateTime': options.startDateTime,
            'endDateTime': options.endDateTime,
            'keyword': '#'+options.keyword,
            'network': options.network,
            'timeStep': options.timeStep,
            'currentDateTime': options.currentDateTime,
          }) 
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
