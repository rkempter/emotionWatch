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
            _.bindAll(this, 'render');
            
            this.model = new Backbone.Model();

            var options = options || {};

            var self = this;

            // set the parameters of the current visualization
            this.model.set('startDateTime', options.startDateTime);
            this.model.set('endDateTime', options.endDateTime);
            this.model.set('currentDateTime', options.currentDateTime);
            this.model.set('timeStep', options.timeStep);
            this.model.set("label", "Stop");

            // On date & time change, template needs to be rerendered!
            // If the time is not running, we need to start the watch

            this.listenTo(app, 'change:globalTime', function(dateTime) {
                self.model.set('currentDateTime', dateTime);
                if(this.model.get('interval') == undefined) {
                    self.startTime();
                }
                console.log(self.model.cid);
                self.model.set("firstDateTime", moment(dateTime).format("Do MMM YYYY HH:mm:ss"));
                self.model.set("secondDateTime", moment(new Date(dateTime.getTime() + this.model.get('timeStep')*1000)).format("Do MMM YYYY HH:mm:ss"));
                self.render(self.template);
            });

            this.listenTo(app, 'stop:watch', function() {
                self.stopTime();
            });

            this.listenTo(app, 'start:watch', function() {
                self.startTime();
            });

            this.listenTo(app, 'close', this.close);
        },

        close: function() {
            // Stop interval first
            if(undefined !== this.model.get('interval')) {
                clearInterval(this.model.get('interval'));
            }
            this.unbind(); // Unbind all local event bindings
            this.remove(); // Remove view from DOM
        },

        // Start running the timer. If the current time is bigger than our
        // interval, the clock needs to be stopped. Every animationDuration, 
        // the clock triggers a global time change.
        startTime: function() {
            var self = this;

            if(undefined == this.model.get('interval')) {
                var interval = setInterval(function() {
                    if(self.model.get('currentDateTime').getTime() > self.model.get('endDateTime').getTime()) {
                        self.stopTime();
                        return;
                    }
                    // create new time
                    var currentDateTime = new Date(self.model.get('currentDateTime').getTime()+self.model.get('timeStep')*1000);
                    
                    app.trigger("change:globalTime", currentDateTime);

                }, app.animationDuration);

                this.model.set('interval', interval);
            }
        },

        events: {
            'click #start-stop-control': 'triggerStartStop',
        },

        triggerStartStop: function() {
            console.log('trigger Start Stop');
            if(this.model.get('label') == 'Stop') {
                this.model.set('label', 'Start');
                this.stopTime();
                this.render();
            } else {
                this.model.set('label', 'Stop');
                this.startTime();
                this.render();
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

        // render the template with labe, date and time.
        render: function(template) {
            var output = template({ 
                label: this.model.get("label"), 
                firstDateTime: this.model.get('firstDateTime'),
                secondDateTime: this.model.get('secondDateTime'),
            });
            this.$el.html(output);
        },
        
    });

    return timeView;
})  