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
      centerPoint: {"x": 400, "y": 400},
      currentDataSet: null,
      topic: "#gymnastics",
      windowSize: 10,
      threshhold: 5,
    },

    initialize: function(options) {
      this.getData();
      this.trigger("setdataset");
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
      console.log("Parsing");
      
      console.log(response[0]);
      this.get("queue").enqueue(response);

      this.setCurrentDataSet();
    },

    checkQueueLength: function() {
        if(!this.has("queue")) {
            var queue = new Queue();
            this.set("queue", queue);
        } else {
            var queue = this.get("queue");
        }
        if(queue.getLength() < this.get("treshhold")) {
            this.fetch();
        }
    },

    setCurrentDataSet: function() {
        if(this.get("queue") > 0) {
            this.set("currentDataSet", this.get("queue").dequeue());
        }

        this.checkQueueLength();
    },

    getTimeLineAngle: function() {
      var timeSpan = (this.get("endDate").getTime() - this.get("startDate").getTime()) / 1000;
      var currentTimeSec = (this.get("currentDate").getTime() - this.get("startDate").getTime()) / 1000;

      return (currentTimeSec / timeSpan * angle);
    },

    getAngleFromPoint: function(point) {
      var x = this.get("centerPoint").x;
      var y = this.get("centerPoint").y;
      
      var angle = Math.tan((point.y - y) / (point.x-x));
    },

    getTimeFromAngle: function(angle) {
      var timeSpan = (this.get("endDate").getTime() - this.get("startDate").getTime()) / 1000;
      var timeSec = parseInt(timeSpan / (2*Math.PI) * angle);

      return (new Date()).setTime(timeSec*1000);
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
        console.log(point);
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

    startWatch: function() {
        console.log("Start Watch");
        var self = this;
        this.interval = setInterval(function() {
            self.setCurrentDataSet();
            self.trigger("change");
        });
    },

    stopWatch: function() {
        console.log("Stop Watch");
        clearInterval(this.interval);
    },


  });

  return emotionWatch;
});