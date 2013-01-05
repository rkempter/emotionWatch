define([
    "app",
    "backbone",
    "jquery",
    "lodash",
    "util",
    "constants",

], function(app, Backbone, $, _, util, Constants) {
    
    var searchEventView = Backbone.View.extend({

        template: 'searcheventtemplate',

        events: {
            'click #event-search': 'triggerEventSearch',
            'change #event-gender': 'triggerEventLoad',
            'change #event-sport': 'triggerEventLoad',
        },

        initialize: function() {
            var self = this;
            // Bind this to the render function
             _.bindAll(this, 'render');

            // Define shorthand the welcomeModel
            var searchEventModel = Backbone.Model.extend({
                // Define Parse method of model
                parse: function(response) {
                    self.model.set('events', response);
                },
            });
            // Create new model
            this.model = new searchEventModel();
            // BInd on change of model to render method
            this.model.on("change", self.render, self);
            this.listenTo(app, 'close', this.close);
        },

        triggerEventSearch: function(event) {
            // Read all values from the form
            var network = $('#event-network option:selected').val();
            var startDateTime = new Date($('#event-event option:selected').attr('data-startdatetime'));
            var endDateTime = new Date($('#event-event option:selected').attr('data-enddateTime'));
            var hashtagTwitter = $('#event-event option:selected').attr('data-hashtag-twitter');
            var hashtagWeibo = $('#event-event option:selected').attr('data-hashtag-weibo');
            var keyword;
            // Compute appropriate timestep
            var timeStep = util.getTimeStep(startDateTime, endDateTime);
            // Select keyword according to the network
            switch(network) {
                case 'twitter':
                    keyword = hashtagTwitter;
                    break;
                case 'weibo':
                    keyword = hashtagWeibo;
                    break;
            } 
            // Find the keywordType (user, hashtag) @todo: keywordType event?
            var keywordType = util.getKeywordType(keyword);
            // Navigate to computeted route
            app.router.navigate('/search/'+network+'/'+keywordType+'/'+keyword.slice(1)+'/'+timeStep+'/'+startDateTime.getTime()+'/'+endDateTime.getTime(), true);
        },

        close: function() {
            this.remove();
            this.unbind();
        },

        // If sport selected, load the possible events
        triggerEventLoad: function() {
            var self = this;
            // Get gender and sport
            var gender = $('#event-gender option:selected').val();
            var sport = $('#event-sport option:selected').val();
            // Fetch events
            this.model.fetch({ 
                data: $.param({ 
                    gender: gender,
                    sport: sport,
                }),
                silent: true,
                url: "http://localhost:8080/specEvents",
            });
        },

        // Render template
        render: function(template) {  
            var events = this.model.get('events') || new Array();
            var output = template( { events: events } );
            this.$el.html( output );
        },

    });

    return searchEventView;
})  