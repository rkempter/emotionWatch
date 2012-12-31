define([
  'app',
  'lodash',
  'backbone',
  'constants',
], function(app, _, Backbone, Constants) {

  var emotionWatch = Backbone.Model.extend({
    
    defaults: {
      startDate: new Date("July 27, 2012 16:00:00"),
      endDate: new Date("August 31, 2012 20:00:00"),
      currentDateTime: new Date("July 27, 2012 16:21:00"),
      network: "twitter",
      timeStep: 120,
      dataQueue: null,
      currentDataSet: null,
      topic: "#gymnastics",
      windowSize: 9,
      threshhold: 5,
      initialized: false,
      iterationLength: 4500,
      animationType: "ease-out",
      queue: {},
      freqQueue: {},
    },


    /**
     * Initializes the watch and fetches data
     * from the server
     *
     */
    initialize: function(options) {
      var self = this;
      var mode = options.mode || 'regular';

      if(mode == 'regular') {
        this.fetch({ 
            data: $.param({
              topic: this.get("topic"),
              startDateTime: this.get("startDate"),
              endDateTime: this.get("endDate"),
              timeStep: this.get("timeStep"),
              network: this.get("network"),
            })
        });

        app.on("set:globalTime", function(dateTime) {
          console.log("Global Time arrived: "+dateTime);
          self.setCurrentTime(dateTime);
          self.setCurrentFrequencyRatio(dateTime);
          self.setCurrentDataSet();
          self.trigger("changevalues");
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

      this.startWatch();
    },

    /**
     * URL of the server
     */

    urlRoot: function() {
      return "http://localhost:8080/emotionTweets";
    },

    /**
     * Parses the received data into the queue
     */
    parse: function(response) {
      this.set("maxFrequency", 0);
      for(var i = 0; i < response.length; i++) {
        var emotions = response[i].emotions;
        var freq = response[i].frequency;
        if(freq > this.get("maxFrequency")) {
          this.set("maxFrequency", freq);
        }
        var dateTime = new Date(response[i].dateTime);
        this.get("queue")[dateTime.toMysqlFormat()] = emotions;
        this.get("freqQueue")[dateTime.toMysqlFormat()] = freq;
        if(false == this.get("initialized")) {
            this.trigger("setdataset");
        }
      }
      this.setCurrentTime(this.get("startDate"));
      this.setCurrentDataSet();

      this.trigger("parsed");
    },

    /**
     * setCurrentTime: Adds the timeStep to the previous time to advance in time.
     * Sets the new time to the variable currentDateTime.
     */
    setCurrentTime: function(dateTime) {
        this.set("currentDateTime", new Date(dateTime.toMysqlFormat()));
        this.trigger('change:currentDateTime', this.get('currentDateTime'));
    },

    
    setCurrentFrequencyRatio: function(dateTime) {
      var dateTime = this.get("currentDateTime");
      if(undefined == this.get("freqQueue")[dateTime.toMysqlFormat()]) {
        this.set("currentFrequencyRatio", 0)
      } else {
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
        var dataset = this.get("queue")[dateTime.toMysqlFormat()]
        if(undefined == dataset) {
          this.set("currentDataSet", Constants.nullEmotion)
        } else {
          this.set("currentDataSet", dataset);
        }

        this.getDominantEmotion();
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
      
      return angle = Math.atan(diffY / diffX)+addAngle;
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

    getDominantEmotion: function() {
      var dataset = this.get("currentDataSet");

      var emotion = null;
      var max = 0;
      for(var i = 0; i < dataset.length; i++) {
        var emotionset = dataset[i];
        if(max < dataset[i].value) {
          max = dataset[i].value;
          emotion = dataset[i].emotion;
        }
      }

      $('body').attr('class', emotion);
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
        var x = this.get("centerPoint").x + (Constants.centerZeroCircleRadius + (this.get("emotionCircleRadius")-Constants.centerZeroCircleRadius) * value) * Math.cos(Constants.angle / 12 *iteration);
        var y = this.get("centerPoint").y + (Constants.centerZeroCircleRadius + (this.get("emotionCircleRadius")-Constants.centerZeroCircleRadius) * value) * Math.sin(Constants.angle / 12 *iteration);
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
      if(null == dateTime) {
        dataSet = this.get("currentDataSet");
      } else {
        var dateTime = options.dateTime || null;
        if(null !== dateTime) {
          dataSet = this.get("queue")[dateTime.toMysqlFormat()];
        }
      }

      if(null !== dataSet) {
        var firstPoint = this.getPoint(dataSet[0].value, 0);
        var pathString = "M "+firstPoint.x+" "+firstPoint.y;
        var previous = firstPoint;

        for(var i = 1; i < 12; i++) {
          var currentPoint = this.getPoint(dataSet[i].value, i);
          var pathDiff = this.getRelativePoint(currentPoint, previous);
          pathString += " l "+pathDiff.x+" "+pathDiff.y;
          previous = currentPoint;
        }

        pathString += " Z";
          
        return pathString
      }
    },

    /**
     * Starts the emotion watch
     *
     */
     
    startWatch: function() {
        var self = this;
        self.trigger("changevalues");
        this.interval = setInterval(function() {
          app.trigger("change:globalTime");
        }, this.get("iterationLength"));
    },

    /**
     * Stops the emotion watch
     *
     */
     
    stopWatch: function() {
        console.log("Stop Watch");
        clearInterval(this.interval);
    },

    /**
     * Bigger data window
     */

    fastForward: function() {
        this.stopWatch();
        var currentTimeStep = this.get("timeStep");
        this.set("timeStep", currentTimeStep * 2);

        this.set("queue", new Queue());
        this.getData();
    },

    /**
     * Smaller data window
     */

    slowForward: function() {
        this.stopWatch();
        var currentTimeStep = this.get("timeStep");
        this.set("timeStep", currentTimeStep / 2);

        this.set("queue", new Queue());
        this.getData();
    },

    /**
     * Create a new emotion watch
     *
     * @return emotionWatch
     */
     
    duplicateWatch: function() {
      var newWatch = new emotionWatch({
        currentDataSet: this.get("currentDataSet"),
      });

      return newWatch;
    },


  });

  return emotionWatch;
});