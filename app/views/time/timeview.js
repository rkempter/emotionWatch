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

            app.on("change:globalTime", function(dateTime) {
                this.model.set('currentDateTime', dateTime);
                if(this.model.get('interval') == undefined) {
                    this.startWatch();
                }
                this.model.set("date", moment(dateTime).format("Do MMM YYYY"));
                this.model.set("time", moment(dateTime).format("HH:mm:ss"));
                this.render(this.template);
            }, this);

            app.on('stop:watch', function() {
                this.stopTime();
            }, this);

            app.on('start:watch', function() {
                this.startTime();
            }, this);

            app.on('close', this.close, this);
        },

        close: function() {
            this.off(null, null, this);
            this.unbind(); // Unbind all local event bindings
         
            this.remove(); // Remove view from DOM
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

        render: function(template) {
            var output = template({ 
                label: this.model.get("label"), 
                currentDate: this.model.get("date"), 
                currentTime: this.model.get("time")
            });
            $( this.el ).html( output );
        },

        cleanup: function() {
            this.model.off(null, null, this);
        },
        
    });

    return timeView;
})  