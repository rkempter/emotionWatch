define(
	[
	'order!underscore',
	'order!backbone',
	'order!raphael',
	'order!jquery',
	'emotionwatch',
	'emotionwatchview',
	]
	, function(_, Backbone, Raphael, $, emotionWatch, emotionWatchView) {

		var PaperView = Backbone.View.extend({

			initialize: function() {
				var self = this;

				// @todo: Use a config file!!
				self.paper = Raphael("paper", 1200, 800);
				self.el = self.paper.canvas;
				self.$el = $(self.el);

				self.emotionWatch = new emotionWatch({paper: self});
				self.emotionWatch.on('add', self.emotionWatchAdded, self);
			},

			emotionWatchAdded: function(node) {
				var view = new emotionWatchView({model: emotionWatch});
			}
		});

		return new PaperView();
	}
)