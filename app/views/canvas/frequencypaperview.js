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
				var network = options.network;

				if(app.frequencyPaper instanceof Array) {
					app.frequencyPaper[network] = Raphael(0, 0, "100%", 100);
				} else {
					app.frequencyPaper = new Array();
					app.frequencyPaper[network] = Raphael(0, 0, "100%", 100);
				}

				this.el = app.frequencyPaper[network].canvas;
				this.$el = $(this.el);
			},

		});

		return frequencyPaperView;
	}
)