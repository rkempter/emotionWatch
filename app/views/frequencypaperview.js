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
				var mode = options.mode || 'regular';
				var network = options.network;
				if(mode == 'regular') {
					app.frequencyPaper = Raphael($(parent), 0, "100%", 100);
					this.el = app.frequencyPaper.canvas;
					this.$el = $(this.el);
				} else {
					if (app.frequencyPaper instanceof Array) {
						app.frequencyPaper[network] = Raphael(0, 0, "100%", 100);
						console.log(app.frequencyPaper[network]);
					} else {
						app.frequencyPaper = new Array();
						app.frequencyPaper[network] = Raphael(0, 0, "100%", 100);
					}
					this.el = app.frequencyPaper[network].canvas;
					this.$el = $(this.el);
				}
			},
		});

		return frequencyPaperView;
	}
)