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
  "compareview",
  "comparetitleview",
  "tweetfrequencycollectionview"
],

function(util, app, _, $, Backbone, Raphael, Constants, emotionWatch, emotionWatchView, emotionWatchCollection, tweetCollection, tweetCollectionView, videoView, timeView, navigationView, tweetFrequencyCollection, frequencyPaperView, paperView, emotionCollectionView, welcomeView, detailView, navigationModel, videoModel, timeCompareView, compareView, compareTitleView, tweetFrequencyCollectionView) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      "": "index",
      "home": "index",
      "about/": "about",
      "search": "search",
      "search/:network/:keywordType/:keyword/:timeStep/:startDateTime/:endDateTime": 'search',
      "search/:network/:keywordType/:keyword/:timeStep/:startDateTime/:endDateTime/:currentDateTime": 'search',
      "search/event/:eventId/:network/:keywordType/:keyword/:timeStep/:startDateTime/:endDateTime": 'searchEvent',
      "pattern/:network/:keywordType/:keyword/:timeStep/:startDateTime/:endDateTime": 'pattern',
      "pattern/:network/:keywordType/:keyword/:timeStep/:startDateTime/:endDateTime/:currentDateTime": 'pattern',
      "compare/:keywordType/:keyword/:timeStep/:startDateTime/:endDateTime": 'compare',
      "compare/:keywordType/:keyword/:timeStep/:startDateTime/:endDateTime/:currentDateTime": 'compare',
      "compare/:networkLeft/:keywordTypeLeft/:keywordLeft/:networkRight/:keywordTypeRight/:keywordRight/:timeStep/:startDateTime/:endDateTime": 'compare',
      "compare/event/:eventId/:networkLeft/:keywordTypeLeft/:keywordLeft/:networkRight/:keywordTypeRight/:keywordRight/:timeStep/:startDateTime/:endDateTime": 'compareEvent',
      'comparesearch': 'compareInit',
      "comparesearch/:eventId": "compareInit"
    },

    close: function() {
      $('#main').empty();
      $('body').attr('class', '');
      app.trigger('close');
    },

    index: function() {
      this.close();
      
      app.useLayout('frontpage').setViews({
        ".welcome": new welcomeView()
      }).render();
    },

    search: function(network, keywordType, keyword, timeStep, startDateTime, endDateTime, currentDateTime) {
      this.close();

      var options = {};
      options.network = network || 'twitter';
      options.keyword = keyword;
      options.keywordType = keywordType;
      options.eventId = undefined;

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
            centerPoint: Constants.centerPoint,
            topic: options.keyword,
            network: options.network,
            keywordType: options.keywordType
          }) 
        }),
        ".tweets": new tweetCollectionView({
          collection: new tweetCollection(options)
        }),
        ".bottom": new tweetFrequencyCollectionView({
          collection: new tweetFrequencyCollection(options)
        })
      }).render();
    },

    searchEvent: function(eventId, network, keywordType, keyword, timeStep, startDateTime, endDateTime, currentDateTime) {
      this.close();

      var options = {};
      options.network = network || 'twitter';
      options.keyword = keyword;
      options.keywordType = keywordType;
      options.eventId = eventId;

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
          model: new videoModel({
            startDateTime: options.startDateTime,
            keyword: eventId,
            keywordType: 'event',
            endDateTime: options.endDateTime,
            timeStep: options.timeStep,
            currentDateTime: options.currentDateTime
          })
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
            centerPoint: Constants.centerPoint,
            topic: options.keyword,
            network: options.network,
            keywordType: options.keywordType
          }) 
        }),
        ".tweets": new tweetCollectionView({
          collection: new tweetCollection(options)
        }),
        ".bottom": new tweetFrequencyCollectionView({
          collection: new tweetFrequencyCollection(options)
        })
      }).render();
    },

    compareInit: function(eventId) {
      this.close();

      options = {};
      options.eventId = eventId;

      app
        .useLayout('comparison-wrapper')
        .setViews({
          '#comparison': new compareView(options)
        }).render();
    },



    compareEvent: function(eventId, networkLeft, keywordTypeLeft, keywordLeft, networkRight, keywordTypeRight, keywordRight, timeStep, startDateTime, endDateTime, currentDateTime) {
      this.close();

      var options = {};
      options.leftId = 'left-watch';
      options.rightId = 'right-watch';
      options.keywordTypeLeft = keywordTypeLeft;
      options.keywordTypeRight = keywordTypeRight;
      options.keywordLeft = keywordLeft;
      options.keywordRight = keywordRight;
      options.networkLeft = networkLeft;
      options.networkRight = networkRight;

      options.mode = 'compare';

      startDateTime_raw = parseInt(startDateTime) || "2012-07-26 00:00:00";
      endDateTime_raw = parseInt(endDateTime) || "2012-08-13 14:00:00";
      options.timeStep = timeStep;

      options.startDateTime = new Date(startDateTime_raw);
      options.endDateTime = new Date(endDateTime_raw);
      options.currentDateTime = options.startDateTime;

      app.useLayout('compare-layout').setViews({
        // title
        ".information": new compareTitleView({
          model: new Backbone.Model(options)
        }),

        "#video": new videoView({
          model: new videoModel({
            keyword: eventId,
            keywordType: 'event',
            timeStep: 5,
            startDateTime: options.startDateTime,
            endDateTime: options.endDateTime
          })
        }),

        // left bottom
        ".left-watch .bottom .current-time-box": new timeCompareView({
          startDateTime: options.startDateTime,
          endDateTime: options.endDateTime,
          currentDateTime: options.currentDateTime,
          timeStep: options.timeStep,
          clockMode: 'active',
          identifier: options.leftId,
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
          identifier: options.rightId,
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
        ".right-watch .bottom .freq": new tweetFrequencyCollectionView({
          collection: new tweetFrequencyCollection({
            'startDateTime': options.startDateTime,
            'endDateTime': options.endDateTime,
            'keyword': keywordRight,
            'network': options.networkRight,
            'timeStep': options.timeStep,
            'mode': options.mode,
            'currentDateTime': options.currentDateTime,
            'id': options.rightId
          }),
          mode: 'compare'
        }),
        ".left-watch .bottom .freq": new tweetFrequencyCollectionView({
          collection: new tweetFrequencyCollection({
            'startDateTime': options.startDateTime,
            'endDateTime': options.endDateTime,
            'keyword': keywordLeft,
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
            centerPoint: Constants.centerPoint,
            topic: keywordRight,
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
            centerPoint: Constants.centerPoint,
            topic: keywordLeft,
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
