define([
  'app',
  'lodash',
  'backbone',
  'constants',
], function(app, _, Backbone, Constants) {

    var tweetFrequencyModel = Backbone.Model.extend({
        
        activate: function() {
            this.trigger("activate");
        },

        visited: function() {
            this.trigger("visited");
        },
    });

    return tweetFrequencyModel;

});