define([
	"underscore",
	"jquery", 
	"backbone", 
	"raphael"
], function(_, $, Backbone, Raphael) {

	var emotionWatchView = Backbone.View.extend({

		initialize: function(options) {

			this.emotionCircle = this.drawCircle(this.model.emotionCircleRadius);
			this.timeCircle = this.drawCircle(this.model.timeCircleRadius);
			this.emotionShape = this.drawEmotionShape();
			this.timeShape = this.drawTimeShape();

			this.model.on("click", this.render(), this);
		},

		events: {

		},

		drawCircle: function(radius, positionX, positionY) {
			var cirlce = this.paper.circle(positionX, positionY, radius);

			return circle;
		},

		drawEmotionShape: function() {
			var currentShapePath = this.model.getCurrentShapePath();
			var shape = this.paper.path(currentShapePath);

			return shape;
		},

		drawTimeShape: function() {
			var currentTimeLineAngle = this.model.getTimeLineAngle();
			var currentTimeLinePath = this.model.getTimeLinePath(currentTimeLineAngle);
			var timeLineShape = this.paper.path(currentTimeLinePath);

			return timeLineShape;
		},

		render: function() {
			var newPath = this.model.getCurrentEmotionShapePath();

			this.emotionShape.animate({
				path: newPath
			}, this.model.iterationLength);

			var newTimeShape = this.model.getCurrentTimeLinePath();
			this.timeCircle.animate({
				path: newTimeShape
			}, this.model.iterationLength);

			// Do the same for colors
		},

	});

});