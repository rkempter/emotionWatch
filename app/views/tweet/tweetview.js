define([
    "app",
    "backbone",
    "jquery",
    "lodash",
    "util",
    "constants"

], function(app, Backbone, $, _, util, Constants) {
    
    var tweetView = Backbone.View.extend({

        template: 'tweet',

        tagName: 'li',

        initialize: function() {
            _.bindAll(this, 'render');

            this.listenTo(app, 'pause:watch', this.pauseAnimation);
            this.listenTo(app, 'resume:watch', this.resumeAnimation);

            var coordinates = this.getCoordinates();
            var delay = this.getDelay();
            var animationName = this.getTranslation();
            var style = '';

            if(this.model.get('keywordType') == 'event' && this.model.get('timeStep') == 5 && (this.model.get('x') > 4 && this.model.get('x') < 8)) { 
                style = "display: none";
            } else {
                style = "opacity: 0; left: "+coordinates.x+"px; top: "+coordinates.y+"px; -webkit-transform: translate3d(0, 0, -150px); -webkit-animation-name: "+animationName+"; -webkit-animation-delay: "+delay+"s;";
            }
            
            this.model.set('styler', style);
            this.render();
        },

        events: {
            'webkitAnimationEnd': 'addEndClass'
        },

        addEndClass: function() {
            this.$el.addClass('stop-animation');
        },

        pauseAnimation: function() {
            console.log('pause');
            this.$('.tweet').css('-webkit-animation-play-state', 'paused');
        },

        resumeAnimation: function() {
            console.log('resume');
            this.$('.tweet').css('-webkit-animation-play-state', 'running');
        },
        
        render: function(template) {
            var output = template({
                emotion: this.model.get('emotion'),
                styler: this.model.get('styler'),
                datetime: this.model.get('datetime'),
                user: this.model.get('user'),
                tweet: this.model.get('tweet'),
                cid: this.model.cid
            });
            this.$el.html(output);
        },

        getCoordinates: function() {
            var x = this.model.get('x');
            var y = this.model.get('y');
            var width = app.windowWidth / 3;
            var coord_x, coord_y;

            if(x < 5 && y < 5) {
                coord_x = width + Math.pow(7, (x-2)) - 450;
                coord_y = y * 120;
            } else if (x > 4 && y < 5){
                coord_x = 2 * width - Math.pow(7, (x-7))+100;
                coord_y = (y-5) * 120;
            } else if (x > 4 && y > 4){
                coord_y = (y-5) * 120;
                coord_x = 2 * width - Math.pow(7, (x-7))+100;
            } else if (x < 5 && y > 4){
                coord_y = (y-5) * 120;
                coord_x = width + Math.pow(7, (x-2)) - 450;
            } 

            return {x: coord_x, y: coord_y};
        },

        getTranslation: function() {
            var x = this.model.get('x');
            if(x > 4) {
                return 'translation_right';
            } else {
                return 'translation_left';
            }
        },

        getDelay: function() {
            var currTimeSpan = (new Date(this.model.get('datetime')).getTime() - this.model.get('currentDateTime').getTime()) / 1000;
            var timeSpan = this.model.get('timeStep');

            return Math.round(Math.floor(currTimeSpan / timeSpan * app.animationDuration/2000));
        },

        close: function() {
            this.unbind();
            this.$el.remove();
            this.stopListening();
        }
        
    });

    return tweetView;
});