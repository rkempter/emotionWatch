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
      this.showView('#main', new paperView() );
    },

    showView: function (selector, view) {
        if(this.currentView) 
          this.currentView.close();
 
        $(selector).html(view.render());
        this.currentView = view;
        
        return view;
    },
  });

  return Router;

});
