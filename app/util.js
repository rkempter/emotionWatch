(function() {
    
    var util = {

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

    };

    return util;
});