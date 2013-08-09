define([
	'app',
	'underscore',
	'backbone',
	'raphael',
	'jquery',
	'emotionwatch',
	'emotionwatchview',
	'constants'], function(app, _, Backbone, Raphael, $) {

		var frequencyPaperView = Backbone.View.extend({

			initialize: function(options) {
				options = options || {};
				var parent = options.parent || null;
				var network = options.network;
				var id = options.id || 'normal';

				// We have a paper array with the paper corresponding to twitter or weibo
				// visualization. This is due to the fact that we need different canvas for the
				// compare visualization.
				if(app.frequencyPaper instanceof Array) {
					app.frequencyPaper[id] = Raphael(0, 0, "100%", 100);
				} else {
					app.frequencyPaper = [];
					app.frequencyPaper[id] = Raphael(0, 0, "100%", 100);
				}

				// Assign the canvas DOM element to the view's element
				this.el = app.frequencyPaper[id].canvas;
				this.$el = $(this.el);

				// Bind the close event to the close function.
				this.listenTo(app,'close', this.close);
			},

			close: function() {
				this.remove();
				this.unbind();
			}

		});

		return frequencyPaperView;
	}
);