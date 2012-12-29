define([
    "app",
    "backbone",
    "jquery",
    "lodash",
    "util",
    "constants",

], function(app, Backbone, $, _, util, Constants) {
    
    var welcomeView = Backbone.View.extend({

        template: 'welcome',

        events: {
            'click #event-search': 'triggerEventSearch',
            'click .keyword-search': 'triggerKeywordSearch',
        },

        initialize: function() {
            this.render();
        },

        test: function() {
            console.log('arsch');
        },

        triggerEventSearch: function(event) {
            console.log('Event Search triggered');
        },

        triggerKeywordSearch: function(event) {
            console.log('Keyword Search triggered');
            var startDate = $('#keyword-start-date').val();
            var startTime = $('#keyword-start-time').val();
            var endDate = $('#keyword-end-date').val();
            var endTime = $('#keyword-end-time').val();
            var startDateTime = new Date(startDate+" "+startTime);
            var endDateTime = new Date(endDate+" "+endTime);
            var keyword = $('#keyword').val().slice(1);

            var network = $('#keyword-network').val();

            app.router.navigate('/search/'+network+'/keyword/'+keyword+'/'+startDateTime.getTime()+'/'+endDateTime.getTime(), true);
        },

        
    });

    return welcomeView;
})  