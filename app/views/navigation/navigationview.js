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
    "plugins/bootstrap-modal",
], function(app, _, $, Backbone, Raphael, Constants, searchEventView, searchKeywordView, settingsView) {

    var navigationView = Backbone.View.extend({

        template: 'navbar',

        events: {
            'click #search-form .search-btn': 'triggerSearch',
            'click #event-form .search-event-btn': 'triggerEventSearch',
            'click #start-watch': 'triggerStartWatch',
            'click #stop-watch': 'triggerStopWatch',
            'click #search-hashtag #hashtag-search-button': 'triggerHashtagSearch',
            'click #search-keyword-btn': 'triggerSearchKeywordModal',
            'click #search-event-btn': 'triggerSearchEventModal',
            'click #settings-btn': 'triggerSettingsModal',
        },

        initialize: function(options) {
            this.insertViews({
                '#search-event .modal-body': new searchEventView(),
                '#search-keyword .modal-body': new searchKeywordView(),
                '#settings-modal .modal-body': new settingsView(options),
            });
        },

        triggerSearchEventModal: function(e) {
            $('#search-event').modal('show');
        },

        triggerSettingsModal: function(e) {
            $('#settings-modal').modal('show');
        },

        triggerSearchKeywordModal: function(e) {
            $('#search-keyword').modal('show');
        },

        triggerSearch: function(event) {
            event.preventDefault();
            app.paper.clear();
            this.keyword = $('#search-form #keyword').val();
            this.startDateTime = $('#search-form select option:selected').attr('value');

            var route = Backbone.history.fragment;

            // app.route.navigate()
        },

        triggerEventSearch: function(event) {
            event.preventDefault();
            app.paper.clear();
            this.keyword = $('#search-event option:selected').attr('data-hashtag');
            this.startDateTime = $('#search-event option:selected').attr('data-startDateTime');
            this.endDateTime = $('#search-event option:selected').attr('data-endDateTime');
            this.network = $('#search-event #network-event-selector option:selected ').attr('value');

            var route = Backbone.history.fragment;

            // app.route.navigate()
        },

        triggerHashtagSearch: function(event) {
            event.preventDefault();
            app.paper.clear();
            this.keyword = $('#search-hashtag #hashtag-field').attr('value');
            this.startDateTime = $('#search-hashtag #start-date-time').attr('value');
            this.endDateTime = $('#search-hashtag #end-date-time').attr('value');
            this.network = $('#search-hashtag #network option:selected').attr('value');

            var route = Backbone.history.fragment;

            // app.route.navigate
        },

        triggerStartWatch: function() {
            app.trigger('start:watch');
        },

        triggerStopWatch: function() {
            app.trigger('stop:watch');
        },

        clear: function() {
          this.model.destroy();
        },
    });

    return navigationView;
});