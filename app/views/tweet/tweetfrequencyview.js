define([
    "app",
    "backbone",
    "lodash",
    "util",
    "constants",

], function(app, Backbone, _, util, Constants) {
    
    var tweetFrequencyView = Backbone.View.extend({

        initialize: function(options) {
            console.log("Creation of frequency");

            options = options || {};
            var self = this;

            this.centerPoint = options.centerPoint || undefined;
            this.startDateTime = options.startDateTime || undefined;
            this.endDateTime = options.endDateTime || undefined;
            this.interval = options.interval || undefined;
            this.network = options.network || 'twitter';
            this.paper = app.paper;
            this.radius = Constants.circleRadius;
            this.frequencyRadius = Constants.frequencyRadius;


            var frequencyModel = Backbone.Model.extend({
                urlRoot: function() {
                    return 'http://localhost:8080/frequency';
                },

                parse: function(response) {
                    var max = _.max(response, function(element) { return element.frequency; });
                    this.set("frequencies", response);
                    this.set("frequencyMax", max['frequency']);
                    this.trigger("add");
                }
            });

            this.model = new frequencyModel();

            this.model.fetch({
                data: $.param({
                    network: self.network,
                    windowsize: self.interval,
                    startDateTime: self.startDateTime,
                    endDateTime: self.endDateTime,
                })
            });

            this.model.on('add', self.drawElements, self);
        },

        drawElements: function() {
            console.log("Start drawing elements");
            var self = this;
            var frequencyElementSet = app.paper.set();

            var frequencies = this.model.get('frequencies');
            var max = this.model.get('frequencyMax');
            var i = 0;

            for(var i = 0; i < frequencies.length; i++) {
                var value = frequencies[i].frequency;
                console.log("Frequency: "+value);
                console.log("Value: "+parseFloat(value / max));
                var scaling = parseFloat(value / max);
                
                var localStartDateTime = new Date(this.startDateTime.getTime() + i * this.interval * 1000);
                var localEndDateTime = new Date(this.startDateTime.getTime() + (i+1) * this.interval * 1000);

                var element = self.drawElement(scaling, localStartDateTime, localEndDateTime);
                frequencyElementSet.push(element);
            }
        },

        drawElement: function(value, localStartDateTime, localEndDateTime) {
            var smallRadius = 0;
            var bigRadius = this.frequencyRadius;

            console.log("Value: "+value);

            var leftAngle = this.getAngleFromTime(this.startDateTime, this.endDateTime, localStartDateTime);
            var rightAngle = this.getAngleFromTime(this.startDateTime, this.endDateTime, localEndDateTime);

            var rightBottomPoint = this.getPoint(this.centerPoint, value, leftAngle, smallRadius);
            var rightTopPoint = this.getPoint(this.centerPoint, value, leftAngle, bigRadius);
            var leftBottomPoint = this.getPoint(this.centerPoint, value, rightAngle, smallRadius);
            var leftTopPoint = this.getPoint(this.centerPoint, value, rightAngle, bigRadius);
            
            console.log(rightBottomPoint);

            var path = new Array();
            path.push(["M", rightTopPoint.x, rightTopPoint.y]);
            path.push(["A", bigRadius, bigRadius, 0, 0, 1, leftTopPoint.x, leftTopPoint.y]);
            path.push(["L", leftBottomPoint.x, leftBottomPoint.y]);
            path.push(["A", smallRadius, smallRadius, 0, 0, 1, rightBottomPoint.x, rightBottomPoint.y]);
            path.push(["Z"]);

            var element = this.paper.path(path);

            return element;

        },

        /**
       * Computes the time from a given angle.
       *
       * @param angle
       * @param startDateTime of circle
       * @param endDateTime of circle
       * @return date
       */
      getTimeFromAngle: function(angle, startDateTime, endDateTime) {
        var timeSpan = (endDateTime.getTime() - startDateTime.getTime()) / 1000;
        var timeSec = startDateTime.getTime() / 1000 + parseInt(timeSpan / Constants.angle) * angle;

        return (new Date(timeSec*1000));
      },

      /**
       * Computes coordinates of a point relative to another point
       *
       * @param pointNew
       * @param pointPrev
       * @return difference
       */
      getRelativePoint: function(pointNew, pointPrev) {
        var diffX = Number((pointNew.x - pointPrev.x).toFixed(0));
        var diffY = Number((pointNew.y - pointPrev.y).toFixed(0));
        var difference = { "x": diffX, "y": diffY };

        return difference;
      },


      /**
       * Returns the angle between starttime and currenttime.
       *
       * @return angle
       */
      getAngleFromTime: function(startDateTime, endDateTime, currentDateTime) {
        var timeSpan = (endDateTime.getTime() - startDateTime.getTime()) / 1000;
        var currentTimeSec = (currentDateTime.getTime() - startDateTime.getTime()) / 1000;
        

        return parseFloat(currentTimeSec / timeSpan * Constants.angle);
      },

      /**
       * Computes a point of the emotion Shape
       *
       * @param centerPoint
       * @param value
       * @param angle
       * @param radius
       *
       * @return point
       */
       
      getPoint: function(centerPoint, value, angle, radius) {
          var x = centerPoint.x + (this.radius + radius * value) * Math.cos(angle);
          var y = centerPoint.y + (this.radius + radius * value) * Math.sin(angle);
          var point = { "x": x, "y": y };

          return point;
      },

    });

    return tweetFrequencyView;
})