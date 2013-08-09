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
  "navigationview",
  "tweetfrequencycollection",
  "frequencypaperview",
  "paperview",
  "emotioncollectionview",
  "welcomeview",
  "detailview",
  "navigationmodel",
  "videomodel",
  "timeview_compare",
  "compareview"
],

function(util, app, _, $, Backbone, Raphael, Constants, emotionWatch, emotionWatchView, emotionWatchCollection, emotionWatchCollectionView, tweetCollection, tweetCollectionView, videoView, timeView, navigationView, tweetFrequencyCollection, frequencyPaperView, paperView, emotionCollectionView, welcomeView, detailView, navigationModel, videoModel, timeCompareView, compareView) {

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
      "compare/:networkLeft/:keywordTypeLeft/:keywordLeft/:networkRight/:keywordTypeRight/:keywordRight/:timeStep/:startDateTime/:endDateTime": 'compare',
      'comparesearch': 'compareInit'
    },

    close: function() {
      $('#main').empty();
      $('body').attr('class', '');
      app.trigger('close');
    },

    index: function() {
      this.close();
      
      app.useLayout('frontpage').setViews({
        ".paper": new emotionCollectionView({
          "width": "100%",
          "height": "100%",
          "x": 0,
          "y": 0
        }),
        ".welcome": new welcomeView()
      }).render();
    },

    search: function(network, keywordType, keyword, timeStep, startDateTime, endDateTime, currentDateTime) {
      this.close();

      var options = {};
      options.network = network || 'twitter';
      options.keyword = util.combineKeyword(keyword, keywordType);
      options.keywordType = keywordType;

      options.mode = 'regular';
      options.timeStep = timeStep;

      var startDateTime_raw = parseInt(startDateTime) ||  new Date("2012-07-26 00:00:00");
      var endDateTime_raw =  parseInt(endDateTime) ||  new Date("2012-08-13 24:00:00");
      var currentDateTime_raw =  parseInt(currentDateTime) || startDateTime_raw;

      options.startDateTime = new Date(startDateTime_raw);
      options.endDateTime = new Date(endDateTime_raw);
      options.currentDateTime = new Date(currentDateTime_raw);

      app.useLayout('main-layout').setViews({
        "#bottom .current-time-box": new timeView(options),

        ".detail-block": new detailView({
          model: new Backbone.Model()
        }),

        ".watch .paper": new paperView( { "parent": ".watch .paper" } ),
        ".date-time-freq .paper": new frequencyPaperView({ 
          "parent": ".date-time-freq .paper",
        }),

        ".navigation": new navigationView({
          model: new navigationModel(options)
        }),

        "#player": new videoView({
          model: new videoModel(options)
        }),
        
        ".watches": new emotionWatchView({ 
          model: new emotionWatch({ 
            paper: app.paper, 
            mode: options.mode,
            emotionCircleRadius: 250,
            timeStep: options.timeStep,
            startDate: options.startDateTime,
            currentDateTime: options.currentDateTime,
            endDate: options.endDateTime,
            centerPoint: {"x": 500, "y": 410},
            topic: options.keyword,
            network: options.network,
            keywordType: options.keywordType
          }) 
        }),
        ".tweets": new tweetCollectionView({
          collection: new tweetCollection(options)
        }),
        ".bottom": new Backbone.View({
          collection: new tweetFrequencyCollection(options)
        })
      }).render();
    },

    pattern: function(network, keywordType, keyword, timeStep, startDateTime, endDateTime, currentDateTime ) {
      this.close();

      var options = {};
      options.keyword = util.combineKeyword(keyword, keywordType);
      options.network = network || 'twitter',
      options.keywordType = keywordType;
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
          model: new Backbone.Model()
        }),

        ".date-time-freq .paper": new frequencyPaperView({ 
          "parent": ".date-time-freq .paper",
        }),

        ".navigation": new navigationView({
          model: new navigationModel(options)
        }),

        ".bottom": new Backbone.View({
          collection: new tweetFrequencyCollection(options)
        }),
        
        ".watch": new emotionWatchCollectionView({ 
          collection: new emotionWatchCollection({
            'startDateTime': options.startDateTime,
            'endDateTime': options.endDateTime,
            'keyword': options.keyword,
            'network': options.network,
            'timeStep': options.timeStep,
            'currentDateTime': options.currentDateTime
          }) 
        })
      }).render();
    },

    compareInit: function() {
      app
        .useLayout('comparison-wrapper')
        .setViews({
          '#comparison': new compareView()
        }).render();
    },

    compare: function(networkLeft, keywordTypeLeft, keywordLeft, networkRight, keywordTypeRight, keywordRight, timeStep, startDateTime, endDateTime, currentDateTime) {
      this.close();

      var options = {};
      options.leftId = 'left';
      options.rightId = 'right';
      options.keywordTypeLeft = keywordTypeLeft;
      options.keywordTypeRight = keywordTypeRight;
      options.keywordLeft = util.combineKeyword(keywordLeft, keywordTypeLeft);
      options.keywordRight = util.combineKeyword(keywordRight, keywordTypeRight);
      options.networkLeft = networkLeft;
      options.networkRight = networkRight;

      options.mode = 'compare';

      startDateTime_raw = parseInt(startDateTime) || "2012-07-26 00:00:00";
      endDateTime_raw = parseInt(endDateTime) || "2012-08-13 14:00:00";
      options.timeStep = timeStep;
      currentDateTime_raw = options.startDateTime;

      options.startDateTime = new Date(startDateTime_raw);
      options.endDateTime = new Date(endDateTime_raw);
      options.currentDateTime = new Date(currentDateTime_raw);

      console.log('is time: '+util.isValidDate(options.startDateTime));

      app.useLayout('compare-layout').setViews({
        // left bottom
        ".left-watch .bottom .current-time-box": new timeCompareView({
          startDateTime: options.startDateTime,
          endDateTime: options.endDateTime,
          currentDateTime: options.currentDateTime,
          timeStep: options.timeStep,
          clockMode: 'active',
          keyword: options.keywordLeft,
          keywordType: options.keywordTypeLeft,
          network: options.networkLeft
        }),
        // right bottom
        ".right-watch .bottom .current-time-box": new timeCompareView({
          startDateTime: options.startDateTime,
          endDateTime: options.endDateTime,
          currentDateTime: options.currentDateTime,
          timeStep: options.timeStep,
          clockMode: 'passiv',
          keyword: options.keywordRight,
          keywordType: options.keywordTypeRight,
          network: options.networkRight
        }),
        // right paper
        ".left-watch .watch .paper": new paperView({ 
          "parent": ".left-watch .watch .paper",
          "mode": "compare",
          "id": options.leftId
        }),
        // left paper
        ".right-watch .watch .paper": new paperView({ 
          "parent": ".right-watch .watch .paper",
          "mode": "compare",
          "id": options.rightId
        }),
        ".left-watch .date-time-freq .paper": new frequencyPaperView({ 
          "parent": ".left-watch .date-time-freq .paper", 
          "id": options.leftId
        }),
        ".right-watch .date-time-freq .paper": new frequencyPaperView({
          "parent": ".right-watch .date-time-freq .paper", 
          "id": options.rightId
        }),
        ".right-watch .bottom .freq": new Backbone.View({
          collection: new tweetFrequencyCollection({
            'startDateTime': options.startDateTime,
            'endDateTime': options.endDateTime,
            'keyword': util.combineKeyword(keywordRight, keywordTypeRight),
            'network': options.networkRight,
            'timeStep': options.timeStep,
            'mode': options.mode,
            'currentDateTime': options.currentDateTime,
            'id': options.rightId
          }),
          mode: 'compare'
        }),
        ".left-watch .bottom .freq": new Backbone.View({
          collection: new tweetFrequencyCollection({
            'startDateTime': options.startDateTime,
            'endDateTime': options.endDateTime,
            'keyword': util.combineKeyword(keywordLeft, keywordTypeLeft),
            'network': options.networkLeft,
            'timeStep': options.timeStep,
            'mode': options.mode,
            'currentDateTime': options.currentDateTime,
            'id': options.leftId
          }),
          mode: 'compare'
        }),
        ".right-watch .watch .watch-view": new emotionWatchView({ 
          model: new emotionWatch({
            paper: app.paper[options.rightId], 
            mode: options.mode,
            emotionCircleRadius: 250,
            timeStep: options.timeStep,
            startDate: options.startDateTime,
            currentDateTime: options.currentDateTime,
            endDate: options.endDateTime,
            centerPoint: {"x": 400, "y": 400},
            topic: util.combineKeyword(keywordRight, keywordTypeRight),
            network: options.networkRight,
            keywordType: keywordTypeRight
          }),
          mode: 'compare'
        }),
        ".left-watch .watch .watch-view": new emotionWatchView({ 
          model: new emotionWatch({
            paper: app.paper[options.leftId], 
            mode: options.mode,
            emotionCircleRadius: 250,
            timeStep: options.timeStep,
            startDate: options.startDateTime,
            currentDateTime: options.currentDateTime,
            endDate: options.endDateTime,
            centerPoint: {"x": 400, "y": 400},
            topic: util.combineKeyword(keywordLeft, keywordTypeLeft),
            network: options.networkLeft,
            keywordType: keywordTypeLeft
          }),
          mode: 'compare'
        })
      }).render();
    },

    initialize: function() {

    }
  });

  return Router;

});
