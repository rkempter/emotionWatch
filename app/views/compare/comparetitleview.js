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
            'click #start-stop-control-btn': 'triggerStartStop',
            'click #start-all': 'startAll'
        },

        initialize: function() {
            _.bindAll(this, "render");
            var self = this;

            console.log(this.model.toJSON());
            this.listenTo(app, 'close', this.close);
            this.listenTo(app, 'loaded', self.showStart);
        },

        showStart: function() {
            this.start = true;
            $('#loading .loading-text h2').hide();
            $('#loading #start-all').show(); 

            console.log($('#loading'));
        },

        startAll: function() {
            console.log('start!');
            $loading = $('#loading');
            $loading.hide();

            app.trigger('start:all');
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
            this.$el.html(output);
        },

        afterRender: function() {
            if(this.start === true) {
                $('#loading .loading-text h2').hide();
                $('#loading #start-all').show(); 
            }
        }

        
    });

    return compareTitleView;
});