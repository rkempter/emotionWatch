define([
	'underscore',
	'backbone'
], function(_, Backbone) {

	var emotionWatch = Backbone.Model.extend({
		defaults: {
			startDate: new Date("March 10, 1998 22:48:00"),
			endDate: new Date("March 11, 1998 22:48:00"),
			timeStep: 60,
			dataQueue: null,
			centerPoint: null,
			angle: 2*Math.PI,
			currentDataSet: null
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
		}

		getCurrentShapePath: function() {

			return pathString
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

		}

		duplicateWatch: function() {
			var newWatch = new emotionWatch({
				currentDataSet: this.get("currentDataSet"),
			});

			return newWatch;
		},



	});

	return {}
});