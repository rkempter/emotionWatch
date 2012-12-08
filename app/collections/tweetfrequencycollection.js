define([
    "app",
    "backbone",
    "lodash",
    "jquery",
    "tweetfrequencyview",
    "Constants",
], function(app, Backbone, _, $, tweetFrequencyView, Constants) {

    var tweetFrequencyCollection = Backbone.Collection.extend({

        initialize: function(options) {
            options = options || {};
            var self = this;

            this.centerPoint = options.centerPoint || undefined;
            this.startDateTime = options.startDateTime || undefined;
            this.endDateTime = options.endDateTime || undefined;
            this.interval = options.interval || undefined;
            this.network = options.network || 'twitter';
            
            this.viewPointer = new Array();

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

            for(var i = 0; i < frequencies.length; i++) {
                var value = frequencies[i].frequency;
                var scaling = parseFloat(value / max.frequency);
                
                var localStartDateTime = new Date(self.startDateTime.getTime() + i * self.interval * 1000);
                var localEndDateTime = new Date(self.startDateTime.getTime() + (i+1) * self.interval * 1000);

                var model = new Backbone.Model({
                    "value": value,
                    "scaling": scaling,
                    "localStartDateTime": localStartDateTime,
                    "localEndDateTime": localEndDateTime,
                    "startDateTime": self.startDateTime,
                    "endDateTime": self.endDateTime,
                    "centerPoint": self.centerPoint,
                });

                var view = new tweetFrequencyView({
                    model: model
                });
                
                self.viewPointer.push(view);
            }
        },
    });

    return tweetFrequencyCollection;
});