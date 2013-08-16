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
                } 
            });
            // Create new model
            this.model = new model();

            this.model.fetch();
            this.listenTo(app, 'close', this.close);
        },

        triggerEventLoading: function() {
            $option = $('#event-selection option:selected');

            var id = $option.val();
            var startDateTime = $option.attr('data-start');
            var endDateTime = $option.attr('data-end');
            var network = $('#event-network option:selected').val();

            var url = '#search/';
            url += network+"/";
            url += 'event/';
            url += id+"/";
            url += 5+"/";
            url += new Date(startDateTime).getTime()+"/";
            url += new Date(endDateTime).getTime();

            console.log(url);

            app.router.navigate(url, true);
        },

        // Render template
        // render: function(template) {
        //     var output = template(this.model.toJSON());
        //     this.$el.html( output );
        // },

        close: function() {
            this.remove();
            this.unbind();
        }

    });

    return searchEventView;
});