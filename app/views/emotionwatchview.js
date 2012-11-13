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
            this.model.on("change:currentDataSet", this.animateEmotionShape, this);
            this.model.on("change:currentDateTime", this.animateTimeLine, this);

            this.model.set("emotionCircle", this.drawCircle(this.model.get("emotionCircleRadius"), this.model.get("positionX"), this.model.get("positionY")));
            this.model.get("emotionCircle").attr({ 
                "stroke-width": Constants.emotionCircleWidth, 
                "stroke": Constants.emotionCircleColor,
            });

            this.timeCircle = this.drawCircle(this.model.get("emotionCircleRadius")+40, this.model.get("positionX"), this.model.get("positionY"));
            this.timeCircle.attr({ 
                "stroke-width": Constants.timeCircleWidth, 
                "stroke": Constants.timeCircleBaseColor,
            });

            // this.timeShape = this.drawTimeShape();
            // this.timeShape.attr({ 
            //  "stroke-width": Constants.timeCircleWidth, 
            //  "stroke": Constants.timeCircleTimeColor,
            // });
            
            this.model.startWatch();
            
        },

        events: {

        },

        drawCircle: function(radius, positionX, positionY) {
            var circle = this.model.get("paper").circle(positionX, positionY, radius);

            return circle;
        },

        drawEmotionShape: function() {
            // Set DataSet?
            var currentShapePath = this.model.getCurrentEmotionShapePath();
            console.log(currentShapePath);
            var shape = this.model.get("paper").path(currentShapePath);

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

        drawTimeShape: function() {
            var currentTimeLineAngle = this.model.getTimeLineAngle();
            var currentTimeLinePath = this.model.getTimeLinePath(currentTimeLineAngle);
            var timeLineShape = this.model.get("paper").path(currentTimeLinePath);

            return timeLineShape;
        },

        animateEmotionShape: function() {
            var newPath = this.model.getCurrentEmotionShapePath();
            console.log(newPath);
            if(this.model.get("emotionShape")) {
                this.model.get("emotionShape").animate({
                    path: newPath
                }, this.model.get("iterationLength"));
            }

            // var newTimeShape = this.model.getCurrentTimeLinePath();
            // this.timeCircle.animate({
            //  path: newTimeShape
            // }, this.model.iterationLength);

            // Do the same for colors
        },

        animateTimeLine: function() {
            console.log("time changed");
            var newAngle = this.model.getTimeLineAngle();

            // var newPath = this.model.getCurrentEmotionShapePath();
            // console.log(newPath);
            // if(this.model.get("emotionShape")) {
            //     this.model.get("emotionShape").animate({
            //         path: newPath
            //     }, this.model.get("iterationLength"));
            // }

            // var newTimeShape = this.model.getCurrentTimeLinePath();
            // this.timeCircle.animate({
            //  path: newTimeShape
            // }, this.model.iterationLength);

            // Do the same for colors
        },
    });

    return emotionWatchView;

});