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

        initialize: function(options) {
            // Load Settings, Event Search and Keyword search views into modals
            this.insertViews({
                '#search-event .modal-body': new searchEventView(),
                '#search-keyword .modal-body': new searchKeywordView(),
                '#settings-modal .modal-body': new settingsView({
                    model: new Backbone.Model(options)
                })
            });

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
        }
    });

    return navigationView;
});