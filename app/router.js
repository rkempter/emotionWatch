define([
  // Application.
  "app",
  "paperview"
],

function(app, paperView) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      "": "index"
    },

    index: function() {
      console.log('indexpage');
      app.showView('#content', new paperView() );
    }
  });

  return Router;

});
