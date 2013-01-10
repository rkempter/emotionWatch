define([
    "app",
    "underscore",
    "jquery", 
    "backbone", 
    "raphael",
    'constants',
    "searcheventview",
    "searchkeywordview",
    "settingsview",
    "util",
    "plugins/bootstrap-modal"
], function(app, _, $, Backbone, Raphael, Constants, searchEventView, searchKeywordView, settingsView, util) {

    var navigationView = Backbone.View.extend({

        template: 'navbar',

        events: {
            'click #search-keyword-btn': 'triggerSearchKeywordModal',
            'click #search-event-btn': 'triggerSearchEventModal',
            'click #settings-btn': 'triggerSettingsModal',
        },

        initialize: function() {
            var self = this;
            // Load Settings, Event Search and Keyword search views into modals
            this.insertViews({
                '#search-event .modal-body': new searchEventView(),
                '#search-keyword .modal-body': new searchKeywordView(),
                '#settings-modal .modal-body': new settingsView({
                    model: new Backbone.Model(self.model.toJSON())
                })
            });
            console.log(this.model.get('keywordType'));

            if(this.model.get('keywordType') == 'event') {
                this.model.fetch({
                    data: $.param({
                        startDateTime: this.model.get('startDateTime'),
                        endDateTime: this.model.get('endDateTime'),
                        sport: this.model.get('keyword').slice(1)
                    })
                });
            }

            this.listenTo(app, 'close', this.close);
        },

        // Show event search modal window when triggered
        triggerSearchEventModal: function(e) {
            $('#search-event').modal('show');
        },

        // Show setting modal window when triggered
        triggerSettingsModal: function(e) {
            $('#settings-modal').modal('show');
        },

        // Show keyword search modal window when triggered
        triggerSearchKeywordModal: function(e) {
            $('#search-keyword').modal('show');
        },

        close: function() {
            this.remove();
            this.unbind();
        },

        // Render template with small submenu for the three views
        render: function() {
            var options = {};
            options.urlSingle = '/search/'+this.model.get('network')+'/'+this.model.get('keywordType')+'/'+this.model.get('keyword').slice(1)+'/'+this.model.get('timeStep')+'/'+this.model.get('startDateTime').getTime()+'/'+this.model.get('endDateTime').getTime()+'/'+this.model.get('currentDateTime').getTime();
            options.urlPattern = '/pattern/'+this.model.get('network')+'/'+this.model.get('keywordType')+'/'+this.model.get('keyword').slice(1)+'/'+this.model.get('timeStep')+'/'+this.model.get('startDateTime').getTime()+'/'+this.model.get('endDateTime').getTime()+'/'+this.model.get('currentDateTime').getTime();
            options.urlCompare = '/compare/'+this.model.get('keywordType')+'/'+this.model.get('keyword').slice(1)+'/'+this.model.get('timeStep')+'/'+this.model.get('startDateTime').getTime()+'/'+this.model.get('endDateTime').getTime()+'/'+this.model.get('currentDateTime').getTime();
            options.startDateTime = this.model.get('startDateTime');
            options.endDateTime = this.model.get('endDateTime');
            options.event = this.model.get('event');
            options.sport = this.model.get('sport');
            options.gender = this.model.get('gender');
            options.hashtag = this.model.get('keyword');
            options.timeStep = util.getTimeStepFormat(this.model.get('timeStep'));
            options.keywordType = this.model.get('keywordType');
            var output = window.JST['app/templates/navbar.html'](options);
            $( this.el ).html( output );
        }
    });

    return navigationView;
});