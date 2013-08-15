define([
    'util',
    'app',
    'underscore',
    'backbone',
    'raphael',
    'jquery',
    'plugins/typeahead.min'
    ], 
    function(util, app, _, Backbone, Raphael, $) {

        var compareView = Backbone.View.extend({

            template: 'compare-init',

            events: {
                'click #load-visualization': 'evaluateForm',
                'change #events': 'loadEventInfo'
            },

            evaluateForm: function() {
                this.networkLeft = $('#initialization-form #networkLeft').val();
                this.networkRight = $('#initialization-form #networkRight').val();
                this.keywordLeft = $('#initialization-form #keywordLeft').val();
                this.keywordRight = $('#initialization-form #keywordRight').val();
                var startDate = $('#initialization-form #start-date').val();
                var startTime = $('#initialization-form #start-time').val();
                var endDate = $('#initialization-form #end-date').val();
                var endTime = $('#initialization-form #end-time').val();
                this.eventInfo = $('#events option:selected').val();
                this.keywordTypeLeft = util.getKeywordType(this.keywordLeft);
                this.keywordTypeRight = util.getKeywordType(this.keywordRight);
                this.startDateTime = new Date(startDate + " "+startTime);
                this.endDateTime = new Date(endDate+" "+endTime);
                this.timeStep = util.getTimeStep(this.startDateTime, this.endDateTime);

                if('' === this.keywordLeft ||
                    '' === this.keywordRight ||
                    !util.isValidDate(this.startDateTime) ||
                    !util.isValidDate(this.endDateTime)) {
                    $('.alert-error').text('Please fill out all the fields correctly!')
                } else if(this.eventInfo === '') {
                    var url = "#compare/";
                    url += this.networkLeft.toLowerCase()+"/";
                    url += this.keywordTypeLeft+"/";
                    url += this.keywordLeft.slice(1)+"/";
                    url += this.networkRight.toLowerCase()+"/";
                    url += this.keywordTypeRight+"/";
                    url += this.keywordRight.slice(1)+"/";
                    url += this.timeStep+"/";
                    url += this.startDateTime.getTime()+"/";
                    url += this.endDateTime.getTime();

                    console.log(url);

                    app.router.navigate(url, true);     
                } else {
                    var url = "#compare/";
                    url += "event/";
                    url += this.eventInfo+"/";
                    url += this.networkLeft.toLowerCase()+"/";
                    url += this.keywordTypeLeft+"/";
                    url += this.keywordLeft.slice(1)+"/";
                    url += this.networkRight.toLowerCase()+"/";
                    url += this.keywordTypeRight+"/";
                    url += this.keywordRight.slice(1)+"/";
                    url += this.timeStep+"/";
                    url += this.startDateTime.getTime()+"/";
                    url += this.endDateTime.getTime();

                    console.log(url);

                    app.router.navigate(url, true);    
                }
            },

            loadEventInfo: function() {
                var eventInfo = $('#events option:selected').val();

                if(eventInfo === '') {
                    return;
                }

                $.get(app.server+'event/'+eventInfo, function(data) {
                    console.log(data);
                    var expr = /[\d]{4}-[\d]{2}-[\d]{2}/;
                    var startDate = expr.exec(data.startDate)[0];
                    var endDate = expr.exec(data.endDate)[0];
                    console.log(startDate)
                    var startTime = data.startTime;
                    var endTime = data.endTime;
                    var topics = data.topics;

                    $('#initialization-form #start-date').val(startDate);
                    $('#initialization-form #start-time').val(startTime);
                    $('#initialization-form #end-date').val(endDate);
                    $('#initialization-form #end-time').val(endTime);


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