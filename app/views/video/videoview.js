define([
    "app",
    "backbone",
    "jquery",
    "lodash",
    "util",
    "constants",

], function(app, Backbone, $, _, util, Constants) {
    
    var videoView = Backbone.View.extend({

        template: "videotemplate",

        initialize: function() {
            this.listenTo(app, 'close', this.close);

            var keyword = this.model.get('keyword');
            var keywordType = this.model.get('keywordType');

            if(keywordType == 'event') {
                this.model.fetch({
                    data: $.param({
                        startDateTime: this.model.get('startDateTime'),
                        endDateTime: this.model.get('endDateTime'),
                        sport: this.model.get('keyword').slice(1),
                    })
                });
            }
        },
          
        close: function() {
            this.remove();
            this.unbind();
        },

        render: function(template) {
            var output = template({ 
                videoUrl: "http://localhost:8080/video/"+this.model.get("video"),
            });
            this.$el.html( output );
        },

    });

    return videoView;
})  