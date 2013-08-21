define([
    'util',
    'app',
    'lodash',
    'backbone',
    'raphael',
    'jquery'
    ], 
    function(util, app, _, Backbone, Raphael, $) {

        var compareView = Backbone.View.extend({

            template: 'compare-init',

            events: {
                'click #load-visualization': 'evaluateForm',
                'change #events': 'setEventInfoEvent'
            },

            initialize: function(options) {
                _.bindAll(this, 'render');

                var model = Backbone.Model.extend({
                    urlRoot: function() {
                        return app.server+"getEventList";
                    },
                    parse: function(data) {
                        this.set("events", data);
                        for(var id in data) {
                            if(parseInt(this.get("eventId")) === parseInt(id)) {
                                var keywords = data[id].twitter;
                                if(data[id].weibo !== null) {
                                    keywords += ",";
                                    keywords += data[id].weibo;
                                }

                                this.set("keywords", keywords.split(","));
                                this.set("startDateTime", data[id].startDateTime);
                                this.set("endDateTime", data[id].endDateTime);
                            }
                        }
                    }
                });

                this.model = new model();
                this.model.set('eventId', 513);
                this.model.on('change', this.render, this);

                if(options.eventId !== undefined) {
                    this.model.set('eventId', options.eventId);
                }

                this.model.fetch();
                this.listenTo(app, 'close', this.close);
            },

            evaluateForm: function() {
                var startDateTime = new Date(this.model.get("startDateTime"));
                var endDateTime = new Date(this.model.get("endDateTime"));
                this.networkLeft = $('#initialization-form #networkLeft').val();
                this.networkRight = $('#initialization-form #networkRight').val();
                this.keywordLeft = this.extractKeywords($('#initialization-form #keywordLeft input:checked'));
                this.keywordRight = this.extractKeywords($('#initialization-form #keywordRight input:checked'));
                this.eventInfo = this.model.get("eventId");
                this.keywordTypeLeft = 'keyword';
                this.keywordTypeRight = 'keyword';
                this.timeStep = 5;

                if('' === this.keywordLeft ||
                    '' === this.keywordRight) {
                    $('.alert-error').text('Please select at least one keyword on each side!');
                } else if(this.eventInfo === '') {
                    var url = "#compare/";
                    url += this.networkLeft.toLowerCase()+"/";
                    url += this.keywordTypeLeft+"/";
                    url += this.keywordLeft+"/";
                    url += this.networkRight.toLowerCase()+"/";
                    url += this.keywordTypeRight+"/";
                    url += this.keywordRight+"/";
                    url += this.timeStep+"/";
                    url += startDateTime.getTime()+"/";
                    url += endDateTime.getTime();

                    app.router.navigate(url, true);     
                } else {
                    var url = "#compare/";
                    url += "event/";
                    url += this.eventInfo+"/";
                    url += this.networkLeft.toLowerCase()+"/";
                    url += this.keywordTypeLeft+"/";
                    url += this.keywordLeft+"/";
                    url += this.networkRight.toLowerCase()+"/";
                    url += this.keywordTypeRight+"/";
                    url += this.keywordRight+"/";
                    url += this.timeStep+"/";
                    url += startDateTime.getTime()+"/";
                    url += endDateTime.getTime();

                    app.router.navigate(url, true);    
                }
            },

            setEventInfoEvent: function(e) {
                var eventInfo = $('#events option:selected').val();
                
                this.setEventInfo(eventInfo);
            },

            setEventInfo: function(eventId) {
                var events = this.model.get("events");
                var event = events[eventId];

                this.model.set('startDateTime', event.startDateTime);
                this.model.set('endDateTime', event.endDateTime);
                this.model.set('eventId', eventId);

                var keywords = event.twitter;

                if(event.weibo !== null) {
                    keywords += ",";
                    keywords += event.weibo;
                }

                this.model.set("keywords", keywords.split(","));

                this.render();
            },

            extractKeywords: function($element) {
                var keywords = [];
                $element.each(function(i) {
                    keywords.push($(this).val());
                });

                return keywords.join(",");
            },

            render: function(template) {
                if(this.model.get('keywords') !== undefined) {
                    var output = template(this.model.toJSON());
                    this.$el.html( output );
                }
            },

            afterRender: function() {
                $('.toggle').click(function(e) {
                    $el = $(this);

                    var elements = $el.is('#toggle-left') ? '#keywordLeft input' : '#keywordRight input';

                    if($el.prop('checked')) {
                        $(elements).prop('checked', true);
                    } else {
                        $(elements).prop('checked', false);
                    }
                });
            },

            close: function() {
                this.remove();
                this.unbind();
            }

        });

        return compareView;
    }
);