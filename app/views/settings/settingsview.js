define([
    "app",
    "backbone",
    "jquery",
    "lodash",
    "util",
    "constants",
    "plugins/moment.min"

], function(app, Backbone, $, _, util, Constants) {
    
    var settingsView = Backbone.View.extend({

      template: 'settingstemplate',

      events: {
        'click #settings-change': 'triggerSettingsChange'
      },

      initialize: function() {
        _.bindAll(this, 'render');
        keyword = this.model.get('keyword');
        this.currentDateTime = this.model.get('currentDateTime');
        this.listenTo(app, 'close', this.close);
      },

      triggerSettingsChange: function() {
        var network = $('#settings #network option:selected').val();
        var timeStep = $('#settings #time-step').val();
        var startDate = $('#settings #start-date').val();
        var startTime = $('#settings #start-time').val();
        var endDate = $('#settings #end-date').val();
        var endTime = $('#settings #end-time').val();
        var startDateTime = new Date(startDate+" "+startTime);
        var endDateTime = new Date(endDate+" "+endTime);
        var keywordType = this.model.get('keywordType');
        var keyword = this.model.get('keyword');

        var change = false;
        var timeConflict = false;

        // If any of the parameters change, we need to reload the complete view
        if(network !== this.model.get('network')) {
          change = true;
        } else if(timeStep !== this.model.get('timeStep')){
          change = true;
        } else if(startDateTime !== this.model.get('startDateTime')){
          change = true;
        } else if(endDateTime !== this.model.get('endDateTime')){
          change = true;
        } else if(this.currentDateTime <= startDateTime) {
          // We don't want the currentDateTime to be smaller as the startDateTime
          timeConflict = true;
        } else if(this.currentDateTime > endDateTime) {
          // And we don't want the currentDateTime to be bigger than the endDateTime
          timeConflict = true;
        }

        // Depending on the flags, we compute the route
        if(change && !timeConflict) {
           app.router.navigate('#search/'+network+'/'+keywordType+'/'+keyword+'/'+timeStep+'/'+startDateTime.getTime()+'/'+endDateTime.getTime()+'/'+this.currentDateTime.getTime(), true);
        } else if(change && timeConflict) {
          app.router.navigate('#search/'+network+'/'+keywordType+'/'+keyword+'/'+timeStep+'/'+startDateTime.getTime()+'/'+endDateTime.getTime(), true);
        }
      },



      // Render template with the paramters
      render: function(template) {
        var output = template({
          animationDuration: this.model.get('animationDuration'),
          timeStep: this.model.get('timeStep'),
          network: this.model.get('network'),
          startDate: moment(this.model.get('startDateTime')).format("YYYY-MM-DD"),
          startTime: moment(this.model.get('startDateTime')).format("HH:mm:ss"),
          endDate: moment(this.model.get('endDateTime')).format("YYYY-MM-DD"),
          endTime: moment(this.model.get('endDateTime')).format("HH:mm:ss")
        });

        this.$el.html(output);
      },

      close: function() {
        this.remove();
        this.unbind();
      }

    });

    return settingsView;
});