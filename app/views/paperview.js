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
				var mode = options.mode || 'regular';
				var network = options.network;
				var x = options.x || null;
				var y = options.y || null;

				if(null !== parent) {
					if(mode !== 'regular') {
						if (app.paper instanceof Array) {
							app.paper[network] = Raphael(0, 0, "100%", 600);
							app.paper[network].setViewBox(0, 0, 800, 800, true);
							this.el = app.paper[network].canvas;
							this.$el = $(this.el);
						} else {
							app.paper = new Array();
							app.paper[network] = Raphael(0, 0, "100%", 600);
							app.paper[network].setViewBox(0, 0, 800, 800, true);
							this.el = app.paper[network].canvas;
							this.$el = $(this.el);
						}
					} else {
						app.paper = Raphael($(parent), 0, "100%", 600);
						app.paper.setViewBox(0, 0, 800, 800, false);
						this.el = app.paper.canvas;
						this.$el = $(this.el);
					}
				} else if(null !== x && null !== y) {
					app.paper = Raphael(x, y, width, height);
					this.el = app.paper.canvas;
					this.$el = $(this.el);
				} else {
					app.paper = Raphael(0, 140, width, height);
					this.el = app.paper.canvas;
					this.$el = $(this.el);
				}
			},
		});

		return PaperView;
	}
)