define([
    "app",
    "backbone",
    "jquery",
    "lodash",
    "util",
    "constants",
    "util",

], function(app, Backbone, $, _, util, Constants, util) {
    
    var welcomeView = Backbone.View.extend({

        template: 'welcome',

        events: {
            'click #event-search': 'triggerEventSearch',
            'click .keyword-search': 'triggerKeywordSearch',
            'change #event-gender': 'triggerEventLoad',
            'change #event-sport': 'triggerEventLoad',
        },

        initialize: function() {
            var self = this;
             _.bindAll(this, 'render');

            var welcomeModel = Backbone.Model.extend({
                parse: function(response) {
                    self.model.set('events', response);
                },
            });

            console.log('do it once');

            this.model = new welcomeModel();
            this.model.on("change", self.render, self);
        },

        triggerEventSearch: function(event) {
            var network = $('#event-network option:selected').val();
            var startDateTime = new Date($('#event-event option:selected').attr('data-startdatetime'));
            var endDateTime = new Date($('#event-event option:selected').attr('data-enddateTime'));
            var hashtagTwitter = $('#event-event option:selected').attr('data-hashtag-twitter');
            var hashtagWeibo = $('#event-event option:selected').attr('data-hashtag-weibo');
            var keyword;

            var timeStep = util.getTimeStep(startDateTime, endDateTime);
            switch(network) {
                case 'twitter':
                    keyword = hashtagTwitter;
                    break;
                case 'weibo':
                    keyword = hashtagWeibo;
                    break;
            } 
            var keywordType = util.getKeywordType(keyword);

            app.router.navigate('/search/'+network+'/'+keywordType+'/'+keyword.slice(1)+'/'+timeStep+'/'+startDateTime.getTime()+'/'+endDateTime.getTime(), true);

        },

        cleanup: function() {
          //this.model.off(null, null, this);
        },

        triggerEventLoad: function() {
            console.log('triggered');
            var self = this;
            var gender = $('#event-gender option:selected').val();
            var sport = $('#event-sport option:selected').val();

            this.model.fetch({ 
                data: $.param({ 
                    gender: gender,
                    sport: sport,
                }),
                silent: true,
                url: "http://localhost:8080/specEvents",
                success: function() {
                    console.log(self.model);
                }
            });
        },

        triggerKeywordSearch: function(event) {
            console.log('Keyword Search triggered');
            var startDate = $('#keyword-start-date').val();
            var startTime = $('#keyword-start-time').val();
            var endDate = $('#keyword-end-date').val();
            var endTime = $('#keyword-end-time').val();
            var startDateTime = new Date(startDate+" "+startTime);
            var endDateTime = new Date(endDate+" "+endTime);

            var timeStep = util.getTimeStep(startDateTime, endDateTime);
            var keyword = $('#keyword').val();
            var network = $('#keyword-network').val();

            var keywordType = util.getKeywordType(keyword);

            app.router.navigate('/search/'+network+'/'+keywordType+'/'+keyword.slice(1)+'/'+timeStep+'/'+startDateTime.getTime()+'/'+endDateTime.getTime(), true);
        },

        render: function(template) {  
            var events = this.model.get('events') || new Array();
            console.log(events);
            var output = template( { events: events } );
            $( this.el ).html( output );
        },

        
    });

    return welcomeView;
})  