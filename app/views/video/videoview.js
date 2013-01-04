define([
    "app",
    "backbone",
    "jquery",
    "lodash",
    "util",
    "constants",

], function(app, Backbone, $, _, util, Constants) {
    
    var videoView = Backbone.View.extend({

      initialize: function() {
        console.log("Video view start");
        var self = this;
        self.videoId = 'Pe3I8NkR5oQ';
        self.container = '#player';

        if (typeof(YT) == 'undefined' || typeof(YT.Player) == 'undefined') {
          window.onYouTubeIframeAPIReady = function() {
            console.log("get event");
            self.loadPlayer(self.container, self.videoId);
          };

          $.getScript('//www.youtube.com/iframe_api');

        } else {
          self.loadPlayer(self.container, self.videoId);
        }
      },

      loadPlayer: function(container, videoId) {
        console.log("start player");
        var player = new YT.Player('player', {
          videoId: 'hjoDzK0siaM',
          width: 356,
          height: 200,
          playerVars: {
            autoplay: 1,
            controls: 0,
            modestbranding: 1,
            rel: 0,
            showInfo: 0
          }
        });
        console.log(player);
      },

      clear: function() {
        this.model.destroy();
      },

    });

    return videoView;
})  