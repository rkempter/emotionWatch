define([
  // Application.
  "app",
  "paperview",
  "searchview",
  "navigationview",
  "emotionwatchview",
  "emotionwatchcollectionview",
  "tweetcollectionview",
  "emotionwatchcollection",
],

function(app, paperView, searchView, navigationView, emotionWatchView, emotionWatchCollectionView, tweetCollectionView, emotionWatchCollection) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      "": "index",
      "about/": "about",
      "search/:topic": "search",
      "pattern": "pattern",
    },

    index: function() {
      app.useLayout('main-layout').setViews({
        ".search": new searchView(),
        ".navigation": new navigationView(),
        ".watch": new paperView( { "parent": ".watch" } ),
      }).render();
    },

    pattern: function( keyword ) {
      console.log("In route pattern with keyword: "+keyword);
      app.useLayout('pattern-layout').setViews({
        ".navigation": new navigationView(),
        ".search": new searchView(),
        ".paper": new paperView(),
      }).render();
    },

    search: function( topic ) {
      var paperViewElement = new paperView();
      var paperObject = paperViewElement.getPaper();
      var emotionView = new emotionWatchView(
        { model: new emotionWatch({ 
            paper: paperObject, 
            emotionCircleRadius: 300,
            topic: topic,
            startDate: new Date('July 28, 2012 18:00:00'),
            currentDateTime: new Date('July 28, 2012 18:00:00'),
            endDate: new Date('July 28, 2012 22:00:00'),
            centerPoint: {"x": 600, "y": 400},
            positionX: 600, 
            positionY: 400
          }) 
        });

      app.useLayout().setViews({
        ".paper": new paperView({
        })
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
