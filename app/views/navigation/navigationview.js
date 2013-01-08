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
    "plugins/bootstrap-modal"
], function(app, _, $, Backbone, Raphael, Constants, searchEventView, searchKeywordView, settingsView) {

    var navigationView = Backbone.View.extend({

        template: 'navbar',

        events: {
            'click #search-keyword-btn': 'triggerSearchKeywordModal',
            'click #search-event-btn': 'triggerSearchEventModal',
            'click #settings-btn': 'triggerSettingsModal'
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
            var urlSingle = '/search/'+this.model.get('network')+'/'+this.model.get('keywordType')+'/'+this.model.get('keyword').slice(1)+'/'+this.model.get('timeStep')+'/'+this.model.get('startDateTime').getTime()+'/'+this.model.get('endDateTime').getTime()+'/'+this.model.get('currentDateTime').getTime();
            var urlPattern = '/pattern/'+this.model.get('network')+'/'+this.model.get('keywordType')+'/'+this.model.get('keyword').slice(1)+'/'+this.model.get('timeStep')+'/'+this.model.get('startDateTime').getTime()+'/'+this.model.get('endDateTime').getTime()+'/'+this.model.get('currentDateTime').getTime();
            var urlCompare = '/compare/'+this.model.get('keywordType')+'/'+this.model.get('keyword').slice(1)+'/'+this.model.get('timeStep')+'/'+this.model.get('startDateTime').getTime()+'/'+this.model.get('endDateTime').getTime()+'/'+this.model.get('currentDateTime').getTime();
            var output = window.JST['app/templates/navbar.html'](this.model.toJSON());
            $( this.el ).html( output );
        }
    });

    return navigationView;
});