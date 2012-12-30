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

        viewPointer: new Array(),

        initialize: function(options) {
            console.log("EmotionWatchCOllection");

            this.radius = Constants.patternCircleRadius;
            this.startDateTime = new Date(options.startDateTime) || new Date("2012-07-26 00:00:00");
            this.endDateTime = new Date(options.endDateTime) || new Date("2012-08-13 24:00:00");
            this.currentDateTime = options.currentDateTime || this.startDateTime;
            this.keyword = options.keyword || null;
            this.network = options.network || 'twitter';
            this.timeStep = options.timeStep || (this.endDateTime.getTime() - this.startDateTime.getTime()) / 24 / 1000;

            // Golden ratio

            console.log(this.radius);

            this.spaceBetween = this.radius+10 / 1.618;

            console.log(this.spaceBetween);

            var self = this;

            this.bind('view:initialized', function() {
                self.viewInitialized();
            });
        },

        url: function() {
            return 'http://localhost:8080/emotionTweets';
        },

        viewInitialized: function() {
            console.log('test');
            var width = $(window).width();

            console.log("Paper width: "+Constants.paperWidth);
            
            this.elementsPerLine = Math.floor(width / (this.radius * 2 + this.spaceBetween));

            console.log(this.elementsPerLine);

            this.fetch({
                data: $.param({
                    startDateTime: this.startDateTime,
                    endDateTime: this.endDateTime,
                    topic: this.keyword,
                    network: this.network,
                    timeStep: this.timeStep,
                })
            });
        },

        parse: function(response) {
            console.log(response);
            var self = this;
            for(var i = 0; i < response.length; i++) {
                console.log("Index: "+i+" Line: "+this.getCoordinateY(i)+" Position: "+this.getCoordinateX(i));
                var x = this.radius+ this.spaceBetween + this.getCoordinateX(i)*(2*this.radius + this.spaceBetween);
                var y = this.radius+ this.spaceBetween + this.getCoordinateY(i)*(2*this.radius + this.spaceBetween);

                console.log("X: "+x+" y: "+y);

                var currentDateTime = new Date(response[i].startdate);

                console.log("Datetime: "+response[i].currentDateTime);

                console.log("Dataset:");
                console.log(response[i].emotions);

                var model = new emotionWatch({
                    mode: 'static',
                    paper: app.paper, 
                    emotionCircleRadius: self.radius,
                    startDate: new Date(self.startDateTime),
                    currentDateTime: new Date(currentDateTime),
                    currentDataSet: response[i].emotions,
                    endDate: new Date(self.endDateTime),
                    centerPoint: {"x": x, "y": y},
                    topic: self.keyword,
                    network: self.network,
                });

                var view = new emotionWatchView({
                    model: model,
                });

                view.createEmotionShape();

                self.viewPointer[model.cid] = view;

                if(currentDateTime.getTime() < self.currentDateTime.getTime()) {
                    model.trigger('show:model');
                }

                this.add(model);
            }
            console.log(this.models);
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