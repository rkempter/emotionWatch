define([
    "app",
    "backbone",
    "jquery",
    "lodash",
    "util",
    "constants"
], function(app, Backbone, $, _, util, Constants) {
    
    var filterKeywordView = Backbone.View.extend({

        template: 'filterkeywordtemplate',

        events: {
            'click .keyword-filter': 'evaluateForm'
        },

        initialize: function(options) {
            var self = this;
            options = options || {};
            this.id = options.id || 0;

            var model = Backbone.Model.extend({
                urlRoot: function() {
                    return app.server+"event/";
                },
                parse: function(data) {
                    this.set(data);
                    var topics = data.topics.split(",");
                    this.set('topics', topics);
                }
            });

            this.model = new model(options);
            this.model.fetch();

            this.model.on('change', this.render, this);
            this.listenTo(app, 'close', this.close);
        },

        extractKeywords: function($element) {
            var keywords = [];
            $element.each(function(i) {
                keywords.push($(this).val());
            });

            return keywords.join(",");
        },

        evaluateForm: function() {
            var keywords = this.extractKeywords($('#keywords input:checked'));

            if(keywords !== '') {
                var url = '#search/event/';
                url += this.id + "/";
                url += this.model.get('network') + "/";
                url += "keyword/";
                url += keywords + "/";
                url += this.model.get('timeStep') + "/";
                url += new Date(this.model.get('startDateTime')).getTime() + "/";
                url += new Date(this.model.get('endDateTime')).getTime();

                app.router.navigate(url, true);
            } else {
                $('.error').text('You need to select at least one keyword!');
            }
        },

        render: function(template) {
            if(this.model.get('topics') !== undefined) {
                var output = template(this.model.toJSON());
                this.$el.html(output);
            }
        },

        close: function() {
            this.remove();
            this.unbind();
        }
        
    });

    return filterKeywordView;
});