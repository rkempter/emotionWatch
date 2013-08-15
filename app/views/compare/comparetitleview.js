define([
    "app",
    "backbone",
    "jquery",
    "lodash",
    "util",
    "constants"

], function(app, Backbone, $, _, util, Constants) {
    
    var compareTitleView = Backbone.View.extend({

        template: 'compare-title-template',

        events: {
            'click #start-stop-control-btn': 'triggerStartStop'
        },

        initialize: function() {
            _.bindAll(this, "render");
            console.log(this.model.toJSON());

            this.listenTo(app, 'close', this.close);
        },

        triggerStartStop: function() {
            $btn = $('#start-stop-control-btn'); 
            if($btn.text() === 'Resume') {
                app.trigger('resume:watch');
                $btn.text('Pause');
            } else {
                app.trigger('pause:watch');
                $btn.text('Resume');
            }
        },

        close: function() {
            this.remove();
            this.unbind();
        },

        render: function() {
            var output = window.JST['app/templates/compare-title-template.html'](this.model.toJSON());
            this.$el.html(output)
        }

        
    });

    return compareTitleView;
});