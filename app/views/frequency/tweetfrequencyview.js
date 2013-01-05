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
          this.timeStep = this.model.get("timeStep");
          this.tweetCount = this.model.get("value");
          this.val = this.model.get("scaling");

          if(this.model.get('mode') == 'compare') {
            this.pixelLength = $(window).width() / 2;
          } else {
            this.pixelLength = $(window).width();
          }

          this.model.set("active", 0);

          this.startPoint = { "x": this.getPointFromTime(this.startDateTime, this.endDateTime, this.localStartDateTime), "y": 100 };
          this.endPoint = { "x": this.getPointFromTime(this.startDateTime, this.endDateTime, this.localEndDateTime), "y": 100 };

          this.drawTimeSlot(); 

          this.model.on("reset", self.changeToReset, self);
          this.model.on("activate", self.changeToActive, self);
          this.model.on("visited", self.changeToVisited, self);
        },

        /**
         * Draws the timeSlot element
         *
         */
        drawTimeSlot: function() {
          var self = this;
          var smallRadius = 0;
          var bigRadius = Constants.timeCircleWidth;
          var baseRadius = Constants.circleRadius;//Constants.timeCircleRadiusDifference;

          var leftBottomPoint = this.startPoint;
          var leftTopPoint = this.getLinearPoint(this.startPoint, this.val, 100);
          var rightBottomPoint = this.endPoint;
          var rightTopPoint = this.getLinearPoint(this.endPoint, this.val, 100);

          var path = new Array();
          path.push(["M", leftBottomPoint.x, leftBottomPoint.y]);
          path.push(["L", leftTopPoint.x, leftTopPoint.y]);
          path.push(["L", rightTopPoint.x, rightTopPoint.y]);
          path.push(["L", rightBottomPoint.x, rightBottomPoint.y]);
          path.push(["Z"]);

          var timeSlot = this.model.get("paper").path(path);

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
          parameters = {};
          parameters.localStartDateTime = this.model.get('localStartDateTime');
          parameters.localEndDateTime = this.model.get('localEndDateTime');
          parameters.left = this.getMiddlePoint() || 20;
          parameters.tweetCount = this.model.get('value');
          parameters.dominantEmotion = this.model.get('dominantEmotion') || 'love';
          
          app.trigger("preview:mouseover", parameters);
        },

        mouseout: function() {
          var dateTime = this.model.get("localStartDateTime");
          app.trigger("preview:mouseout", dateTime);
        },

        getMiddlePoint: function() {
          var middleDateTime = new Date(this.model.get('localStartDateTime').getTime() + this.timeStep * 1000 / 2);
          var point = this.getPointFromTime(this.model.get('startDateTime'), this.model.get('endDateTime'), middleDateTime);
          return point;
        },

        changeToVisited: function() {
          this.model.get("timeSlot").node.setAttribute("class", "visited");
        },

        changeToActive: function() {
          this.mouseover();

          this.model.get("timeSlot").node.setAttribute("class", "active");
        },

         changeToReset: function() {
          this.mouseout();

          this.model.get("timeSlot").node.setAttribute("class", "");
        },

        bindTimeSlotEvents: function() {
          var self = this;

          var timeSlotElement = self.model.get("timeSlot");

          timeSlotElement.click(function() {
            params = {};
            params.dateTime = self.model.get("localStartDateTime");
            params.cid = self.model.cid;

            app.trigger("jumpToTime", params);
          });
        },

      getPointFromTime: function(startDateTime, endDateTime, currentDateTime) {
        var timeSpan = (endDateTime.getTime() - startDateTime.getTime()) / 1000;
        var currentTimeSec = (currentDateTime.getTime() - startDateTime.getTime()) / 1000;
        
        return parseInt(currentTimeSec / timeSpan * this.pixelLength);
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
      

      getLinearPoint: function(refPoint, value, maxHeight) {
        var y = parseFloat(refPoint.y - maxHeight * value);
        var x = refPoint.x;

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

      clear: function() {
        this.model.destroy();
      },

      cleanup: function() {
        this.model.off(null, null, this);
      },

    });

    return tweetFrequencyView;
})