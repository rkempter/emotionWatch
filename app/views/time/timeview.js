define([
    "app",
    "backbone",
    "jquery",
    "lodash",
    "util",
    "constants",
    "plugins/jquery.timer"

], function(app, Backbone, $, _, util, Constants) {
    
    var timeView = Backbone.View.extend({

        template: 'timetemplate',
        
        initialize: function(options) {
            _.bindAll(this, 'render');
            
            this.model = new Backbone.Model();

            options = options || {};

            var self = this;

            // set the parameters of the current visualization
            this.model.set('startDateTime', options.startDateTime);
            this.model.set('endDateTime', options.endDateTime);
            this.model.set('currentDateTime', options.currentDateTime);
            this.model.set('timeStep', options.timeStep);
            this.model.set("label", "Stop");
            this.model.set("timeSpan", options.endDateTime.getTime() - options.startDateTime.getTime());

            // On date & time change, template needs to be rerendered!
            // If the time is not running, we need to start the watch
            this.listenTo(app, 'change:globalTime', function(dateTime) {
                this.model.set('currentDateTime', dateTime);
                if(this.model.get('interval') === undefined) {
                    self.startTime();
                }
                self.model.set("firstDateTime", moment(dateTime).format("Do MMM YYYY HH:mm:ss"));
                self.model.set("secondDateTime", moment(new Date(dateTime.getTime() + this.model.get('timeStep')*1000)).format("Do MMM YYYY HH:mm:ss"));
                self.render(self.template);
            });

            this.listenTo(app, 'start:watch', function() {
                self.startTime();
            });

            this.listenTo(app, 'close', this.close);
        },

        close: function() {
            // Stop interval first
            if(undefined !== this.model.get('interval')) {
                this.model.get('interval').stop();
            }
            this.unbind(); // Unbind all local event bindings
            this.remove(); // Remove view from DOM
        },

        pauseTime: function() {
            var width = $('.time-block').width();
            $('.time-block').css('width', width+'px');
            console.log('what is happening?');
            app.trigger('pause:watch');
            if(undefined !== this.model.get('interval')) {
                this.model.get('interval').pause();
            }
        },

        resumeTime: function() {
            console.log(this.model.get('endPoint'));
            app.trigger('resume:watch');
            $('.time-block').css('width', this.model.get('endPosition'));
            if(undefined !== this.model.get('interval')) {
                this.model.get('interval').play();
            }
        },

        // Start running the timer. If the current time is bigger than our
        // interval, the clock needs to be stopped. Every animationDuration, 
        // the clock triggers a global time change.
        startTime: function() {
            var self = this;
            
            this.model.set('startInterval', setInterval(function(t) {
                app.trigger('start:time');
                clearInterval(self.model.get('startInterval'));
            },1000));
            
            if(undefined === this.model.get('interval')) {
                var interval = $.timer(function() {
                    if(self.model.get('currentDateTime').getTime() > self.model.get('endDateTime').getTime()) {
                        self.stopTime();
                        return;
                    }

                    console.log('firing');
                    // create new time
                    var currentDateTime = new Date(self.model.get('currentDateTime').getTime()+self.model.get('timeStep')*1000);
                    app.trigger("change:globalTime", currentDateTime);
                }, app.animationDuration, true);

                this.model.set('interval', interval);
            } else {
                this.model.get('interval').play();
            }
        },

        events: {
            'click #start-stop-control': 'triggerStartStop'
        },

        triggerStartStop: function() {
            if(this.model.get('label') == 'Stop') {
                this.model.set('label', 'Start');
                this.model.set('paused', true);
                console.log('pausing');
                this.pauseTime();
                this.render();

            } else {
                console.log('resuming!');
                this.model.set('label', 'Stop');
                this.model.set('paused', false);
                this.resumeTime();
                this.render();
            }
        },

        computeFirstPosition: function() {
            var timeSpan = this.model.get('startDateTime').getTime() + this.model.get('timeStep')*1000 - this.model.get('startDateTime');
            var position = timeSpan / this.model.get('timeSpan') * app.windowWidth;
            $('.time-block').css('width', position+'px');
        },

        /**
         * stopTime
         *
         * Clears the interval and removes the variable 'interval' from the model.
         */
        stopTime: function() {
            this.model.get('interval').stop();
            app.trigger('stop:time');
        },

        // render the template with labe, date and time.
        render: function(template) {

            var output = template({ 
                label: this.model.get("label"), 
                firstDateTime: this.model.get('firstDateTime'),
                secondDateTime: this.model.get('secondDateTime')
            });
            this.$el.html(output);
        },

        afterRender: function() {
                var currentTimeSpan = this.model.get('currentDateTime').getTime() + this.model.get('timeStep')*1000 - this.model.get("startDateTime").getTime();
                var position = currentTimeSpan / this.model.get('timeSpan') * app.windowWidth;
                if(position > app.windowWidth / 2) {
                    $('.time-block .dates').css('text-align', 'right').css('right', '45px');
                }
                $('.time-block').css('width', position+'px');
                this.model.set('endPoint', position);
                if(this.model.get('paused') == true) {
                    console.log('paused');
                    this.$el.css('-webkit-animation-play-state', 'paused');
                } else {
                    this.$el.css('-webkit-animation-play-state', 'running');
                }
                
        }
        
    });

    return timeView;
}); 