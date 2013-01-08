define([
  'app',
  'lodash',
  'backbone',
  'constants'
], function(app, _, Backbone, Constants) {

    var titleModel = Backbone.Model.extend({
        
        urlRoot: function() {
          return "http://localhost:8080/getEventInfo";
        },

        parse: function(response) {
          for(var i = 0; i < response.length; i++) {
            this.set('event', response[i].event);
            this.set('gender', response[i].gender);
          }
        }
    });

    return titleModel;

});