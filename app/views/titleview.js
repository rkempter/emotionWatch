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
            console.log(this.model.get('endDateTime'));
            var self = this;
            if(self.model.get('keyword').indexOf('#') !== -1) {
                self.model.set('keywordType', 'keyword');
            } else {
                self.model.set('keywordType', 'user');
            }
            app.on('set:globalTime', function(currentDateTime) {
                self.model.set('currentDateTime', currentDateTime);
                self.render();
            })
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
            });
            $( this.el ).html( output );
        },

    });

    return titleView;
})  