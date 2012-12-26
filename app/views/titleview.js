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

        initialize: function(options) {
            this.el = options.el || {};
            this.model = new Backbone.Model();
            this.model.set("title", options.title || {} );
            this.render();
        },

        render: function() {
            var output = window.JST['app/templates/titletemplate.html']( { title: this.model.get("title") } );
            $( this.el ).html( output );
        },

    });

    return titleView;
})  