define([
  // Application.
  "app",
  "paperview",
  "frequencypaperview",
  "searchview",
  "navigationview",
  "emotionwatchview",
  "emotionwatchcollectionview",
  "tweetcollectionview",
  "emotionwatchcollection",
  "welcomeview",
  "emotioncollectionview",
],

function(app, paperView, frequencyPaperView, searchView, navigationView, emotionWatchView, emotionWatchCollectionView, tweetCollectionView, emotionWatchCollection, welcomeView, emotionCollectionView) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      "": "index",
      "about/": "about",
      "search": "search",
      "pattern": "pattern",
    },

    index: function() {
      app.useLayout('frontpage').setViews({
        ".paper": new emotionCollectionView({
          "width": "100%",
          "height": "100%",
          "x": 0,
          "y": 0,
        }),
        ".welcome": new welcomeView({
          "el": ".welcome",
        }),
      }).render();
    },

    search: function() {
      app.useLayout('main-layout').setViews({
        ".navigation": new navigationView(),
        ".watch .paper": new paperView( { "parent": ".watch .paper" } ),
        ".date-time-freq .paper": new frequencyPaperView( { "parent": ".date-time-freq .paper" } ),
      }).render();
    },

    pattern: function( keyword ) {
      console.log("In route pattern with keyword: "+keyword);
      app.useLayout('pattern-layout').setViews({
        ".navigation": new navigationView(),
        ".paper": new paperView(),
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
