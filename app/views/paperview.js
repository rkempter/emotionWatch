define(
	[
	'underscore',
	'backbone',
	'raphael',
	'jquery',
	'emotionwatch',
	'emotionwatchview',
	'constants'
	]
	, function(_, Backbone, Raphael, $, emotionWatch, emotionWatchView, Constants) {

		var PaperView = Backbone.View.extend({

			initialize: function() {
				var self = this;
				
				// @todo: Use a config file!!
				self.paper = Raphael(0, 0, Constants.paperWidth, Constants.paperHeight);
				self.el = self.paper.canvas;
				self.$el = $(self.el);

				console.log("Paper: "+self.paper);

				var view = new emotionWatchView(
							{ model: new emotionWatch({ 
								paper: self.paper, 
								  emotionCircleRadius: 300, 
								  positionX: 600, 
								  positionY: 400
								}) 
							});
			},
		});

		return PaperView;
	}
)