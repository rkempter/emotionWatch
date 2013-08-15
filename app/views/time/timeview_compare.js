define([
    "app",
    "backbone",
    "jquery",
    "lodash",
    "util",
    "constants",
    "plugins/jquery.timer"

], function(app, Backbone, $, _, util, Constants) {
    
    var timeCompareView = Backbone.View.extend({

        template: 'timetemplate',
        
        initialize: function(options) {
            _.bindAll(this, 'render');
            
            this.model = new Backbone.Model();

            options = options || {};

            this.width = app.windowWidth / 2;

            var self = this;

            this.clockMode = options.clockMode || 'active';

            // set the parameters of the current visualization
            this.model.set('jump', false);
            this.model.set('startDateTime', options.startDateTime);
            this.model.set('endDateTime', options.endDateTime);
            this.model.set('currentDateTime', options.currentDateTime);
            this.model.set('timeStep', options.timeStep);
            this.model.set("label", "Stop");
            this.model.set("identifier", options.identifier);
            this.network = options.network;
            this.model.set("timeSpan", options.endDateTime.getTime() - options.startDateTime.getTime());

            // On date & time change, template needs to be rerendered!
            // If the time is not running, we need to start the watch
            this.listenTo(app, 'change:globalTime', function(dateTime) {
                var oldDateTime = this.model.get('currentDateTime');
                var newDateTime = new Date(oldDateTime.getTime() + this.model.get('timeStep')*1000);

                // Check if we do a jump
                if(newDateTime.getTime() == dateTime.getTime()) {
                    this.model.set('jump', false);
                } else {
                    this.model.set('jump', true);
                }

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

            this.listenTo(app, 'pause:watch', this.pauseTime);
            this.listenTo(app, 'resume:watch', this.resumeTime);

            this.listenTo(app, 'close', this.close);

            _.bindAll(this);
            $(document).on('keydown', self.triggerStartStopKey);
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
            var width = $('.'+this.network+' .time-block').width();
            this.model.set('label', 'Start');
            $('.'+this.network+' .time-block').css('width', width+'px');
            this.model.set('timeState', 'pause');
            $('.'+this.network+' .time-block').removeClass('is-transitioning');
            if(undefined !== this.model.get('interval')) {
                this.model.get('interval').pause();
            }
            this.render();
        },

        resumeTime: function() {
            console.log('resume');
            var width = $('.'+this.network+' .time-block').width();
            this.model.set('timeState', 'running');
            this.model.set('label', 'Pause');
            $('.'+this.network+' .time-block').addClass('is-transitioning');
            $('.'+this.network+' .time-block').css('width', this.model.get('endPosition'));
            if(undefined !== this.model.get('interval')) {
                this.model.get('interval').play();
            }
            this.render();
        },

        // Start running the timer. If the current time is bigger than our
        // interval, the clock needs to be stopped. Every animationDuration, 
        // the clock triggers a global time change.
        startTime: function() {
            var self = this;
            this.model.set('timeState', 'running');
            $('.'+this.network+' .time-block').addClass('is-transitioning');
            
            if(this.clockMode === 'active') {
                app.trigger('start:time');
                
                if(undefined === this.model.get('interval')) {
                    var interval = $.timer(function() {
                        if(self.model.get('currentDateTime').getTime() >= self.model.get('endDateTime').getTime()) {
                            self.stopTime();
                            return;
                        }
                        // create new time
                        var currentDateTime = new Date(self.model.get('currentDateTime').getTime()+self.model.get('timeStep')*1000);
                        app.trigger("change:globalTime", currentDateTime);
                    }, app.animationDuration, true);

                    this.model.set('interval', interval);
                } else {
                    this.model.get('interval').play();
                }
            }
        },

        events: {
            'click #start-stop-control': 'triggerStartStop'
        },

        triggerStartStop: function() {
            if(this.model.get('timeState') == 'running') {
                this.model.set('timeState', 'pause');
                app.trigger('pause:watch');
            } else if(this.model.get('timeState') == 'pause') {
                this.model.set('timeState', 'running');
                app.trigger('resume:watch');
            }
        },

        triggerStartStopKey: function(event) {
            if(event.keyCode == 32) {
                if(this.model.get('timeState') == 'running') {
                    this.model.set('timeState', 'pause');
                    this.pauseTime();
                } else if(this.model.get('timeState') == 'pause') {
                    this.model.set('timeState', 'running');
                    this.resumeTime();
                }
            }
        },

        computeFirstPosition: function() {
            var timeSpan = this.model.get('startDateTime').getTime() + this.model.get('timeStep')*1000 - this.model.get('startDateTime');
            var position = timeSpan / this.model.get('timeSpan') * this.width;
            $('.'+this.network+' .time-block').css('width', position+'px');
        },

        /**
         * stopTime
         *
         * Clears the interval and removes the variable 'interval' from the model.
         */
        stopTime: function() {
            this.model.get('interval').stop();
            this.model.set('interval', undefined);
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
        
    });

    return timeCompareView;
}); 