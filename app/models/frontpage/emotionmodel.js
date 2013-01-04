define([
    "backbone",
    "underscore",
    "jquery",
    "util",
], function(Backbone, _, $, util) {

    var emotionModel = Backbone.Model.extend({

        initialize: function() {
            this.set("centerPoint", this.getCenterPoint());
        },

        getCenterPoint: function() {
            var width = $(window).width();
            var height = $(window).height();
            var x = Math.random() * width;
            var y = Math.random() * height;

            return { "x": x, "y": y };
        },

        clear: function() {
          this.model.destroy();
        },

        getCurrentEmotionShapePath: function() {
            var dataSet = this.get("dataset");
            
            var firstPoint = util.getPoint(this.get("centerPoint"), dataSet[0].value, 0, 200);
            var pathString = "M "+firstPoint.x+" "+firstPoint.y;
            var previous = firstPoint;
    
            for(var i = 1; i < 12; i++) {
                var currentPoint = util.getPoint(this.get("centerPoint"), dataSet[i].value, i*2*Math.PI / 12, 200);
                var pathDiff = util.getRelativePoint(currentPoint, previous);
                pathString += " l "+pathDiff.x+" "+pathDiff.y;
                previous = currentPoint;
            }
    
            pathString += " Z";
              
            return pathString
        },
    })

    return emotionModel;
});