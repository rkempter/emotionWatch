define([
    "app",
    "backbone",
    "jquery",
    "lodash",
    "util",
    "constants",

], function(app, Backbone, $, _, util, Constants) {
    
    var titleView = Backbone.View.extend({

        template: 'titletemplate',

        initialize: function() {
            var self = this;
            var keyword = this.model.get('keyword');
            var keywordType = this.model.get('keywordType');
            // Compute keyword type for urls
            this.model.set('keywordType', keywordType);
            // Listen to global close event
            this.listenTo(app, 'close', this.close);

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

        // Render template with small submenu for the three views
        render: function() {
            var urlSingle = '/search/'+this.model.get('network')+'/'+this.model.get('keywordType')+'/'+this.model.get('keyword').slice(1)+'/'+this.model.get('timeStep')+'/'+this.model.get('startDateTime').getTime()+'/'+this.model.get('endDateTime').getTime()+'/'+this.model.get('currentDateTime').getTime();
            var urlPattern = '/pattern/'+this.model.get('network')+'/'+this.model.get('keywordType')+'/'+this.model.get('keyword').slice(1)+'/'+this.model.get('timeStep')+'/'+this.model.get('startDateTime').getTime()+'/'+this.model.get('endDateTime').getTime()+'/'+this.model.get('currentDateTime').getTime();
            var urlCompare = '/compare/'+this.model.get('keywordType')+'/'+this.model.get('keyword').slice(1)+'/'+this.model.get('timeStep')+'/'+this.model.get('startDateTime').getTime()+'/'+this.model.get('endDateTime').getTime()+'/'+this.model.get('currentDateTime').getTime();
            var output = window.JST['app/templates/titletemplate.html']({ 
                title: this.model.get("keyword"),
                urlSingle: urlSingle,
                urlPattern: urlPattern,
                urlCompare: urlCompare,  
                startDateTime: this.model.get('startDateTime'),
                endDateTime: this.model.get('endDateTime'),
                steps: util.getTimeStepFormat(this.model.get('timeStep')),
                event: this.model.get("event") || null,
                gender: this.model.get("gender") || null,
            });
            $( this.el ).html( output );
        },
    });

    return titleView;
})  