define([
  // Application.
  "app",
  "emotionwatchview"
],

function(app) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      "": "index"
    },

    index: function() {
      app.showView('#content', new emotionWatchView() );
    }
  });

  return Router;

});
