define([
    "app",
    "backbone",
    "lodash",
    "util",
    "constants",

], function(app, Backbone, _, util, Constants) {
    
    var tweetFrequencyView = Backbone.View.extend({

        template: "datetimefreq",

        initialize: function() {
          this.radius = Constants.circleRadius + Constants.timeCircleWidth;
          this.frequencyRadius = Constants.frequencyRadius;
          this.startDateTime = this.model.get("startDateTime");
          this.endDateTime = this.model.get("endDateTime");
          this.localStartDateTime = this.model.get("localStartDateTime");
          this.localEndDateTime = this.model.get("localEndDateTime");
          this.val = this.model.get("scaling");
          this.centerPoint = this.model.get("centerPoint");

          // console.log(this.model.toJSON());

          this.drawElement();  
        },

        drawElement: function() {
            var self = this;
            var smallRadius = 0;
            var bigRadius = Constants.frequencyRadius;

            var leftAngle = this.getAngleFromTime(this.startDateTime, this.endDateTime, this.localStartDateTime);
            var rightAngle = this.getAngleFromTime(this.startDateTime, this.endDateTime, this.localEndDateTime);

            var rightBottomPoint = this.getPoint(this.centerPoint, this.val, leftAngle, smallRadius);
            var rightTopPoint = this.getPoint(this.centerPoint, this.val, leftAngle, bigRadius);
            var leftBottomPoint = this.getPoint(this.centerPoint, this.val, rightAngle, smallRadius);
            var leftTopPoint = this.getPoint(this.centerPoint, this.val, rightAngle, bigRadius);

            var path = new Array();
            path.push(["M", rightTopPoint.x, rightTopPoint.y]);
            path.push(["A", bigRadius, bigRadius, 0, 0, 1, leftTopPoint.x, leftTopPoint.y]);
            path.push(["L", leftBottomPoint.x, leftBottomPoint.y]);
            path.push(["A", smallRadius, smallRadius, 0, 0, 1, rightBottomPoint.x, rightBottomPoint.y]);
            path.push(["Z"]);

            var element = app.paper.path(path);

            element.attr({
              "stroke-width": 1,
              "stroke": "#a0a0a0",
              "fill": "#b1b1b1"
            });

            element.mouseover(function() {
              self.render();
              this.attr({
                "fill": "#A65363",
                
              });
            });

            element.mouseout(function() {
              self.hide();
              this.attr({
                "fill": "#b1b1b1",
              });
            });

            this.model.set("element", element);

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

      render: function(template) {
          var output = template( { startDateTime: this.model.get("startDateTime"), endDateTime: this.model.get("endDateTime"), frequency: this.model.get("value") } );
          $(".date-time-freq").html( output );
          $(".date-time-freq").show();
      },

      hide: function() {
        $(".date-time-freq").hide();
      },

    });

    return tweetFrequencyView;
})