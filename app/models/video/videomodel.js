define([
  'app',
  'lodash',
  'backbone',
  'constants'
], function(app, _, Backbone, Constants) {

    var videoModel = Backbone.Model.extend({
        
        urlRoot: function() {
          return "http://localhost:8080/getEventVideo";
        },

        parse: function(response) {
          for(var i = 0; i < response.length; i++) {
            this.set('video', response[i].video);
          }
        }
    });

    return videoModel;

});