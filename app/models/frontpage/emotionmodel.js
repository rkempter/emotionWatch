define([
    "backbone",
    "underscore",
    "jquery",
    "util",
    "constants",
], function(Backbone, _, $, util, Constants) {

    var emotionModel = Backbone.Model.extend({

        initialize: function() {
            this.set("centerPoint", this.getCenterPoint());
        },

        getCenterPoint: function() {
            // Compute a random center point in the limits of the window
            var width = $(window).width();
            var height = $(window).height();
            var x = Math.random() * width;
            var y = Math.random() * height;

            return { "x": x, "y": y };
        },

        getCurrentEmotionShapePath: function() {
            // Compute the current EmotionShape
            var dataSet = this.get("dataset");
            // Compute the first point of the shape
            var firstPoint = util.getPoint(this.get("centerPoint"), dataSet[0].value, 0, 200);
            var pathString = "M "+firstPoint.x+" "+firstPoint.y;
            var previous = firstPoint;
            // Independant of the labelnumber -> Get number of labels
            var totalPoints = Constants.labels.length;
            // Compute the position of the rest of the points
            for(var i = 1; i < totalPoints; i++) {
                var currentPoint = util.getPoint(this.get("centerPoint"), dataSet[i].value, i*2*Math.PI / totalPoints, 200);
                var pathDiff = util.getRelativePoint(currentPoint, previous);
                pathString += " l "+pathDiff.x+" "+pathDiff.y;
                previous = currentPoint;
            }
            // Close the shape
            pathString += " Z";
              
            return pathString
        },
    })

    return emotionModel;
});