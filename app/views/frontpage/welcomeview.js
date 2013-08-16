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
            this.listenTo(app, 'close', this.close);
        },

        render: function(template) {
            var output = template(this.model.toJSON());
            this.$el.html( output );
        },

        close: function() {
            this.remove();
            this.unbind();
        }
    });

    return welcomeView;
});