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
            var self = this;
            console.log("initialize");

            this.model.on("setdataset", this.createEmotionShape, this);
            this.model.on("setdataset", this.createTimeLineShape, this);
            this.model.on("change:currentDataSet", this.animateEmotionShape, this);
            this.model.on("change:currentDateTime", this.animateTimeLine, this);

            
            this.model.set("timeText", this.model.get("paper").text(0, 0, "Test"));
            this.model.get("timeText").attr("opacity", 0);
            this.model.set("emotionCircle", this.drawCircle(this.model.get("emotionCircleRadius"), this.model.get("positionX"), this.model.get("positionY")));
            this.model.get("emotionCircle").attr({ 
                "stroke-width": Constants.emotionCircleWidth, 
                "stroke": Constants.emotionCircleColor,
            });

            this.model.set("timeCircle", this.drawCircle(this.model.get("emotionCircleRadius")+Constants.timeCircleRadiusDifference, this.model.get("positionX"), this.model.get("positionY")));
            this.model.get("timeCircle").attr({ 
                "stroke-width": Constants.timeCircleWidth, 
                "stroke": Constants.timeCircleBaseColor,
            });

            this.model.get("timeCircle").click(function(event) {
                if(self.model.has("interval")) {
                    clearInterval(self.model.get("interval"));
                }
                var element = self.model.get("paper").canvas;
                var point = { "x": Math.floor((event.pageX-$(element).offset().left)), "y": event.pageY };

                var angle = self.model.getAngleFromPoint(point);
                console.log("Angle "+angle);
                var dateTime = self.model.getTimeFromAngle(angle);
                console.log("This is the time: "+dateTime);
            });

            this.model.get("timeCircle").mouseover(function(event) {
                self.showTime(event);
            });
            this.model.get("timeCircle").mouseout(function(event) {
                self.model.get("timeText").attr('opacity', 0);
            })
            
            this.model.startWatch();
            
        },

        events: {

        },

        /**
         * Function draws a circle on the paper
         *
         * @param radius
         * @param positionX (center)
         * @param positionY (center)
         *
         */
        drawCircle: function(radius, positionX, positionY) {
            var circle = this.model.get("paper").circle(positionX, positionY, radius);

            return circle;
        },

        /**
         * Draws the emotion shape (used only at initialization)
         *
         * return shape
         */
        drawEmotionShape: function() {
            var currentShapePath = this.model.getCurrentEmotionShapePath();
            var shape = this.model.get("paper").path(currentShapePath);

            return shape;
        },

        /**
         * Draws the timeline shape (used only at initialization)
         *
         * return shape
         */
        drawTimeLineShape: function() {
            var currentTimeLinePath = this.model.getCurrentTimeLinePath();
            var shape = this.model.get("paper").path(currentTimeLinePath);

            return shape;
        },

        /**
         * Initializes the emotion shape (used only at initialization)
         *
         * return shape
         */
        createEmotionShape: function() {
            console.log('event triggered');
            this.model.set("emotionShape", this.drawEmotionShape());
            this.model.get("emotionShape").attr({ 
                "fill": Constants.emotionShapeFillColor,
                "stroke": Constants.emotionShapeStrokeColor,
            });
        },

        /**
         * Initializes the timeline shape (used only at initialization)
         *
         * return shape
         */
        createTimeLineShape: function() {
            this.model.set("timeLineShape", this.drawTimeLineShape());
            this.model.get("timeLineShape").attr({ 
                "stroke": Constants.timeCircleTimeColor,
                "stroke-width": Constants.timeCircleWidth,
            });
        },

        /**
         * Changes the path of the emotion shape and animates the changement
         */
        animateEmotionShape: function() {
            var newPath = this.model.getCurrentEmotionShapePath();
            console.log(newPath);
            if(this.model.get("emotionShape")) {
                this.model.get("emotionShape").animate({
                    path: newPath
                }, this.model.get("iterationLength"));
            }            
        },

        /**
         * When event mouseover is triggered on the timeline, we show the time at that
         * specific position
         *
         * @param event
         */
        showTime: function(event) {
            var element = this.model.get("paper").canvas;
            this.model.get("timeText").attr('opacity', 1);
            var point = { "x": Math.floor((event.pageX-$(element).offset().left)), "y": event.pageY };
            var angle = this.model.getAngleFromPoint(point);

            var adjustedPoint = this.getTextFieldPosition(angle, point);

            var time = this.model.getTimeFromAngle(angle);
            var text = this.model.get("timeText");
            text.attr('x', adjustedPoint.x);
            text.attr('y', adjustedPoint.y);
            text.attr('text', time);
        },

        /**
         * Handles the animation of the timeline
         *
         */
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

        /**
         * Returns the text field position based on the angle
         * (Left or right side)
         *
         * @param angle
         * @param point
         *
         * @return adjustedPoint
         */
        getTextFieldPosition: function(angle, point) {
            console.log(angle/Constants.angle*360);

            if(angle <= Constants.angle / 2) {
                point.x += 120;
            } else {
                point.x -= 120;
            }

            return point;
        },
    });

    return emotionWatchView;

});