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
            console.log(options);

            this.radius = Constants.patternCircleRadius;
            this.startDateTime = new Date(options.startDateTime) || new Date("2012-07-26 00:00:00");
            this.endDateTime = new Date(options.endDateTime) || new Date("2012-08-13 24:00:00");
            this.currentDateTime = new Date(options.currentDateTime) || this.startDateTime;
            this.keyword = options.keyword || null;
            this.network = options.network || 'twitter';
            this.timeStep = options.timeStep || (this.endDateTime.getTime() - this.startDateTime.getTime()) / 24 / 1000;

            // Golden ratio

            this.spaceBetween = this.radius+20;
            console.log("Space between "+this.spaceBetween);

            var self = this;

            this.bind('view:initialized', function() {
                self.viewInitialized();
            });


            _.bindAll(this, 'detect_scroll');
            // bind to window
            $(window).scroll(this.detect_scroll);
        },

        url: function() {
            return 'http://localhost:8080/emotionTweets';
        },

        viewInitialized: function() {
            var width = $(window).width();
            
            this.elementsPerLine = Math.floor(width / (this.radius * 2 + this.spaceBetween));

            var visualizationWidth = this.elementsPerLine * (this.radius*2+this.spaceBetween);
            this.sideSpace = (width - visualizationWidth) / 2;

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

        detect_scroll: function() {
            var y = $(document).scrollTop()+610;
            console.log("Scroll y: "+y);

            var elements = Math.floor(parseInt(y) / (this.spaceBetween * 2+60)) * this.elementsPerLine;
            console.log(elements);
            app.trigger("scroll:activate", elements);
        },

        parse: function(response) {
            var max = 0;
            for(var time in response) {
                var freq = parseInt(response[time].frequency);
                if(max < freq) {
                    max = freq;
                }
            }
            
            var self = this;
            var localStartDateTime = this.startDateTime;
            var i = 0;

            while(localStartDateTime.getTime() <= this.endDateTime.getTime()) {
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
                    currentFrequencyRatio: frequency / max,
                });

                var view = new emotionWatchView({
                    model: model,
                });

                self.viewPointer[model.cid] = view;

                this.add(model);

                i++;

                localStartDateTime = new Date(localStartDateTime.getTime() + self.timeStep * 1000);
            }

            app.trigger('show:model', self.currentDateTime.getTime());

            var lines = Math.ceil(this.models.length / this.elementsPerLine);
            this.adjustCanvasSize(lines);

            var last = parseInt((self.currentDateTime.getTime()-self.startDateTime.getTime()) / (self.timeStep*1000))
            console.log("The last one: "+last);
            this.at(last).trigger('scroll:model');
            console.log("Collection length: "+this.models.length);
        },

        adjustCanvasSize: function(lines) {
            var height = (this.spaceBetween+50) * 2 * lines;
            console.log("Paper height: "+height);

            app.paper.setSize("100%", height);
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