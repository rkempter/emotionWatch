define([
    "app",
    "backbone",
    "lodash",
    "util",
    "constants"

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

          // Get the width size of the window
          if(this.model.get('mode') == 'compare') {
            // If we have two visualizations at the same time, we use half of the
            // window as a base for the computations
            this.pixelLength = $(window).width() / 2;
          } else {
            this.pixelLength = $(window).width();
          }

          // The pair of points our slot is positioned
          this.startPoint = { "x": util.getPointFromTime(this.startDateTime, this.endDateTime, this.localStartDateTime, this.pixelLength), "y": 100 };
          this.endPoint = { "x": util.getPointFromTime(this.startDateTime, this.endDateTime, this.localEndDateTime, this.pixelLength), "y": 100 };

          // Draw the time slot on the canvas
          this.drawTimeSlot(); 

          // Bind the events to the view
          this.model.on("reset", self.changeToReset, self);
          this.model.on("activate", self.changeToActive, self);
          this.model.on("visited", self.changeToVisited, self);

          this.listenTo(app, 'close', this.close);
        },

        /**
         * Draws the timeSlot element
         *
         */
        drawTimeSlot: function() {
          var self = this;

          // Compute the four points necessary for the path
          var leftBottomPoint = this.startPoint;
          var leftTopPoint = util.getLinearPoint(this.startPoint, this.val, 100);
          var rightBottomPoint = this.endPoint;
          var rightTopPoint = util.getLinearPoint(this.endPoint, this.val, 100);

          // Create an SVG path for the timeslot
          var path = [];
          path.push(["M", leftBottomPoint.x, leftBottomPoint.y]);
          path.push(["L", leftTopPoint.x, leftTopPoint.y]);
          path.push(["L", rightTopPoint.x, rightTopPoint.y]);
          path.push(["L", rightBottomPoint.x, rightBottomPoint.y]);
          path.push(["Z"]);

          // Draw the path on the canvas
          var timeSlot = this.model.get("paper").path(path);

          // Bind the mouseover event to a method;
          timeSlot.mouseover(function() {
            self.mouseover();
          });

          // Bind the mouseout event to the mouseout method
          timeSlot.mouseout(function() {
            self.mouseout();
          });

          // Save the timeslot element in the model
          this.model.set("timeSlot", timeSlot);

          // Bind the rest of timeslot events
          self.bindTimeSlotEvents();
        },

        mouseover: function() {
          // Build a object with all necessary parameters needed in the detail view
          parameters = {};
          parameters.localStartDateTime = this.model.get('localStartDateTime');
          parameters.localEndDateTime = this.model.get('localEndDateTime');
          parameters.left = this.getMiddlePoint() || 20;
          parameters.tweetCount = this.model.get('value');
          
          // Trigger a 'global' event with the parameters object
          app.trigger("preview:mouseover", parameters);
        },

        mouseout: function() {
          // Tell to appropriate parts of the application that
          // the mouse is not on the timeslot anymore
          var dateTime = this.model.get("localStartDateTime");
          app.trigger("preview:mouseout", dateTime);
        },

        getMiddlePoint: function() {
          // Get the middle point of a timeslot
          // This is used to place the detailview template at the right place
          var middleDateTime = new Date(this.model.get('localStartDateTime').getTime() + this.timeStep * 1000 / 2);
          var point = util.getPointFromTime(this.model.get('startDateTime'), this.model.get('endDateTime'), middleDateTime, this.pixelLength);
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

          // Clicking on a timeslots changes the global time and jumps to
          // the time of the timeslot!
          timeSlotElement.click(function() {
            params = {};
            params.dateTime = self.model.get("localStartDateTime");
            params.cid = self.model.cid;
            // Trigger a global time change
            app.trigger("jumpToTime", params);
          });
        },
      
        render: function(template) {
            var output = template( { startDateTime: this.model.get("localStartDateTime"), endDateTime: this.model.get("localEndDateTime"), frequency: this.model.get("value") } );
            $(".date-time-freq").html( output );
            $(".date-time-freq").show();
        },

        hide: function() {
          $(".date-time-freq").hide();
        },

        close: function() {
          this.remove();
          this.unbind();
        }

    });

    return tweetFrequencyView;
});