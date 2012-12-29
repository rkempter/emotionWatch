define([
    // Application.
    "app",
    "backbone",
    "lodash",
    "jquery",
    "emotionwatch",
    "emotionwatchview",
    "constants"
], function(app, Backbone, _, $, emotionWatch, emotionWatchView, Constants) {

    var emotionWatchCollection = Backbone.Collection.extend({

        model: emotionWatch,

        watchViews: new Array(),

        initialize: function(options) {

            this.radius = options.radius;
            this.startDateTime = options.startdate;
            this.endDateTime = options.enddate;
            this.keyword = options.keyword;
            this.network = options.network;
            
            this.windowSize = (this.endDateTime.getTime() - this.startDateTime.getTime()) / 24 / 1000;

            // Golden ratio

            this.spaceBetween = this.radius+1 / 1.618;

            var width = app.paper.width;

            console.log("Paper width: "+Constants.paperWidth);
            
            this.elementsPerLine = Math.floor(width / (this.radius * 2 + this.spaceBetween));

            console.log("Elements per line: "+this.elementsPerLine);

            this.fetch({
                data: $.param({
                    startDateTime: this.startDateTime,
                    endDateTime: this.endDateTime,
                    keyword: this.keyword,
                    network: this.network,
                    windowSize: this.windowSize,
                })
            });
        },

        url: function() {
            return 'http://localhost:8080/getPatternWatches';
        },

        parse: function(response) {
            console.log(response);
            var self = this;
            for(var i = 1; i < response.length; i++) {
                console.log("Index: "+i+" Line: "+this.getCoordinateY(i-1)+" Position: "+this.getCoordinateX(i-1));
                var x = this.radius+ this.spaceBetween + this.getCoordinateX(i-1)*(2*this.radius + this.spaceBetween);
                var y = this.radius+ this.spaceBetween + this.getCoordinateY(i-1)*(2*this.radius + this.spaceBetween);

                var currentDateTime = response[i].startdate;

                console.log("Datetime: "+response[i].currentDateTime);

                var model = new emotionWatch({ 
                    paper: app.paper, 
                    emotionCircleRadius: self.radius,
                    startDate: new Date(self.startDateTime),
                    currentDateTime: new Date(currentDateTime),
                    currentDataSet: response[i].data,
                    endDate: new Date(self.endDateTime),
                    centerPoint: {"x": x, "y": y},
                    topic: self.keyword,
                    network: self.network,
                });

                this.add(model);
            }
            this.render();
        },

        getCoordinateX: function(nbr) {
            return (nbr % this.elementsPerLine);
        },

        getCoordinateY: function(nbr) {
            return Math.floor( (nbr) / this.elementsPerLine);
        },

    });

    return emotionWatchCollection;
});