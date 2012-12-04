define([
    "app",
    "backbone",
    "lodash",
    "util",
    "constants"

], function(app, Backbone, _, util, Constants) {
    var tweetFrequencyView = Backbone.View.extend({

        initialize: function(options) {

            options = options || {};

            this.centerPoint = options.centerPoint || { x: 0; y: 0};
            this.startDateTime = options.startDateTime || undefined;
            this.endDateTime = options.endDateTime || undefined;
            this.interval = options.interval || undefined;
            this.paper = app.paper;
            this.radius = Constants.circleRadius;
            this.frequencyRadius = Constants.frequencyRadius;


            this.model = new Backbone.Model({
                frequencies: options.frequencies,
                frequncyMax: _.max(options.frequencies),
            })
        },

        drawElements: function() {
            var self = this;
            var frequencyElementSet = this.paper.set();

            var frequencies = this.model.get('frequencies');
            var max = this.model.get('frequencyMax');
            var i = 0;
            for(var frequency in frequencies) {
                var scaling = parseFloat(frequencies / max);
                
                var localStartDateTime = new Date(this.startDateTime.getTime() + i * this.interval * 1000);
                var localEndDateTime = new Date(this.startDateTime.getTime() + (i+1) * this.interval * 1000);

                var radius = self.model.get('radius') * scaling;

                var element = self.drawElement(radius, scaling localStartDateTime, localEndDateTime);
                frequencyElementSet.push(element);
                i++;
            }
        },

        drawElement: function(radius, value, localStartDateTime, localEndDateTime) {
            var smallRadius = this.radius;
            var bigRadius = this.radius + this.frequencyRadius;
            var leftAngle = util.getAngleFromTime(this.startDateTime, this.endDateTime, localStartDateTime);
            var rightAngle = util.getAngleFromTime(this.startDateTime, this.endDateTime, localEndDateTime);
            
            var rightBottomPoint = util.getPoint(this.centerPoint, value, leftAngle, smallRadius);
            var rightTopPoint = util.getPoint(this.centerPoint, value, leftAngle, bigRadius);
            var leftBottomPoint = util.getPoint(this.centerPoint, value, rightAngle, smallRadius);
            var leftTopPoint = util.getPoint(this.centerPoint, value, rightAngle, bigRadius);
            
            var path = new Array();
            path.push(["M", rightTopPoint.x, rightTopPoint.y]);
            path.push(["A", bigRadius, bigRadius, 0, 0, 1, leftTopPoint.x, leftTopPoint.y]);
            path.push(["L", leftBottomPoint.x, leftBottomPoint.y]);
            path.push(["A", smallRadius, smallRadius, 0, 0, 1, rightBottomPoint.x, rightBottomPoint.y]);
            path.push(["Z"]);

            return path;

        },

    });

    return tweetFrequencyView;
})