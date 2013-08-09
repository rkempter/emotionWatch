define([
	'app',
	'underscore',
	'backbone',
	'raphael',
	'jquery',
	'emotionwatch',
	'emotionwatchview',
	'constants'], function(app, _, Backbone, Raphael, $, emotionWatch, emotionWatchView, Constants) {

		var PaperView = Backbone.View.extend({

			initialize: function(options) {
				options = options || {};
				var parent = options.parent || null;
				var width = options.width || Constants.paperWidth;
				var height = options.height || Constants.paperHeight;
				var mode = options.mode || 'regular';
				var id = options.id || 'normal';
				var x = options.x || null;
				var y = options.y || null;

				console.log('id:'+id);

				if(mode !== 'regular') {
					if (app.paper instanceof Array) {
						app.paper[id] = Raphael(0, 0, "100%", 600);
						app.paper[id].setViewBox(0, 0, 800, 800, true);
						this.el = app.paper[id].canvas;
						this.$el = $(this.el);
					} else {
						app.paper = [];
						app.paper[id] = Raphael(0, 0, "100%", 600);
						app.paper[id].setViewBox(0, 0, 800, 800, true);
						this.el = app.paper[id].canvas;
						this.$el = $(this.el);
					}
				} else {
					app.paper = Raphael($(parent), 0, "100%", 540);
					app.paper.setViewBox(0, 0, 900, 900, false);
					this.el = app.paper.canvas;
					this.$el = $(this.el);
				}

				this.listenTo(app,'close', this.close);
			},

			close: function() {
				this.remove();
				this.unbind();
			}
		});

		return PaperView;
	}
);