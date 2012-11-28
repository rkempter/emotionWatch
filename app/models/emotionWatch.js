define([
  'lodash',
  'backbone',
  'constants',
], function(_, Backbone, Constants) {

  var emotionWatch = Backbone.Model.extend({
    
    defaults: {
      startDate: new Date("July 29, 2012 16:00:00"),
      endDate: new Date("July 29, 2012 20:00:00"),
      currentDateTime: new Date("July 29, 2012 16:21:00"),
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
      queue: new Queue(),
    },

    /**
     * Initialization: Fetch first data from the server
     */

    initialize: function(options) {
      console.log('initialization');
      //this.getData();
    },

    /**
     * URL of the server
     */

    urlRoot: function() {
      // Should we send the id as well?
      return "http://localhost:8080/emotionTweets";
    },

    /**
     * Requests new data from the server
     */
    getData: function() {
        console.log("Fetch data");
        this.fetch({ 
            data: $.param({
              id: this.get("cid"),
              topic: this.get("topic"),
              currentDateTime: this.get("currentDateTime"),
              timeStep: this.get("timeStep"),
              network: this.get("network"),
              windowSize: this.get("windowSize"),
            })
        });
    },

    /**
     * Parses the received data into the queue
     */
    parse: function(response) {
        console.log("response length "+response.length);
        for(var i = 0; i < response.length; i++) {
          var data = response[i].data;
          console.log(data);
            this.get("queue").enqueue(data);
            if(false == this.get("initialized")) {
                this.trigger("setdataset");
            }
        }
    },

    /**
     * CheckQueueLength: Checks if the length of the data queue is longer than
     * a predefined threshold. If not, model fetches more data.
     */
    checkQueueLength: function() {
        if(this.get("queue").getLength() < this.get("threshhold")) {
            this.getData();
        }
    },

     /**
     * setCurrentTime: Adds the timeStep to the previous time to advance in time.
     * Sets the new time to the variable currentDateTime.
     */
    setCurrentTime: function() {
        var sec = this.get("currentDateTime").getTime() + this.get("timeStep") * 1000;
        this.set("currentDateTime", new Date(sec));
    },

    /**
     *
     * Sets the next dataset in the queue as currentDataSet. If model hasn't been initialized yet,
     * we trigger the event "setdataset" to create the Raphael elements.
     *
     */
    setCurrentDataSet: function() {
        console.log("Dataset set");
        console.log("Queue length is "+this.get("queue").getLength());
        if(this.get("queue").getLength() > 0) {
            console.log("set queue");
            this.set("currentDataSet", this.get("queue").dequeue());
            if(false == this.get("initialized")) {
              this.set("initialized", true);
              this.trigger("currentDataSetDone");
            }
        }

        this.checkQueueLength();
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
     * Computes the time from a given angle.
     *
     * @param angle
     * @return date
     */
     
    getTimeFromAngle: function(angle) {
      var timeSpan = (this.get("endDate").getTime() - this.get("startDate").getTime()) / 1000;
      console.log("TImespan: "+timeSpan);
      var timeSec = this.get("startDate").getTime() / 1000 + parseInt(timeSpan / Constants.angle) * angle;

      return (new Date(timeSec*1000));
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
        var x = this.get("centerPoint").x + this.get("emotionCircleRadius") * value * Math.cos(Constants.angle / 12 *iteration);
        var y = this.get("centerPoint").y + this.get("emotionCircleRadius") * value * Math.sin(Constants.angle / 12 *iteration);
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
     
    getCurrentEmotionShapePath: function() {
        var dataSet = this.get("currentDataSet");
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
    },

    /**
     * Returns the path of the timeline
     *
     * @return pathString
     */
     
    getCurrentTimeLinePath: function() {
        var newAngle = this.getTimeLineAngle();
        var radius = this.get("emotionCircleRadius")+Constants.timeCircleRadiusDifference;
        console.log("CurrentTimeLinePath Radius "+radius);
        
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
          that.seconds = 0;
        }

        return [["M", sx, sy], ["A", radius, radius, 0, halfTimeFlag, 1, endPointX, endPointY]];
    },

    /**
     *
     */
     
    jumpToTime: function(dateTime) {
        this.stopWatch;
        this.set("currentDateTime", dateTime);
        this.set("queue", new Queue());
        this.getData();
        // StartWatch
    },

    /**
     * Starts the emotion watch
     *
     */
     
    startWatch: function() {
        console.log("Start Watch");
        var self = this;
        self.trigger("changevalues");
        this.interval = setInterval(function() {
            self.setCurrentTime();
            self.setCurrentDataSet();
            self.trigger("changevalues");
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