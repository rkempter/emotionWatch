define([
    "app",
    "backbone",
    "jquery",
    "lodash",
    "util",
    "constants"
], function(app, Backbone, $, _, util, Constants) {
    
    var searchEventView = Backbone.View.extend({

        template: 'searcheventtemplate',

        events: {
            'click #event-search': 'triggerEventLoading'
        },

        initialize: function(options) {
            
            // Bind this to the render function
            // Define shorthand the model
            var model = Backbone.Model.extend({
                urlRoot: function() {
                    return app.server+"getEventList";
                },
                parse: function(data) {
                    this.set('events', data);
                }
            });
            // Create new model
            this.model = new model();
            _.bindAll(this, 'render');
            this.model.fetch();
            this.model.on("change", this.render, this);
            this.listenTo(app, 'close', this.close);
            
        },

        triggerEventLoading: function() {
            $option = $('#event-selection option:selected');

            var id = $option.val();
            var events = this.model.get('events');
            var event = events[id];
            var network = $('#event-network option:selected').val();

            var url = '#search/';
            url += network+"/";
            url += 'event/';
            url += id+"/";
            url += 5+"/";
            url += new Date(event.startDateTime).getTime()+"/";
            url += new Date(event.endDateTime).getTime();

            app.router.navigate(url, true);
        },

        // Render template
        render: function(template) {
            if(this.model.get('events') !== undefined) {
                var output = template(this.model.toJSON());
                this.$el.html( output );
            }
        },

        close: function() {
            this.remove();
            this.unbind();
        }

    });

    return searchEventView;
});