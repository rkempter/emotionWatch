define([
    "app",
    "backbone",
    "lodash",
    "jquery",
    "tweetfrequencyview",
    "tweetfrequencymodel",
    "Constants",
], function(app, Backbone, _, $, tweetFrequencyView, tweetFrequencyModel, Constants) {

    var tweetFrequencyCollection = Backbone.Collection.extend({

        initialize: function(options) {
            options = options || {};
            var self = this;

            this.centerPoint = options.centerPoint || undefined;
            this.startDateTime = options.startDateTime || undefined;
            this.endDateTime = options.endDateTime || undefined;
            this.interval = options.interval || undefined;
            this.network = options.network || 'twitter';
            this.modelIndex = 0;
            
            this.viewPointer = new Array();

            app.on('jumpToTime', function(params) {
                self.jumpToGlobalTime(params.cid);
            });

            app.on('change:globalTime', function() {
                self.setGlobalTime();
            });

            self.fetch({
                data: $.param({
                    network: self.network,
                    windowsize: self.interval,
                    startDateTime: self.startDateTime,
                    endDateTime: self.endDateTime,
                })
            });
        },

        url: function() {
            return 'http://localhost:8080/frequency';
        },

        parse: function(frequencies) {
            var self = this;
            var max = _.max(frequencies, function(element) { return element.frequency; });
            var models = new Array();

            for(var i = 0; i < frequencies.length; i++) {
                var value = frequencies[i].frequency;
                var scaling = parseFloat(value / max.frequency);
                
                var localStartDateTime = new Date(self.startDateTime.getTime() + i * self.interval * 1000);
                var localEndDateTime = new Date(self.startDateTime.getTime() + (i+1) * self.interval * 1000);

                var model = new tweetFrequencyModel({
                    "value": value,
                    "scaling": scaling,
                    "localStartDateTime": localStartDateTime,
                    "localEndDateTime": localEndDateTime,
                    "startDateTime": self.startDateTime,
                    "endDateTime": self.endDateTime,
                    "centerPoint": self.centerPoint,
                });

                models.push(model);

                var view = new tweetFrequencyView({
                    model: model
                });
                
                self.viewPointer.push(view);
            }

            return models;
        },

        setGlobalTime: function() {
            var self = this;

            if(undefined != self.activeSlot) {
                self.activeSlot.visited();
            }
           
            var dateTime = self.models[self.modelIndex].get("localStartDateTime");
            
            app.trigger("set:globalTime", dateTime);
           
            self.activeSlot = self.models[self.modelIndex];
            
            if(null !== self.activeSlot) {
                self.activeSlot.activate();
            }

            self.modelIndex++;
        },

        jumpToGlobalTime: function(cid) {
            var self = this;
            var model = self.getByCid(cid);

            if(undefined != self.activeSlot) {
                self.activeSlot.visited();
            }
            console.log(self.modelIndex);
            self.modelIndex = _.indexOf(self.models, model);
            console.log(self.modelIndex);
            var dateTime = model.get("localStartDateTime");
            console.log(dateTime);

            app.trigger("set:globalTime", dateTime);

            self.activeSlot = model;

            if(null !== self.activeSlot) {
                self.activeSlot.activate();
            }

            self.modelIndex++;
        },

        activateModel: function(cid) {
            var model = this.getByCid(cid);
            model.activate();
        },

        visitedModel: function(cid) {
            var model = this.getByCid(cid);
            model.visited();
        },
    });

    return tweetFrequencyCollection;
});