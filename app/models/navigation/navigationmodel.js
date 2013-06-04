define([
  'app',
  'lodash',
  'backbone',
  'constants'
], function(app, _, Backbone, Constants) {

    var navigationModel = Backbone.Model.extend({
        
        urlRoot: function() {
          return app.server+"getEventInfo";
        },

        parse: function(response) {
          for(var i = 0; i < response.length; i++) {
            this.set('event', response[i].event);
            this.set('gender', response[i].gender);
          }
          console.log('trigger!');
          this.trigger('render');
        }
    });

    return navigationModel;

});