define([
    "app",
    "backbone",
    "jquery",
    "lodash",
    "util",
    "constants",

], function(app, Backbone, $, _, util, Constants) {
    
    var timeView = Backbone.View.extend({

        template: 'tweet',

        render: function(template) {
            var output = template({ 
                label: this.model.get("label"), 
                currentDate: this.model.get("date"), 
                currentTime: this.model.get("time")
            });
            $( this.el ).html( output );
        },

        clear: function() {
          this.model.destroy();
        },

        
    });

    return timeView;
})  