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
      centerPoint: null,
      currentDataSet: null,
      topic: "#gymnastics",
    },

    urlRoot: function() {
      // Should we send the id as well?
      return "http://localhost:8080/emotionWatch/";
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
      console.log(response);
      if(!this.has("queue")) {
        var queue = new Queue();
        this.set("queue", queue);
      }

      for(var row in response.data) {
        this.get("queue").enqueue(row);
      }
    },

    setCurrentDataSet: function() {
      this.set("currentDataSet", this.get("queue").dequeue());
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
        var x = this.centerPoint.x + this.radius * value * Math.cos(Constants.angle / 12 *iteration);
        var y = this.centerPoint.y + this.radius * value * Math.sin(Constants.angle / 12 *iteration);
        var point = { "x": x, "y": y };

        return point;
    },

    getRelativePoint: function(pointNew, pointPrev) {
        var diffX = Number((pointNew[0] - pointPrev[0]).toFixed(0));
        var diffY = Number((pointNew[1] - pointPrev[1]).toFixed(0));
        var difference = { "x": diffX, "y": diffY };

        return difference;
    },

    getCurrentEmotionShapePath: function() {
        var firstPoint = getPoint(this.currentDataSet[0], 0);
        var pathString = "M "+firstPoint.x+" "+firstPoint.y;
        var previous = firstPoint;

        for(var i = 1; i < 12; i++) {
          var currentPoint = getPoint(this.currentDataSet[i], i);
          var pathDiff = getPointDifference(currentPoint, previous);
          pathString += " l "+pathDiff.x+" "+pathDiff.y;
          previous = currentPoint;
        }

        pathString += " Z";
        
        return pathString
    },


  });

  return emotionWatch;
});