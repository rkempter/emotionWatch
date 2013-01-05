define([
    "app",
    "backbone",
    "jquery",
    "lodash",
    "util",
    "constants",

], function(app, Backbone, $, _, util, Constants) {
    
    var searchKeywordView = Backbone.View.extend({

        template: 'searchkeywordtemplate',

        events: {
            'click .keyword-search': 'triggerKeywordSearch',
        },

        triggerKeywordSearch: function(event) {
            // Get all values from the form
            var startDate = $('#keyword-start-date').val();
            var startTime = $('#keyword-start-time').val();
            var endDate = $('#keyword-end-date').val();
            var endTime = $('#keyword-end-time').val();
            var startDateTime = new Date(startDate+" "+startTime);
            var endDateTime = new Date(endDate+" "+endTime);
            // Get appropriate timestep
            var timeStep = util.getTimeStep(startDateTime, endDateTime);
            var keyword = $('#keyword').val();
            var network = $('#keyword-network').val();
            // Get keywordType (hashtag, user)
            var keywordType = util.getKeywordType(keyword);
            // Navigate to computed route
            app.router.navigate('/search/'+network+'/'+keywordType+'/'+keyword.slice(1)+'/'+timeStep+'/'+startDateTime.getTime()+'/'+endDateTime.getTime(), true);
            this.listenTo(app, 'close', this.close);
        },

        close: function() {
            this.remove();
            this.unbind();
        },
        
    });

    return searchKeywordView;
})  