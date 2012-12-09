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
          var self = this;
          this.radius = Constants.circleRadius + Constants.timeCircleWidth;
          this.frequencyRadius = Constants.frequencyRadius;
          this.startDateTime = this.model.get("startDateTime");
          this.endDateTime = this.model.get("endDateTime");
          this.localStartDateTime = this.model.get("localStartDateTime");
          this.localEndDateTime = this.model.get("localEndDateTime");
          this.val = this.model.get("scaling");
          this.centerPoint = this.model.get("centerPoint");

          this.model.set("active", 0);

          // this.model.on("change:active", )

          this.leftAngle = this.getAngleFromTime(this.startDateTime, this.endDateTime, this.localStartDateTime);
          this.rightAngle = this.getAngleFromTime(this.startDateTime, this.endDateTime, this.localEndDateTime);

          // console.log(this.model.toJSON());

          this.drawElement(); 
          this.drawTimeSlot(); 

          this.model.on("activate", self.changeToActive, self);
          app.on("visited", self.changeToVisited, self);

        },

        drawElement: function() {
            var self = this;
            var smallRadius = 0;
            var bigRadius = Constants.frequencyRadius;

            var rightBottomPoint = this.getPoint(this.centerPoint, this.val, this.leftAngle, this.radius, smallRadius);
            var rightTopPoint = this.getPoint(this.centerPoint, this.val, this.leftAngle, this.radius, bigRadius);
            var leftBottomPoint = this.getPoint(this.centerPoint, this.val, this.rightAngle, this.radius, smallRadius);
            var leftTopPoint = this.getPoint(this.centerPoint, this.val, this.rightAngle, this.radius, bigRadius);

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
              self.mouseover();
            });

            element.mouseout(function() {
              self.mouseout();
            });

            this.model.set("element", element);

            self.bindFrequencyEvents();

            return element;

        },

        drawTimeSlot: function() {
          var self = this;
          var smallRadius = 0;
          var bigRadius = Constants.timeCircleWidth;
          var baseRadius = Constants.circleRadius;//Constants.timeCircleRadiusDifference;

          var rightBottomPoint = this.getPoint(this.centerPoint, 1, this.leftAngle, baseRadius, smallRadius);
          var rightTopPoint = this.getPoint(this.centerPoint, 1, this.leftAngle, baseRadius, bigRadius);
          var leftBottomPoint = this.getPoint(this.centerPoint, 1, this.rightAngle, baseRadius, smallRadius);
          var leftTopPoint = this.getPoint(this.centerPoint, 1, this.rightAngle, baseRadius, bigRadius);
        
          var path = new Array();
          path.push(["M", rightTopPoint.x, rightTopPoint.y]);
          path.push(["A", Constants.circleRadius+Constants.timeCircleWidth, Constants.circleRadius+Constants.timeCircleWidth, 0, 0, 1, leftTopPoint.x, leftTopPoint.y]);
          path.push(["L", leftBottomPoint.x, leftBottomPoint.y]);
          path.push(["A", Constants.circleRadius, Constants.circleRadius, 0, 0, 1, rightBottomPoint.x, rightBottomPoint.y]);
          path.push(["Z"]);

          var timeSlot = app.paper.path(path);

          timeSlot.attr({
            "stroke-width": 0,
            "fill": "#AC7B74",
          });

          timeSlot.mouseover(function() {
            self.mouseover();
          });

          timeSlot.mouseout(function() {
            self.mouseout();
          });

          this.model.set("timeSlot", timeSlot);

          self.bindTimeSlotEvents();
        },

        mouseover: function() {
          if(this.model.get("active") !== 1) {
            this.render();
            this.model.get("element").attr({
              "fill": "#A65363",
            });
            this.model.get("timeSlot").attr({
              "stroke-width": 0,
              "fill": "#A63112",
            });
          }
        },

        mouseout: function() {
          if(this.model.get("active") !== 1) {
            this.model.get("element").attr({
              "fill": "#b1b1b1",
            });
            this.model.get("timeSlot").attr({
              "stroke-width": 0,
              "fill": "#AC7B74",
            });

            this.hide();
          }
        },

        changeToVisited: function() {
          if(this.model.get("active") === 1) {
            this.model.set("active", 2);
            this.model.get("element").attr({
              "fill": "#cccccc",
            });
            this.model.get("timeSlot").attr({
              "fill": "#cccccc",
            });
          }
        },

        changeToActive: function() {
          this.model.set("active", 1);
          this.model.get("element").attr({
            "fill": "#000",
          });
          this.model.get("timeSlot").attr({
            "fill": "#000",
          });
        },

        bindTimeSlotEvents: function() {
          var self = this;

          var timeSlotElement = self.model.get("timeSlot");

          timeSlotElement.click(function() {
            app.trigger("jumpToTime", self.model.get("startDateTime"));
          });
        },

        bindFrequencyEvents: function() {
          var self = this;

          var element = self.model.get("element");

          element.click(function() {
            var options = { dateTime: self.model.get("startDateTime"), cid: self.model.cid }
            app.trigger("jumpToTime", options);
          });
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
       
      getPoint: function(centerPoint, value, angle, baseRadius, radius) {
          var x = centerPoint.x + (baseRadius + radius * value) * Math.cos(angle);
          var y = centerPoint.y + (baseRadius + radius * value) * Math.sin(angle);
          var point = { "x": x, "y": y };

          return point;
      },

      render: function(template) {
          var output = template( { startDateTime: this.model.get("localStartDateTime"), endDateTime: this.model.get("localEndDateTime"), frequency: this.model.get("value") } );
          $(".date-time-freq").html( output );
          $(".date-time-freq").show();
      },

      hide: function() {
        $(".date-time-freq").hide();
      },

    });

    return tweetFrequencyView;
})