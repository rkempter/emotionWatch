define([
    "app",
    "backbone",
    "jquery",
    "lodash",
    "util",
    "constants",

], function(app, Backbone, $, _, util, Constants) {

    var detailView = Backbone.View.extend({

        template: 'detailview',
    
        initialize: function() {
            _.bindAll(this, "render");

            var self = this;

            this.listenTo(app, 'preview:mouseover', this.showDetail);
            this.listenTo(app, 'preview:mouseout', this.hideDetail);
            this.listenTo(app, 'close', this.close);

            this.model.on('change', function(e) {
                self.render();
            });
        },

        showDetail: function(params) {
            this.model.set('left', params.left);
            this.model.set('localStartDateTime', moment(params.localStartDateTime).format("MM. DD. YYYY HH:mm"));
            this.model.set('localEndDateTime', moment(params.localEndDateTime).format("MM. DD. YYYY HH:mm"));
            this.model.set('tweetCount', params.tweetCount);
            this.model.set('dominantEmotion', params.dominantEmotion);
        },

        hideDetail: function() {
            $(this.el).removeClass('show').addClass('hide');
        },

        render: function(template) {
            var output = template(this.model.toJSON());
            this.$el.html(output).removeClass('hide').addClass('show').css('left', this.model.get('left'));
        },

        close: function() {
            this.unbind();
            this.remove();
        },
    });

    return detailView;
});