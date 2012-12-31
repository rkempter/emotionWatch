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
            this.startDateTime = new Date(options.startDateTime);
            console.log("Start "+this.startDateTime);
            this.endDateTime = new Date(options.endDateTime);
            console.log("End "+this.endDateTime);
            this.currentDateTime = new Date(options.currentDateTime);
            this.timeStep = options.timeStep || undefined;
            this.network = options.network || 'twitter';
            this.modelIndex = 0;

            // console.log("Startdatetime: "+this.startDateTime);
            
            this.viewPointer = new Array();

            app.on('jumpToTime', function(params) {
                self.jumpToGlobalTime(params.cid);
            });

            app.on('scroll:activate', function(id) {
                self.modelIndex = id;
                self.activateModels();
                self.resetModels();
            });

            // app.on('change:globalTime', function() {
            //     self.setGlobalTime();
            // });

            self.fetch({
                data: $.param({
                    network: self.network,
                    windowsize: self.timeStep,
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

            var max = 0;
            for(var time in frequencies) {
                var freq = parseInt(frequencies[time])
                if(max < freq) {
                    max = freq;
                }
            }

            var models = new Array();
            var localStartDateTime = self.startDateTime;
            var localEndDateTime = new Date(self.startDateTime.getTime() + self.timeStep * 1000);

            while(localStartDateTime.getTime() < self.endDateTime.getTime()) {
                var value = frequencies[localStartDateTime.getTime()] || 0;
               
                var scaling = parseFloat(value / max);  

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

                localStartDateTime = new Date(localStartDateTime.getTime() + self.timeStep * 1000);
                localEndDateTime = new Date(localEndDateTime.getTime() + self.timeStep * 1000);
            }

            console.log("Length: "+this.models.length);

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
            console.log("GlobalTime");
            var self = this;
            var model = self.getByCid(cid);

            if(undefined != self.activeSlot) {
                self.activeSlot.visited();
            }
            self.modelIndex = _.indexOf(self.models, model);
            var dateTime = model.get("localStartDateTime");

            app.trigger("set:globalTime", dateTime);

            self.activeSlot = model;

            if(null !== self.activeSlot) {
                self.activeSlot.activate();
            }

            self.activateModels();
            self.resetModels();

            self.modelIndex++;
        },

        activateModels: function() {
            if(this.modelIndex > this.models.length) {
                this.modelIndex = this.models.length;
            }
            for(var i = 0; i < this.modelIndex; i++) {
                this.at(i).visited();
            }
        },

        resetModels: function() {
            var total = this.models.length;
            for(var i = this.modelIndex+1; i < total; i++) {
                this.at(i).setReset();
            }
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