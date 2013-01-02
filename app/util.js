define(['backbone', 'constants'], function(Backbone, Constants) {

    var util = function() {

      return{
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
            var x = centerPoint.x + radius * value * Math.cos(angle);
            var y = centerPoint.y + radius * value * Math.sin(angle);
            var point = { "x": x, "y": y };

            return point;
        },

        /**
         * Computes an appropiate time Step for the animation
         *
         */
        getTimeStep: function(startDateTime, endDateTime) {
          // Timespan in sec
          var timeSpan = (endDateTime.getTime() - startDateTime.getTime()) / 1000;

          // 1, 2, 5, 15, 30, 60, 120, 12*60, 24*60 min

          var timeSpanMinutes = timeSpan / 60;
          var naturalSlotSize = timeSpanMinutes / Constants.slots;

          switch(true) {
            case (naturalSlotSize < 1):
              return 1*60;
            case (naturalSlotSize < 2):
              return 2*60;
            case (naturalSlotSize < 5):
              return 5*60;
            case (naturalSlotSize < 15):
              return 15*60;
            case (naturalSlotSize < 30):
              return 30*60;
            case (naturalSlotSize < 60):
              return 60*60;
            case (naturalSlotSize < 120):
              return 2*60*60;
            case (naturalSlotSize < 720):
              return 12*60*60;
            case (naturalSlotSize < 1440):
              return 24*60*60;
          }

        },

        getKeywordType: function(keyword) {
          if(keyword.indexOf('#') !== -1) {
            return 'keyword';
          } else {
            return 'user';
          }
        },

        combineKeyword: function(keyword, keywordType) {
          switch(keywordType) {
            case 'user':
              return '@'+keyword;
            case 'keyword':
              return '#'+keyword;
          }
        },
      }
    }();

  return util;
});