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

        
        initialize: function(options) {
            var self = this;
            this.model = new Backbone.Model();
            var options = options || {};
            
            this.model.set('startDateTime', options.startDateTime);
            this.model.set('endDateTime', options.endDateTime);
            this.model.set('currentDateTime', options.currentDateTime);
            this.model.set('timeStep', options.timeStep);
            this.model.set("label", "start");
            this.render();

            app.on("set:globalTime", function(dateTime) {
                console.log('set global time with '+dateTime);
                
                self.model.set("date", moment(dateTime).format("Do MMM YYYY"));
                self.model.set("time", moment(dateTime).format("HH:mm:ss"));
                self.render();
            }, this);

            app.on("change:globalTime", function(dateTime) {
                console.log('change triggered');
                self.model.set('currentDateTime', dateTime);
                if(self.model.get('interval') == undefined) {
                    self.startWatch();
                }
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

        /**
         * events not working
         *
         */
        events: {
            // "click .time-box": "test",
            // "click .time-box #start-stop-control": "test",
        },


        /**
         * startTime
         * 
         * Every app.animationDuration seconds, triggers a global change:globalTime event.
         * If the current time is bigger than the endtime of the animation, it stops.
         *
         */
        startTime: function() {
            var self = this;
            console.log('start watch in timeview');

            if(undefined == this.model.get('interval')) {
                var interval = setInterval(function() {
                    if(self.model.get('currentDateTime').getTime() > self.model.get('endDateTime').getTime()) {
                        self.stopTime();
                        return;
                    }
                    var currentDateTime = new Date(self.model.get('currentDateTime').getTime()+self.model.get('timeStep')*1000);
                    app.trigger("change:globalTime", currentDateTime);

                }, app.animationDuration);

                this.model.set('interval', interval);
            }
        },

        /**
         * stopTime
         *
         * Clears the interval and removes the variable 'interval' from the model.
         */
        stopTime: function() {
            if(undefined !== this.model.get('interval')) {
                clearInterval(this.model.get('interval'));
                this.model.set('interval', undefined);
            }
        },

        render: function() {
            var output = window.JST['app/templates/timetemplate.html']( { label: this.model.get("label"), currentDate: this.model.get("date"), currentTime: this.model.get("time") } );
            $( this.el ).html( output );
        },

        
    });

    return timeView;
})  