define([
    'app',
    'underscore',
    'backbone',
    'raphael',
    'jquery',
    'emotionwatch',
    'emotionwatchview',
    'constants'], 
    function(app, _, Backbone, Raphael, $) {

        var compareView = Backbone.View.extend({

            template: 'compare-layout',

            events: {
                'click #load-visualization': 'evaluateForm'
            },

            evaluateForm: function() {
                this.networkLeft = $('#initialization-form #networkLeft').val();
                this.networkRight = $('#initialization-form #networkRight').val();
                this.keywordLeft = $('#initialization-form #keywordLeft').val();
                this.keywordRight = $('#initialization-form #networkRight').val();
                var startDate = $('#initialization-form #start-date').val();
                var startTime = $('#initialization-form #start-time').val();
                var endDate = $('#initialization-form #end-date').val();
                var endTime = $('#initialization-form #end-time').val();
                this.startDateTime = new Date(startDate + " "+startTime);
                this.endDateTime = new Date(endDate+" "+endTime);

                if('' === this.keywordLeft ||
                    '' === this.keywordRight ||
                    !util.isValidDate(this.startDateTime) ||
                    !util.isValidDate(this.endDateTime)) {
                    console.log('error');
                    $('.alert-error').text('Please fill out all the fields correctly!')
                } else {
                    var url = "#compare/";
                    url += networkLeft+"/";
                    url += keywordTypeLeft+"/";
                    url += keywordLeft.slice(1)+"/";
                    url += networkRight+"/";
                    url += keywordTypeRight+"/";
                    url += keywordRight+"/";
                    url += timeStep+"/";
                    url += startDateTime.getTime()+"/";
                    url += endDateTime.getTime();

                    app.router.navigate(url, true);     
                }
            },

            close: function() {
                this.remove();
                this.unbind();
            }

        });

        return compareView;
    }
);