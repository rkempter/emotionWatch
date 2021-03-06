define([
    "app",
    "backbone",
    "lodash",
    "jquery",
    "tweetfrequencyview",
    "tweetfrequencymodel",
    "Constants"
], function(app, Backbone, _, $, tweetFrequencyView, tweetFrequencyModel, Constants) {

    var tweetFrequencyCollection = Backbone.Collection.extend({

        events: {
            'sync': 'notify'
        },

        initialize: function(options) {
            options = options || {};
            var self = this;

            this.centerPoint = options.centerPoint || undefined;
            this.startDateTime = options.startDateTime;
            this.endDateTime = options.endDateTime;
            this.currentDateTime = options.currentDateTime;
            this.timeStep = options.timeStep || undefined;
            this.mode = options.mode || 'regular';
            this.network = options.network || 'twitter';
            this.keyword = options.keyword;
            this.keywordType = options.keywordType;
            this.collectionId = options.id  || 'normal';
            this.modelIndex = 0;
            
            this.viewPointer = [];

            // Listen to the jumpToTime events, triggered in tweetfrequencymodel.
            // Event is triggered, when user clicks on a tweetfrequencyslot.
            this.listenTo(app, 'jumpToTime', function(params) {
                self.jumpToGlobalTime(params.cid);
            });

            if(this.mode == 'regular' || this.mode == 'compare') {
                // In regular and compare view, module needs to listen to the
                // globalTime event.
                this.listenTo(app, 'change:globalTime', function(dateTime) {
                    self.setTime(dateTime);
                });
            }

            this.listenTo(this, 'sync', function() {
                app.trigger('loaded');
            });

            // Fetching the necessary data from the server.
            self.fetch({
                data: $.param({
                    network: self.network,
                    windowsize: self.timeStep,
                    startDateTime: self.startDateTime,
                    endDateTime: self.endDateTime,
                    keyword: self.keyword.split(","),
                    keywordType: options.keywordType
                }) 
            });
        },

        notify: function() {
            
        },

        url: function() {
            return app.server+'frequency';
        },

        // Parse the received data
        parse: function(frequencies) {
            var self = this;

            // Figure out the maximal frequency
            var max = 0;
            for(var time in frequencies) {
                var freq = parseInt(frequencies[time].frequency);
                if(max < freq) {
                    max = freq;
                }
            }

            // Create []s witht he models
            var models = [];
            // The first dateTime of the complete interval
            var localStartDateTime = self.startDateTime;
            // the end time of the first slot
            var localEndDateTime = new Date(self.startDateTime.getTime() + self.timeStep * 1000);

            // Go trough the complete timeinterval
            while(localStartDateTime.getTime() < self.endDateTime.getTime()) {
                // If we didn't get a frequency for a timeslot, the frequency is zero!
                var bar = frequencies[localStartDateTime.getTime()] || {};

                var value = bar.frequency || 0;
                var emotion = bar.emotion || 'empty';
                var scaling = 0;

                // Normalize the frequency value
                if(max !== 0) {
                    scaling = parseFloat(value / max);
                }
                
                // Create model for the current slot
                var model = new tweetFrequencyModel({
                    "value": value,
                    "emotion": emotion,
                    "timeStep": this.timeStep,
                    "scaling": scaling,
                    "localStartDateTime": localStartDateTime,
                    "localEndDateTime": localEndDateTime,
                    "startDateTime": self.startDateTime,
                    "endDateTime": self.endDateTime,
                    "centerPoint": self.centerPoint,
                    "mode": self.mode,
                    "paper": app.frequencyPaper[this.collectionId]
                });

                models.push(model);
                // Create view for this slot
                var view = new tweetFrequencyView({
                    model: model
                });
                // Push the view to an array
                self.viewPointer.push(view);
                // Adjust the dateTime's to the next slot
                localStartDateTime = new Date(localStartDateTime.getTime() + self.timeStep * 1000);
                localEndDateTime = new Date(localEndDateTime.getTime() + self.timeStep * 1000);
            }

            return models;
        },

        // Set the time according to the clock (timeview)
        setTime: function(dateTime) {
            // Total number of slots
            var total = this.models.length;

            for(var i = 0; i < total; i++) {
                if(this.at(i).get('localStartDateTime').getTime() < dateTime.getTime()) {
                    this.at(i).visited();
                } else if(this.at(i).get('localStartDateTime').getTime() == dateTime.getTime()) {
                    this.at(i).activate();
                } else {
                    this.at(i).setReset();
                }
            }
        },

        // Jump to a certain timeslot.
        jumpToGlobalTime: function(cid) {
            var self = this;
            // find the model in the collection
            var model = self.get(cid) || null;

            if(null !== model) {
                // Get time of the current slot
                var dateTime = model.get("localStartDateTime");
                // Need to synchronize the clock (timeview)
                app.trigger("change:globalTime", dateTime);
            }
        },

        activateSlot: function(nbr) {
            var model = this.at(nbr) || null;

            if(null !== model) {
                model.trigger('activate');
            }
        },

        deactivateSlot: function(nbr) {
            var model = this.at(nbr) || null;

            if(null !== model) {
                model.trigger('reset');
            }
        },

        // For scrolling
        activateModels: function() {
            if(this.modelIndex > this.models.length) {
                this.modelIndex = this.models.length;
            }
            for(var i = 0; i < this.modelIndex; i++) {
                this.at(i).visited();
            }
        }
    });

    return tweetFrequencyCollection;
});