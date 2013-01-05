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
            // Compute keyword type for urls
            var keywordType = util.getKeywordType(keyword);
            this.model.set('keywordType', keywordType);
            // Listen to global close event
            this.listenTo(app, 'close', this.close);
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
            });
            $( this.el ).html( output );
        },
    });

    return titleView;
})  