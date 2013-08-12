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
            
            // Listen to global close event
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
        }

        
    });

    return compareTitleView;
});