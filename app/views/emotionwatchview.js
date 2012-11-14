define([
    "underscore",
    "jquery", 
    "backbone", 
    "raphael",
    'constants'
], function(_, $, Backbone, Raphael, Constants) {

    var emotionWatchView = Backbone.View.extend({

        el: 'div',

        initialize: function(options) {
            console.log("initialize");

            this.model.on("setdataset", this.createEmotionShape, this);
            this.model.on("setdataset", this.createTimeLineShape, this);
            this.model.on("change:currentDataSet", this.animateEmotionShape, this);
            this.model.on("change:currentDateTime", this.animateTimeLine, this);

            this.model.set("emotionCircle", this.drawCircle(this.model.get("emotionCircleRadius"), this.model.get("positionX"), this.model.get("positionY")));
            this.model.get("emotionCircle").attr({ 
                "stroke-width": Constants.emotionCircleWidth, 
                "stroke": Constants.emotionCircleColor,
            });

            this.timeCircle = this.drawCircle(this.model.get("emotionCircleRadius")+Constants.timeCircleRadiusDifference, this.model.get("positionX"), this.model.get("positionY"));
            this.timeCircle.attr({ 
                "stroke-width": Constants.timeCircleWidth, 
                "stroke": Constants.timeCircleBaseColor,
            });
            
            this.model.startWatch();
            
        },

        events: {

        },

        drawCircle: function(radius, positionX, positionY) {
            var circle = this.model.get("paper").circle(positionX, positionY, radius);

            return circle;
        },

        drawEmotionShape: function() {
            var currentShapePath = this.model.getCurrentEmotionShapePath();
            var shape = this.model.get("paper").path(currentShapePath);

            return shape;
        },

        drawTimeLineShape: function() {
            var currentTimeLinePath = this.model.getCurrentTimeLinePath();
            var shape = this.model.get("paper").path(["M", this.model.get("centerPoint").x, this.model.get("centerPoint").y-this.model.get("emotionCircleRadius")-Constants.timeCircleRadiusDifference]);

            return shape;
        },

        createEmotionShape: function() {
            console.log('event triggered');
            this.model.set("emotionShape", this.drawEmotionShape());
            this.model.get("emotionShape").attr({ 
                "fill": Constants.emotionShapeFillColor,
                "stroke": Constants.emotionShapeStrokeColor,
            });
        },

        createTimeLineShape: function() {
            this.model.set("timeLineShape", this.drawTimeLineShape());
            this.model.get("timeLineShape").attr({ 
                "stroke": Constants.timeCircleTimeColor,
                "stroke-width": Constants.timeCircleWidth,
            });
        },

        animateEmotionShape: function() {
            var newPath = this.model.getCurrentEmotionShapePath();
            console.log(newPath);
            if(this.model.get("emotionShape")) {
                this.model.get("emotionShape").animate({
                    path: newPath
                }, this.model.get("iterationLength"));
            }            
        },

        animateTimeLine: function() {
            console.log("time changed");

            var newTimeShape = this.model.getCurrentTimeLinePath();
            console.log("newTimeShape "+newTimeShape);
            if(this.model.get("timeLineShape")) {
                this.model.get("timeLineShape").animate({
                 path: newTimeShape
                }, this.model.get("iterationLength"));
            }
        },
    });

    return emotionWatchView;

});