define([
  'underscore',
  'backbone',
  'constants'
], function(_, Backbone, Constants) {

  var emotionWatch = Backbone.Model.extend({
    defaults: {
      startDate: new Date("March 10, 1998 22:48:00"),
      endDate: new Date("March 11, 1998 22:48:00"),
      timeStep: 60,
      dataQueue: null,
      centerPoint: {"x": 400, "y": 400},
      currentDataSet: null,
      topic: "#gymnastics",
    },

    initialize: function(options) {
      this.fetch();
    },

    urlRoot: function() {
      // Should we send the id as well?
      console.log("fetch");
      return "http://localhost:8080/emotionTweets";
    },

    getData: function() {
      this.fetch({
        id: this.get("cid"),
        topic: this.get("topic"),
        currentTime: this.get("currentTime"),
        timeStep: this.get("timeStep"),
      });
    },

    parse: function(response) {
      console.log("Parsing");
      if(!this.has("queue")) {
        var queue = new Queue();
        this.set("queue", queue);
      }
      console.log(response[0]);
      this.get("queue").enqueue(response);

      this.setCurrentDataSet();
    },

    setCurrentDataSet: function() {
      this.set("currentDataSet", this.get("queue").dequeue());
      console.log("Dataset set.");
      console.log("Dataset is the following: "+this.get("currentDataSet"));
      this.trigger("setdataset");
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


  });

  return emotionWatch;
});