// Set the require.js configuration for your application.
require.config({

  // Initialize the application with the main application file.
  deps: ["main"],

  paths: {
    // JavaScript folders.
    libs: "../assets/js/libs",
    plugins: "../assets/js/plugins",
    vendor: "../assets/vendor",

    // Libraries.
    jquery: "../assets/js/libs/jquery",
    lodash: "../assets/js/libs/lodash",
    backbone: "../assets/js/libs/backbone",
    underscore: "../assets/js/libs/underscore",
    raphael: "../assets/js/libs/raphael-min",
    queue: "../assets/js/libs/Queue.compressed",

    // models
    emotionwatch: "models/emotionWatch",

    // views

    paperview: "views/paperview",
    emotionwatchview: "views/emotionwatchview",
    
  },

  shim: {
    // Backbone library depends on lodash and jQuery.
    backbone: {
      deps: ["lodash", "jquery"],
      exports: "Backbone"
    },

    // Backbone.LayoutManager depends on Backbone.
    "plugins/backbone.layoutmanager": ["backbone"]
  }

});
