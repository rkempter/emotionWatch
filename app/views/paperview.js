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

			initialize: function() {
				var self = this;
				
				self.el = app.paper.canvas;
				self.$el = $(self.el);

				console.log("Paper: "+app.paper);

				
			},
		});

		return PaperView;
	}
)