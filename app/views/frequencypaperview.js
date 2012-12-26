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
	, function(app, _, Backbone, Raphael, $) {

		var frequencyPaperView = Backbone.View.extend({

			initialize: function(options) {
				var options = options || {};
				var parent = options.parent || null;

				app.frequencyPaper = Raphael($(parent), 0, "100%", 100);

				this.el = app.frequencyPaper.canvas;
				this.$el = $(this.el);
			},
		});

		return frequencyPaperView;
	}
)