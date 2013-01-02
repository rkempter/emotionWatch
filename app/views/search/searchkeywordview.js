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

        cleanup: function() {
          this.model.off(null, null, this);
        },

        
    });

    return searchKeywordView;
})  