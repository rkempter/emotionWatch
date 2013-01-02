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

            this.spaceBetween = this.radius+10 / 1.618;

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
            var y = $(document).scrollTop()+760;
            var elements = Math.floor((parseInt(y)-60) / ((this.spaceBetween+60) * 2)) * this.elementsPerLine;
            console.log(elements);
            app.trigger("scroll:activate", elements);
            // app.trigger('scroll:collection', y);
        },

        parse: function(response) {
            var totalNbrWatches = response.length;
            this.adjustCanvasSize(response.length);

            var max = _.max(response, function(frequency) {
                return parseInt(frequency.frequency);
            });
            max = parseInt(max.frequency);
            
            var self = this;
            for(var i = 0; i < response.length; i++) {
                var x = 60+ this.spaceBetween + this.getCoordinateX(i)*(2*this.radius + this.spaceBetween);
                var y = this.radius+ this.spaceBetween + this.getCoordinateY(i)*(2*this.radius + this.spaceBetween);

                var currentDateTime = new Date(response[i].dateTime);

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
                    currentFrequencyRatio: parseInt(response[i].frequency) / max,
                });

                var view = new emotionWatchView({
                    model: model,
                });

                self.viewPointer[model.cid] = view;

                this.add(model);
            }

            app.trigger('show:model', self.currentDateTime.getTime());

            var last = parseInt((self.currentDateTime.getTime()-self.startDateTime.getTime()) / (self.timeStep*1000))
            console.log("The last one: "+last);
            this.at(last).trigger('scroll:model');
            console.log("Collection length: "+this.models.length);
        },

        adjustCanvasSize: function(nbr) {
            var lines = Math.ceil(nbr / this.elementsPerLine);
            var height = (this.spaceBetween+50) * 2 * lines+300;

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