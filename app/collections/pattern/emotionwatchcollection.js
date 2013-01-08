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

        viewPointer: [],

        initialize: function(options) {
             _.bindAll(this, 'detect_scroll');
            this.radius = Constants.patternCircleRadius;
            this.startDateTime = new Date(options.startDateTime) || new Date("2012-07-26 00:00:00");
            this.endDateTime = new Date(options.endDateTime) || new Date("2012-08-13 24:00:00");
            this.currentDateTime = new Date(options.currentDateTime) || this.startDateTime;
            this.keyword = options.keyword || null;
            this.network = options.network || 'twitter';
            var self = this;
            this.timeStep = options.timeStep || (this.endDateTime.getTime() - this.startDateTime.getTime()) / 24 / 1000;

            // Define the outer radius of the watch (with empty space)
            this.spaceBetween = this.radius+20;

            this.bind('view:initialized', function() {
                self.viewInitialized();
            }, self);
        },

        url: function() {
            return 'http://localhost:8080/emotionTweets';
        },

        viewInitialized: function() {
            // How large is the space we have?
            var width = app.windowWidth;
            // Compute the number of watches per line
            this.elementsPerLine = Math.floor(width / (this.radius * 2 + this.spaceBetween));
            // How much space do we need?
            var visualizationWidth = this.elementsPerLine * (this.radius*2+this.spaceBetween);
            // Compute the margin on the left and right side, so that the watches are centred
            this.sideSpace = (width - visualizationWidth) / 2;
            // Fetch all the data
            this.fetch({
                data: $.param({
                    startDateTime: this.startDateTime,
                    endDateTime: this.endDateTime,
                    topic: this.keyword,
                    network: this.network,
                    timeStep: this.timeStep
                })
            });
        },

        parse: function(response) {
            // Find max frequency
            var max = 0;
            for(var time in response) {
                var freq = parseInt(response[time].frequency);
                if(max < freq) {
                    max = freq;
                }
            }
            
            var self = this;
            // Initialize localStartDateTime
            var localStartDateTime = this.startDateTime;
            // Keeps the position of each model in the array
            var i = 0;
            // Go through all 
            while(localStartDateTime.getTime() < this.endDateTime.getTime()) {
                var x = this.sideSpace + 45 + this.spaceBetween + this.getCoordinateX(i)*(2*this.radius + this.spaceBetween);
                var y = this.radius+ this.spaceBetween + this.getCoordinateY(i)*(2*this.radius + this.spaceBetween);

                var emotionObject = response[localStartDateTime] || {};
                var emotions = emotionObject.emotions || Constants.nullEmotion;
                var frequency = emotionObject.frequency || 0;

                var model = new emotionWatch({
                    mode: 'static',
                    paper: app.paper, 
                    emotionCircleRadius: self.radius,
                    startDate: self.startDateTime,
                    currentDateTime: localStartDateTime,
                    currentDataSet: emotions,
                    endDate: self.endDateTime,
                    centerPoint: {"x": x, "y": y},
                    timeStep: self.timeStep,
                    topic: self.keyword,
                    network: self.network,
                    currentFrequencyRatio: frequency / max
                });

                var view = new emotionWatchView({
                    model: model
                });

                self.viewPointer[model.cid] = view;

                this.add(model);

                i++;

                localStartDateTime = new Date(localStartDateTime.getTime() + self.timeStep * 1000);
            }
            // How many lines do we have?
            var lines = Math.ceil(this.models.length / this.elementsPerLine);
            // Adjust the canvas to appropriate length
            this.adjustCanvasSize(lines);

            var last = parseInt((self.currentDateTime.getTime()-self.startDateTime.getTime()) / (self.timeStep*1000));
            this.at(last).trigger('scroll:model');
        },

        // Adjust the canvas size depending of the number of lines
        adjustCanvasSize: function(lines) {
            var height = (this.spaceBetween+50) * 2 * lines;
            app.paper.setSize("100%", height);
        },

        // Computes the x coordinate of a watch depending on its number in the array
        getCoordinateX: function(nbr) {
            return (nbr % this.elementsPerLine);
        },
        // Computes the y coodinate of a watch depending on its number in the array
        getCoordinateY: function(nbr) {
            return Math.floor( (nbr) / this.elementsPerLine);
        }
    });

    return emotionWatchCollection;
});