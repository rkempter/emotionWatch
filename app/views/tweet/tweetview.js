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

            var style = "opacity: 0; left: "+coordinates.x+"px; top: "+coordinates.y+"px; -webkit-transform: translate3d(0, 0, -150px); -webkit-animation-name: "+animationName+"; -webkit-animation-delay: "+delay+"s;";
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
            var width = app.windowWidth / 3;

            if(x < 5) {
                var y = x * 120;
                var x = width + Math.pow(7, (x-2)) - 450;
            } else {
                var y = (x-5) * 120;
                var x = 2 * width - Math.pow(7, (x-7))+100;
            }

            return {x: x, y: y};
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