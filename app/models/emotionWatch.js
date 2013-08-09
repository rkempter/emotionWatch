define([
  'app',
  'lodash',
  'backbone',
  'constants',
  'util'
], function(app, _, Backbone, Constants, util) {

  var emotionWatch = Backbone.Model.extend({
    
    defaults: {
      windowSize: 9,
      initialized: false
    },

    /**
     * Initializes the watch and fetches data
     * from the server
     *
     */
    initialize: function(options) {
      var self = this;

      // If the watch is in the regular or compare mode, we need to fetch
      // all the data
      if(this.get('mode') == 'regular' || this.get('mode') == 'compare') {
        this.fetch({ 
            data: $.param({
              topic: this.get("topic"),
              startDateTime: this.get("startDate"),
              endDateTime: this.get("endDate"),
              timeStep: this.get("timeStep"),
              network: this.get("network"),
              keywordType: this.get("keywordType")
            })
        });

        // At the same time, we have to listen to a change of time,
        // triggered by the clock
        this.listenTo(app, 'change:globalTime', function(dateTime) {
          // Set the currentTime to the new datetime
          self.setCurrentTime(dateTime);
          // Get the new frequency from the queue
          self.setCurrentFrequencyRatio(dateTime);
          // Get the new dataset from the queue
          self.setCurrentDataSet();
        });
      }

      /**
       * You first need to create a formatting function to pad numbers to two digits…
       **/
      function twoDigits(d) {
          if(0 <= d && d < 10) return "0" + d.toString();
          if(-10 < d && d < 0) return "-0" + (-1*d).toString();
          return d.toString();
      }

      /**
       * …and then create the method to output the date string as desired.
       * Some people hate using prototypes this way, but if you are going
       * to apply this to more than one Date object, having it as a prototype
       * makes sense.
       **/
      Date.prototype.toMysqlFormat = function() {
          return this.getFullYear() + "-" + twoDigits(1 + this.getMonth()) + "-" + twoDigits(this.getDate()) + " " + twoDigits(this.getHours()) + ":" + twoDigits(this.getMinutes()) + ":" + twoDigits(this.getSeconds());
      };
    },

    /**
     * URL of the server
     */

    urlRoot: function() {
      // In the compare node, we load the data from another url
      if(this.get('mode') == 'compare') {
        return app.server+"emotionPatternTweets";
      } else {
        return app.server+"emotionTweets";
      }
    },

    /**
     * Parses the received data into the queue
     */
    parse: function(response) {
      // Reset the queue for data and frequency
      this.set("queue", {} );
      this.set("freqQueue", {} );
      // Set the maximal frequency to zero
      this.set("maxFrequency", 0);

      for(var dateTime in response) {
        // Get frequency and emotion
        var freq = parseInt(response[dateTime].frequency);
        var emotions = response[dateTime].emotions;

        // Extract maximum
        if(this.get("maxFrequency") < freq) {
            this.set("maxFrequency", freq);
        }
        // Put emotion and frequency into the queue, accessible by
        // a datetime hash
        dateTime = new Date(dateTime);
        this.get("queue")[dateTime.toMysqlFormat()] = emotions;

        this.get("freqQueue")[dateTime.toMysqlFormat()] = freq;
        
        // If has never been initialized, trigger that the data has been set
        if(false === this.get("initialized")) {
            this.trigger("setdataset");
        }
      }
      
      // Set the current date and time and the first dataset
      this.setCurrentTime(this.get("startDate"));
      this.setCurrentDataSet();
      // Let the view know, that the response has been parsed
      this.trigger("parsed");
    },

    /**
     * setCurrentTime: Adds the timeStep to the previous time to advance in time.
     * Sets the new time to the variable currentDateTime.
     */
    setCurrentTime: function(dateTime) {
        this.set("currentDateTime", new Date(dateTime.toMysqlFormat()));
        // Let internally know, that the view has been changed
        this.trigger('change:currentDateTime', this.get('currentDateTime'));
    },

    
    setCurrentFrequencyRatio: function(dateTime) {
      // If there is no data at this moment or no tweets, the frequency is equal to zero
      if(undefined === this.get("freqQueue")[dateTime.toMysqlFormat()] || this.get('maxFrequency') === 0) {
        this.set("currentFrequencyRatio", 0);
      } else {
        // We normalize the frequency
        this.set("currentFrequencyRatio", this.get("freqQueue")[dateTime.toMysqlFormat()] / this.get("maxFrequency") );
      }
    },

    /**
     *
     * Sets the next dataset in the queue as currentDataSet. If model hasn't been initialized yet,
     * we trigger the event "setdataset" to create the Raphael elements.
     *
     */
    setCurrentDataSet: function() {
        var dateTime = this.get("currentDateTime");
        var dataset = this.get("queue")[dateTime.toMysqlFormat()];
        if(undefined === dataset) {
          // If no dataset for this moment, show the nullEmotion set
          this.set("currentDataSet", Constants.nullEmotion);
        } else {
          this.set("currentDataSet", dataset);
        }
        // Get the dominant Emotion out from the data
        this.dominantEmotion = this.getDominantEmotion();
    },

    /**
     * Returns the angle between starttime and currenttime.
     *
     * @return angle
     */

    getTimeLineAngle: function() {
      var timeSpan = (this.get("endDate").getTime() - this.get("startDate").getTime()) / 1000;
      var currentTimeSec = (this.get("currentDateTime").getTime() - this.get("startDate").getTime()) / 1000;
      

      return parseFloat(currentTimeSec / timeSpan * Constants.angle);
    },

    /**
     * Computes the angle of a point on the timeLine. Angle starts on the top of the circle.
     *
     * @param point
     * @return angle
     */
     
    getAngleFromPoint: function(point) {
      var x = this.get("centerPoint").x;
      var y = this.get("centerPoint").y;

      var diffX = point.x - x;
      var diffY = point.y - y;
      var addAngle = 0;

      if(diffX > 0 && diffY < 0) {
        addAngle = Constants.angle/4;
      } else if(diffX > 0 && diffY > 0) {
        addAngle = Constants.angle/4;
      } else {
        addAngle = Constants.angle/4 * 3;
      }
      
      return Math.atan(diffY / diffX)+addAngle;
    },

    /**
     * Returns the path of the timeline
     *
     * @return pathString
     */
     
    getCurrentTimeLinePath: function() {
        var newAngle = this.getTimeLineAngle();
        var radius = this.get("emotionCircleRadius")+Constants.timeCircleRadiusDifference;
        
        var sx = this.get("centerPoint").x;
        var sy = this.get("centerPoint").y - radius; // Y is 0 at the top of the canvas
    
        var endPointX = this.get("centerPoint").x + radius * Math.sin(newAngle);
        var endPointY = this.get("centerPoint").y - radius * Math.cos(newAngle);
    
        var halfTimeFlag = 0;
    
        if (newAngle > Constants.angle / 2) {
          halfTimeFlag = +1;
        }
        if (newAngle >= Constants.angle) {
          newAngle = Constants.angle - 0.1;
          this.seconds = 0;
        }

        return [["M", sx, sy], ["A", radius, radius, 0, halfTimeFlag, 1, endPointX, endPointY]];
    },

    /**
     * Computes the time from a given angle.
     *
     * @param angle
     * @return date
     */
     
    getTimeFromAngle: function(angle) {
      var timeSpan = (this.get("endDate").getTime() - this.get("startDate").getTime()) / 1000;
      var timeSec = this.get("startDate").getTime() / 1000 + parseInt(timeSpan / Constants.angle) * angle;

      return (new Date(timeSec*1000));
    },

    // Returns the dominant emotion from a dataset
    getDominantEmotion: function() {
      var dataset = this.get("currentDataSet");

      var emotion = 'empty';
      var max = 0;
      for(var i = 0; i < dataset.length; i++) {
        var emotionset = dataset[i];
        if(max < dataset[i].value) {
          max = dataset[i].value;
          emotion = dataset[i].emotion;
        }
      }
      // If we are in regular mode, change the background color accordingly
      // to the current dominant emotion
      if(this.get('mode') == 'regular') {
        $('body').attr('class', emotion.toLowerCase());
      }

      return emotion;
    },

    /**
     * Computes a point of the emotion Shape
     *
     * @param value
     * @param iteration
     *
     * @return point
     */
     
    getPoint: function(value, iteration) {
        var x = this.get("centerPoint").x + (Constants.centerZeroCircleRadius + (this.get("emotionCircleRadius")-Constants.centerZeroCircleRadius) * value) * Math.cos(Constants.angle / Constants.labels.length *iteration);
        var y = this.get("centerPoint").y + (Constants.centerZeroCircleRadius + (this.get("emotionCircleRadius")-Constants.centerZeroCircleRadius) * value) * Math.sin(Constants.angle / Constants.labels.length *iteration);
        var point = { "x": x, "y": y };

        return point;
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
     * Returns the path of the emotion shape
     *
     * @return pathString
     */
     
    getCurrentEmotionShapePath: function(options) {
      var dateTime = options.dateTime || null;
      var dataSet = null;
      if(null === dateTime) {
        dataSet = this.get("currentDataSet");
      } else {
        if(null !== dateTime) {
          dataSet = this.get("queue")[dateTime.toMysqlFormat()] || Constants.nullEmotion;
        }
      }

      if(null !== dataSet) {
        var firstPoint = this.getPoint(dataSet[0].value, 0);
        var pathString = "M "+firstPoint.x+" "+firstPoint.y;
        var previous = firstPoint;
        var totalNbr = Constants.labels.length;
        for(var i = 1; i < totalNbr; i++) {
          var currentPoint = this.getPoint(dataSet[i].value, i);
          var pathDiff = this.getRelativePoint(currentPoint, previous);
          pathString += " l "+pathDiff.x+" "+pathDiff.y;
          previous = currentPoint;
        }

        pathString += " Z";
          
        return pathString;
      }
    }
    
  });

  return emotionWatch;
});