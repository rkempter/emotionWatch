define([
  // Application.
  "app",
  "paperview",
  "searchview",
  "navigationview",
  "emotionwatchcollectionview"
],

function(app, paperView, searchView, navigationView, emotionWatchCollectionView) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      "": "index",
      "about/": "about",
      "search/:topic": "search",
    },

    index: function() {
      // app.useLayout().setView('paper', new paperView() );
      // app.useLayout().setView('searchbar', new searchView() );
      console.log('indexpage');
      // this.showView('#main', new paperView() );

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
      });
    },

    about: function() {
      app.useLayout().setViews({
        ".navigation": new searchView({"template": "search-topbar"} )
      }).render();
    },

    initialize: function() {
      app.useLayout().setViews({
        ".search": new searchView(),
        ".navigation": new navigationView(),
        ".paper": new paperView(),
        ".test": new emotionWatchCollectionView( {collection: app.emotionWatchCollection} ),
      }).render();
    }
  });

  return Router;

});
