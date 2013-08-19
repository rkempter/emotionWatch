define([
    "app",
    "backbone",
    "jquery",
    "lodash",
    "util",
    "constants",
    "searcheventview",
    "searchkeywordview"

], function(app, Backbone, $, _, util, Constants, searchEventView, searchKeywordView) {
    
    var welcomeView = Backbone.View.extend({

        template: 'welcome',

        initialize: function() {
            _.bindAll(this, 'render');
            // Bind view to close event
            var model = Backbone.Model.extend({
                urlRoot: function() {
                    return app.server+"getEventList";
                },
                parse: function(data) {
                    this.set('events', data);
                }
            });

            this.model = new model();
            this.model.fetch();
            this.model.on("change", this.render, this);
            this.listenTo(app, 'close', this.close);
        },

        render: function(template) {
            if(this.model.get('events') !== undefined) {
                var output = template(this.model.toJSON());
                this.$el.html( output );
            }
        },

        close: function() {
            this.remove();
            this.unbind();
            this.model.unbind('change', this.render);
        }
    });

    return welcomeView;
});