define([
    "app",
    "backbone",
    "jquery",
    "lodash",
    "util",
    "constants"

], function(app, Backbone, $, _, util, Constants) {
    
    var compareTitleView = Backbone.View.extend({

        template: 'compare-title-template',

        events: {
            'click #start-stop-control-btn': 'triggerStartStop'
        },

        initialize: function() {
            _.bindAll(this, "render");
            var self = this;

            this.listenTo(app, 'close', this.close);
            this.listenTo(app, 'loaded', self.showStart);
            this.model.on('change', this.render, this);

            this.model.set("firstDateTime", moment(this.model.get("currentDateTime")).format("Do MMM YYYY HH:mm:ss"));
            this.model.set("secondDateTime", moment(new Date(this.model.get("currentDateTime").getTime() + this.model.get('timeStep')*1000)).format("Do MMM YYYY HH:mm:ss"));

            this.generateLinks();
            this.loadEventData();

            this.listenTo(app, 'change:globalTime', function(dateTime) {
                self.changeCurrentDateTime(dateTime);
            });
        },

        loadEventData: function() {
            var self = this;
            if(this.model.get('keywordTypeLeft') === 'event') {
                $.get(app.server+"getEventInfo", {
                    id: this.model.get('keywordLeft')
                }, function(data) {
                    console.log(data);
                    if(data.length === 1) {
                        self.model.set('sportLeft', data[0].sport);
                        self.model.set('eventLeft', data[0].event);
                        self.model.set('genderLeft', data[0].gender);
                    }
                });
            }

            if(this.model.get('keywordTypeRight') === 'event') {
                $.get(app.server+"getEventInfo", {
                    id: this.model.get('keywordRight')
                }, function(data) {
                    console.log(data);
                    if(data.length === 1) {
                        self.model.set('sportRight', data[0].sport);
                        self.model.set('eventRight', data[0].event);
                        self.model.set('genderRight', data[0].gender);
                    }
                });
            }
        },

        changeCurrentDateTime: function(dateTime) {
            this.model.set("currentDateTime", dateTime);
            this.model.set("firstDateTime", moment(dateTime).format("Do MMM YYYY HH:mm:ss"));
            this.model.set("secondDateTime", moment(new Date(dateTime.getTime() + this.model.get('timeStep')*1000)).format("Do MMM YYYY HH:mm:ss"));
            $('#middle-info .dateTime').text(this.model.get('firstDateTime')+" - "+this.model.get('secondDateTime'));
        },

        showStart: function() {
            this.start = true;
            $('#loading .loading-text h2').hide();
            $('#loading #start-all').show(); 
        },

        startAll: function() {
            $loading = $('#loading');
            $loading.hide();

            app.trigger('start:all');
        },

        triggerStartStop: function() {
            $btn = $('#start-stop-control-btn'); 
            if($btn.text() === 'Resume') {
                app.trigger('resume:watch');
                $btn.text('Pause');
            } else {
                app.trigger('pause:watch');
                $btn.text('Resume');
            }
        },

        close: function() {
            this.remove();
            this.unbind();
        },

        generateLinks: function() {

            var urlLeft = '#search/';
            if(this.model.get('keywordTypeLeft') !== 'event') {
                urlLeft += 'event/';
                urlLeft += this.model.get('eventId')+'/';
            }
            urlLeft += this.model.get('networkLeft')+'/';
            urlLeft += this.model.get('keywordTypeLeft') + '/';
            urlLeft += this.model.get('keywordLeft')+'/';
            urlLeft += this.model.get('timeStep')+'/';
            urlLeft += this.model.get('startDateTime').getTime()+'/';
            urlLeft += this.model.get('endDateTime').getTime();
            this.model.set('leftLink', urlLeft);

            var urlRight = '#search/';
            if(this.model.get('keywordTypeRight') !== 'event') {
                urlRight += 'event/';
                urlRight += this.model.get('eventId')+'/';
            }
            urlRight += this.model.get('networkRight')+'/';
            urlRight += this.model.get('keywordTypeRight') + '/';
            urlRight += this.model.get('keywordRight')+'/';
            urlRight += this.model.get('timeStep')+'/';
            urlRight += this.model.get('startDateTime').getTime()+'/';
            urlRight += this.model.get('endDateTime').getTime();
            this.model.set('rightLink', urlRight);
        },

        render: function(template) {
            console.log(this.model.toJSON());
             if(this.model.get('leftLink') === undefined || this.model.get('rightLink') === undefined || (this.model.get('keywordTypeLeft') === 'event' && this.model.get('genderLeft') === undefined)
                || (this.model.get('keywordTypeRight') === 'event' && this.model.get('genderRight') === undefined )) {
                return;
            } else {
                var output = template(this.model.toJSON());
                this.$el.html(output);
            }
        },

        afterRender: function() {
            $('#start-all').click(this.startAll);
            if(this.start === true) {
                $('#loading .loading-text h2').hide();
                $('#loading #start-all').show(); 
            }
        }

        
    });

    return compareTitleView;
});