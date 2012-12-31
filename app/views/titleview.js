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

        render: function() {
            console.log(this.model.get("title"));
            var output = window.JST['app/templates/titletemplate.html']( { title: this.model.get("title") } );
            $( this.el ).html( output );
        },

    });

    return titleView;
})  