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

            if(self.model.get('keyword').indexOf('#') !== -1) {
                self.model.set('keywordType', 'keyword');
            } else {
                self.model.set('keywordType', 'user');
            }
        },

        events: {
            'click .keyword-title': 'test',
        },

        test: function() {
            console.log('rrrrr');
        },

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