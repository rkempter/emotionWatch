define([
    "app",
    "backbone",
    "jquery",
    "lodash",
    "util",
    "constants",

], function(app, Backbone, $, _, util, Constants) {
    
    var timeView = Backbone.View.extend({

        template: 'timetemplate',

        
        initialize: function() {
            var self = this;
            this.model = new Backbone.Model();
            this.model.set("label", "start");
            this.render();

            app.on("set:globalTime", function(dateTime) {
                self.model.set("date", moment(dateTime).format("Do MMM YYYY"));
                self.model.set("time", moment(dateTime).format("HH:mm:ss"));
                self.render();
            }, this);

            app.on('stop:watch', function() {
                self.stopTime();
            });

            app.on('start:watch', function() {
                self.startTime();
            });
        },

        test: function() {
            console.log('test');
        },

        events: {
            "click .time-box": "test",
            "click .time-box #start-stop-control": "test",
        },

        startTime: function() {
            if(undefined == this.model.get('interval')) {
                var interval = setInterval(function() {
                  app.trigger("change:globalTime");
                }, app.animationDuration);

                this.model.set('interval', interval);
            }
        },

        stopTime: function() {
            if(undefined !== this.model.get('interval')) {
                clearInterval(this.model.get('interval'));
            }
        },

        render: function() {
            var output = window.JST['app/templates/timetemplate.html']( { label: this.model.get("label"), currentDate: this.model.get("date"), currentTime: this.model.get("time") } );
            $( this.el ).html( output );
        },

        
    });

    return timeView;
})  