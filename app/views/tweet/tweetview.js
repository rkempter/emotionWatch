define([
    "app",
    "backbone",
    "jquery",
    "lodash",
    "util",
    "constants",

], function(app, Backbone, $, _, util, Constants) {
    
    var tweetView = Backbone.View.extend({

        template: 'tweet',

        tagName: 'li',

        initialize: function() {
            this.listenTo(app, 'close', this.close);
        },
        
        render: function() {
            var html = window.JST['app/templates/tweet.html'](this.model.toJSON());
            $('.tweets ul').append( html );
        },

        close: function() {
            this.unbind();
            this.remove();
        },
        
    });

    return tweetView;
})  