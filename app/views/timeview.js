define([
    "app",
    "backbone",
    "jquery",
    "lodash",
    "util",
    "constants",

], function(app, Backbone, $, _, util, Constants) {
    
    var timeView = Backbone.View.extend({

        template: 'timetemplate',

        events: {
            'click #start-stop-control': 'triggerStartStop',
        },  

        initialize: function() {
            var self = this;
            this.model = new Backbone.Model();
            this.model.set("label", "start");

            app.on("set:globalTime", function(dateTime) {
                self.model.set("date", dateTime.getDay()+"."+dateTime.getDate()+"."+dateTime.getFullYear());
                self.model.set("time", dateTime.getHours()+":"+dateTime.getMinutes()+":"+dateTime.getSeconds());
                self.render();
            }, this);
        },

        render: function() {
            var output = window.JST['app/templates/timetemplate.html']( { label: this.model.get("label"), currentDate: this.model.get("date"), currentTime: this.model.get("time") } );
            $( this.el ).html( output );
        },

        triggerStartStop: function() {
            if(this.model.get("label") == "start") {
                this.model.set("label", "stop");
                app.trigger("stop:watch");
                this.render();
            } else {
                this.model.set("label", "start");
                app.trigger("start:watch");
                this.render();
            }
        },

    });

    return timeView;
})  