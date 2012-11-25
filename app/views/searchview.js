define([
    "app",
    "underscore",
    "jquery", 
    "backbone", 
    "raphael",
    'constants',
    "emotionwatch"
    
], function(app, _, $, Backbone, Raphael, Constants, emotionWatch) {

    var searchView = Backbone.View.extend({

        template: 'search',

        events: {
            'click #search-form .search-btn': 'searchResult',
        },

        initialize: function() {
            console.log("test");
        },

        searchResult: function(e) {
            e.preventDefault();
            console.log("Button clicked");
            var keyword = $('#search-form #keyword').val();
            var startdate = $('#search-form select option:selected').attr('value');

            var collection = app.emotionWatchCollection;

            var newEmotionWatch = new emotionWatch({ 
                paper: app.paper, 
                emotionCircleRadius: 300,
                startDate: new Date(startdate),
                currentDateTime: new Date(startdate),
                endDate: new Date('July 28, 2012 22:00:00'),
                centerPoint: {"x": 600, "y": 400},
                topic: keyword,
                positionX: 600, 
                positionY: 400,
                network: "twitter",
            });

            app.emotionWatchCollection.add(newEmotionWatch);

            
        },
    });

    return searchView;
});