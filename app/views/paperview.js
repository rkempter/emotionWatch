define([
	'app',
	'underscore',
	'backbone',
	'raphael',
	'jquery',
	'emotionwatch',
	'emotionwatchview',
	'constants'
	]
	, function(app, _, Backbone, Raphael, $, emotionWatch, emotionWatchView, Constants) {

		var PaperView = Backbone.View.extend({

			initialize: function(options) {
				var options = options || {};
				var parent = options.parent || null;
				var width = options.width || Constants.paperWidth;
				var height = options.height || Constants.paperHeight;
				var x = options.x || null;
				var y = options.y || null;

				if(null !== parent) {
					app.paper = Raphael($(parent), 0, "100%", 600);
					app.paper.setViewBox(0, 0, 800, 800, false);
				} else if(null !== x && null !== y) {
					app.paper = Raphael(x, y, width, height);
				} else {
					app.paper = Raphael(0, 140, width, height);
				}

				var self = this;
				
				self.el = app.paper.canvas;
				self.$el = $(self.el);
			},
		});

		return PaperView;
	}
)