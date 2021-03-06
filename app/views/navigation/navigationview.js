define([
    "app",
    "lodash",
    "jquery", 
    "backbone", 
    "raphael",
    'constants',
    "searcheventview",
    "searchkeywordview",
    "settingsview",
    "filterkeywordview",
    "util",
    "plugins/bootstrap-modal"
], function(app, _, $, Backbone, Raphael, Constants, searchEventView, searchKeywordView, settingsView, filterKeywordView, util) {

    var navigationView = Backbone.View.extend({

        template: 'navbar',

        events: {
            'click #search-keyword-btn': 'triggerSearchKeywordModal',
            'click #search-event-btn': 'triggerSearchEventModal',
            'click #settings-btn': 'triggerSettingsModal',
            'click #filter-keyword-btn': 'triggerFilterKeywordModal'
        },

        initialize: function() {
            var self = this;
            _.bindAll(this, 'render');
            // Load Settings, Event Search and Keyword search views into modals

            if(this.model.get('keywordType') === 'event') {
                this.model.fetch({
                    data: $.param({
                        id: this.model.get('keyword')
                    })
                });
            }

            this.listenTo(app, 'close', self.close);
            this.model.on("change", this.render, this);
            this.listenTo(app, 'loaded', self.showStart);
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

        // Show keyword filter modal window when triggered
        triggerFilterKeywordModal: function(e) {
            $('#filter-keyword').modal('show');
        },

        close: function() {
            this.searchEvent.close();
            if(this.filterKeyword !== undefined)
                this.filterKeyword.close();
            this.settings.close();
            this.searchKeyword.close();

            // Remove view
            this.remove();
            this.unbind();
        },

        beforeRender: function() {
            this.searchEvent = new searchEventView();
            this.searchKeyword = new searchKeywordView();

            if(this.model.get('keywordType') === 'event' || this.model.get('eventId') !== undefined) {
                var id = this.model.get('keywordType') === 'event' ? this.model.get('keyword') : this.model.get('eventId');

                this.filterKeyword = new filterKeywordView({
                    id: id,
                    network: this.model.get('network'),
                    timeStep: this.model.get('timeStep'),
                    "event": this.model.get('event'),
                    gender: this.model.get('gender'),
                    sport: this.model.get('sport')
                });
                this.insertView('#filter-keyword .modal-body', this.filterKeyword);
            }

            this.settings = new settingsView({
                model: new Backbone.Model(this.model.toJSON())
            });

            this.insertViews({
                '#search-keyword .modal-body': this.searchKeyword,
                '#search-event .modal-body': this.searchEvent,
                '#settings-modal .modal-body': this.settings
            });
        },

        // Render template with small submenu for the three views
        render: function(template) {
            var options = this.model.toJSON();
            options.urlSingle = '#search/'+options.network+'/'+this.model.get('keywordType')+'/'+this.model.get('keyword')+'/'+this.model.get('timeStep')+'/'+this.model.get('startDateTime').getTime()+'/'+this.model.get('endDateTime').getTime()+'/'+this.model.get('currentDateTime').getTime();
            options.urlPattern = '#pattern/'+options.network+'/'+this.model.get('keywordType')+'/'+this.model.get('keyword')+'/'+this.model.get('timeStep')+'/'+this.model.get('startDateTime').getTime()+'/'+this.model.get('endDateTime').getTime()+'/'+this.model.get('currentDateTime').getTime();
            options.urlCompare = '#compareinit/'+this.model.get('keyword');
            if(options.keywordType !== 'event' || options.sport !== undefined) {
                var output = template(options);
                this.$el.html( output );
            }
        },

        afterRender: function() {
            var self = this;
            $('#start-all').click(function(e) {
                e.preventDefault();
                self.startAll();
            });
            if(this.start === true) {
                $('#loading .loading-text h2').hide();
                $('#loading #start-all').show(); 
            }
        }
    });

    return navigationView;
});