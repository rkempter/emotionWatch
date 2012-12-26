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

          this.pixelLength = $(window).width();

          this.model.set("active", 0);

          this.startPoint = { "x": this.getPointFromTime(this.startDateTime, this.endDateTime, this.localStartDateTime), "y": 100 };
          this.endPoint = { "x": this.getPointFromTime(this.startDateTime, this.endDateTime, this.localEndDateTime), "y": 100 };

          this.drawElement(); 
          this.drawTimeSlot(); 

          this.model.on("reset", self.changeToReset, self);
          this.model.on("activate", self.changeToActive, self);
          this.model.on("visited", self.changeToVisited, self);

        },

        /**
         * Method draws the frequency part on the paper.
         *
         */
        drawElement: function() {
            var self = this;
            var smallRadius = 0;
            var bigRadius = Constants.frequencyRadius;

            var leftBottomPoint = this.startPoint;
            var leftTopPoint = this.getLinearPoint(this.startPoint, this.val, 100);
            var rightBottomPoint = this.endPoint;
            var rightTopPoint = this.getLinearPoint(this.endPoint, this.val, 100);

            var path = new Array();
            path.push(["M", leftBottomPoint.x, leftBottomPoint.y]);
            path.push(["L", leftTopPoint.x, leftBottomPoint.y]);
            path.push(["L", rightTopPoint.x, rightTopPoint.y]);
            path.push(["L", rightBottomPoint.x, rightBottomPoint.y]);
            path.push(["Z"]);

            var element = app.frequencyPaper.path(path);

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

          var timeSlot = app.frequencyPaper.path(path);

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
          // var dateTime = this.model.get("localStartDateTime");
          // app.trigger("preview:mouseover", dateTime);
          // this.render();
          // if(this.model.get("active") === 0) {

          //   this.model.get("element").attr({
          //     "fill": "#A65363",
          //   });
          //   this.model.get("timeSlot").attr({
          //     "stroke-width": 0,
          //     "fill": "#A63112",
          //   });
          // }
        },

        mouseout: function() {
          // var dateTime = this.model.get("localStartDateTime");

          // app.trigger("preview:mouseout", dateTime);
          // this.hide();
          // if(this.model.get("active") === 0) {
          //   this.model.get("element").attr({
          //     "fill": "#b1b1b1",
          //   });
          //   this.model.get("timeSlot").attr({
          //     "stroke-width": 0,
          //     "fill": "#AC7B74",
          //   });

            
          // }
        },

        changeToVisited: function() {
          console.log("Change to visited?");
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

         changeToReset: function() {
          this.model.set("active", 0);
          this.model.get("element").attr({
            "stroke-width": 1,
            "stroke": "#a0a0a0",
            "fill": "#b1b1b1"
          });
          this.model.get("timeSlot").attr({
            "stroke-width": 0,
            "fill": "#AC7B74",
          });
        },

        bindTimeSlotEvents: function() {
          var self = this;

          var timeSlotElement = self.model.get("timeSlot");

          // timeSlotElement.click(function() {
          //   app.trigger("jumpToTime", self.model.get("startDateTime"));
          // });
        },

        bindFrequencyEvents: function() {
          var self = this;

          var element = self.model.get("element");

          // element.click(function() {
          //   var options = { dateTime: self.model.get("startDateTime"), cid: self.model.cid }
          //   app.trigger("jumpToTime", options);
          // });
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

    });

    return tweetFrequencyView;
})