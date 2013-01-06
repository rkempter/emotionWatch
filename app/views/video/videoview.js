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

            if(keywordType == 'event') {
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
            console.log('rendering');
            var output = template({ 
                videoUrl: "http://localhost:8080/videos/"+this.model.get("video")
            });
            this.$el.html( output );
        },

        // Use the afterrender method. Video dom element generated and accessible   
        afterRender: function() {
            var self = this;
            if(this.model.get('video-element') === undefined || this.model.get('video-element') === null) {
                var video = document.querySelector('video');
                if(video !== null) {
                    this.model.set('video-element', video);
                    self.listenTo(app, 'start:time', function() {
                        console.log('start-watch');
                        self.model.get('video-element').play();
                    });
                    self.listenTo(app, 'stop:time', function() {
                        self.model.get('video-element').pause();
                    });
                    self.listenTo(app, 'jumpToTime', self.jumpToVideo);

                    window.setInterval(function(t){
                    console.log(self.model.get('video-element').readyState);
                      if (self.model.get('video-element').readyState > 0) {
                        self.model.set('duration', Math.round(video.duration));
                        clearInterval(t);
                      }
                    }, 500);
                }
            }
        },

        jumpToVideo: function(params) {
            var dateTime = params.dateTime;
            var fraction = (dateTime.getTime()-this.model.get('startDateTime')) / (this.model.get('endDateTime').getTime() - this.model.get('startDateTime').getTime());
            var videoTime = fraction * this.model.get('duration');
            this.model.get('video-element').currentTime = videoTime;
        }

    });

    return videoView;
});