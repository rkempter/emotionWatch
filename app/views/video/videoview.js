define([
    "app",
    "backbone",
    "jquery",
    "lodash",
    "util",
    "constants"

], function(app, Backbone, $, _, util, Constants) {
    
    var videoView = Backbone.View.extend({

        template: "videotemplate",

        initialize: function() {
            var self = this;
            this.listenTo(app, 'close', this.close);

            var keyword = this.model.get('keyword');
            var keywordType = this.model.get('keywordType');

            if(keywordType == 'event' && this.model.get('timeStep') == 5) {
                this.model.fetch({
                    data: $.param({
                        startDateTime: this.model.get('startDateTime'),
                        endDateTime: this.model.get('endDateTime'),
                        sport: this.model.get('keyword').slice(1)
                    })
                });
            } 
            self.render();
        },
          
        close: function() {
            this.remove();
            this.unbind();
        },

        render: function(template) {
            var output = template({ 
                videoUrl: "http://localhost:8080/videos/"+this.model.get("video")
            });
            this.$el.html( output );
        },

        // Use the afterrender method. Video dom element generated and accessible   
        afterRender: function() {
            var self = this;
            // Check if video-element already retrieved
            if(this.model.get('video-element') === undefined || this.model.get('video-element') === null) {
                // Get the video dom element
                var video = document.querySelector('video');
                console.log(video);
                if(video !== null || this.model.get('video') !== undefined) {
                    // Save the video dom element
                    this.model.set('video-element', video);
                    // Listen to any start time event, triggered by the clock
                    self.listenTo(app, 'start:time', function() {
                        console.log('gooo');
                        self.model.get('video-element').play();
                    });
                    // Listen to a stop time event, triggered by the clock
                    self.listenTo(app, 'stop:time', function() {
                        self.model.get('video-element').pause();
                    });

                    self.listenTo(app, 'pause:watch', function() {
                        self.model.get('video-element').pause();
                    });

                    self.listenTo(app, 'resume:watch', function() {
                        self.model.get('video-element').play();
                    });

                    self.listenTo(app, 'jumpToTime', self.jumpToVideo);
                    
                    var interval = setInterval(function(){
                        if (self.model.get('video-element').readyState > 0 && video !== null) {
                            // Safe duration of the video
                            self.model.set('duration', Math.round(video.duration));
                            clearInterval(interval);
                        }
                    }, 500);
                }
            }
        },

        // When a jumpToTime event is triggered, we need to bring the video in the
        // right position as well.
        jumpToVideo: function(params) {
            if(this.model.get('video') !== undefined) {
                var dateTime = params.dateTime;
                // Compute the fraction of time we've been advancing until now
                var fraction = (dateTime.getTime()-this.model.get('startDateTime')) / (this.model.get('endDateTime').getTime() - this.model.get('startDateTime').getTime());
                // Compute the time in the video
                var videoTime = fraction * this.model.get('duration');
                // Jump to the time
                this.model.get('video-element').currentTime = videoTime;
            }
        }

    });

    return videoView;
});