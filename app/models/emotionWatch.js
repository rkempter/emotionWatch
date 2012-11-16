define([
  'underscore',
  'backbone',
  'constants'
], function(_, Backbone, Constants) {

  var emotionWatch = Backbone.Model.extend({
    defaults: {
      startDate: new Date("July 29, 2012 16:00:00"),
      endDate: new Date("July 29, 2012 20:00:00"),
      currentDateTime: new Date("July 29, 2012 16:21:00"),
      timeStep: 60,
      dataQueue: null,
      centerPoint: {"x": 600, "y": 400},
      currentDataSet: null,
      topic: "#gymnastics",
      windowSize: 9,
      threshhold: 5,
      initialized: false,
      iterationLength: 4500,
      queue: new Queue(),
    },

    initialize: function(options) {
      this.getData();
    },

    urlRoot: function() {
      // Should we send the id as well?
      return "http://localhost:8080/emotionTweets";
    },

    getData: function() {
        console.log("Fetch data");
        this.fetch({ 
            data: $.param({
              id: this.get("cid"),
              topic: this.get("topic"),
              currentDateTime: this.get("currentDateTime"),
              timeStep: this.get("timeStep"),
              windowSize: this.get("windowSize"),
            })
        });
    },

    parse: function(response) {
        console.log("response length "+response.length);
        for(var i = 0; i < response.length; i++) {
            this.get("queue").enqueue(response[i]);
        }
    },

    checkQueueLength: function() {
        console.log("Length: "+this.get("queue").getLength());
        console.log("Threshold: "+this.get("threshhold"));
        if(parseInt(this.get("queue").getLength()) < parseInt(this.get("threshhold"))) {
            this.getData();
        }
    },

    setCurrentTime: function() {
        var sec = this.get("currentDateTime").getTime() + this.get("timeStep") * 1000;
        this.set("currentDateTime", new Date(sec));
    },

    setCurrentDataSet: function() {
        console.log("Queue length is "+this.get("queue").getLength());
        if(this.get("queue").getLength() > 0) {
            console.log("set queue");
            this.set("currentDataSet", this.get("queue").dequeue());
        }

        if(false == this.get("initialized")) {
            this.trigger("setdataset");
            this.set("initialized", true);
        }

        this.checkQueueLength();
        return;
    },

    getTimeLineAngle: function() {
      var timeSpan = (this.get("endDate").getTime() - this.get("startDate").getTime()) / 1000;
      var currentTimeSec = (this.get("currentDateTime").getTime() - this.get("startDate").getTime()) / 1000;
      

      return parseFloat(currentTimeSec / timeSpan * Constants.angle);
    },

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

    getTimeFromAngle: function(angle) {
      var timeSpan = (this.get("endDate").getTime() - this.get("startDate").getTime()) / 1000;
      var timeSec = parseInt(timeSpan / (2*Math.PI) * angle);

      return (new Date(timeSec*1000));
    },

    duplicateWatch: function() {
      var newWatch = new emotionWatch({
        currentDataSet: this.get("currentDataSet"),
      });

      return newWatch;
    },

    getPoint: function(value, iteration) {
        var x = this.get("centerPoint").x + this.get("emotionCircleRadius") * value * Math.cos(Constants.angle / 12 *iteration);
        var y = this.get("centerPoint").y + this.get("emotionCircleRadius") * value * Math.sin(Constants.angle / 12 *iteration);
        var point = { "x": x, "y": y };

        return point;
    },

    getRelativePoint: function(pointNew, pointPrev) {
        var diffX = Number((pointNew.x - pointPrev.x).toFixed(0));
        var diffY = Number((pointNew.y - pointPrev.y).toFixed(0));
        var difference = { "x": diffX, "y": diffY };

        return difference;
    },

    getCurrentEmotionShapePath: function() {
        var dataSet = this.get("currentDataSet");
        console.log("CurrentDataSet: "+dataSet);
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

    startWatch: function() {
        console.log("Start Watch");
        var self = this;
        this.interval = setInterval(function() {
            console.log("----- New Timestep -----");
            self.setCurrentTime();
            self.setCurrentDataSet();
            self.trigger("changevalues");
        }, this.get("iterationLength"));
    },

    stopWatch: function() {
        console.log("Stop Watch");
        clearInterval(this.interval);
    },


  });

  return emotionWatch;
});