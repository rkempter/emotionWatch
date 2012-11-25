// Set the require.js configuration for your application.
require.config({

  // Initialize the application with the main application file.
  deps: ["main"],

  paths: {
    // JavaScript folders.
    libs: "../assets/js/libs",
    plugins: "../assets/js/plugins",
    vendor: "../assets/vendor",

    text: '../assets/js/libs/text',

    // Libraries.
    jquery: "../assets/js/libs/jquery",
    lodash: "../assets/js/libs/lodash",
    backbone: "../assets/js/libs/backbone",
    underscore: "../assets/js/libs/underscore",
    raphael: "../assets/js/libs/raphael.amd",
    queue: "../assets/js/libs/Queue.compressed",
    constants: "constants",

    // models
    emotionwatch: "models/emotionWatch",

    // collection
    emotionwatchcollection: "collections/emotionwatchcollection",

    // views
    paperview: "views/paperview",
    emotionwatchview: "views/emotionwatchview",
    searchview: "views/searchview",
    navigationview: "views/navigationview",
    emotionwatchcollectionview: "views/emotionwatchcollectionview",

    templates: "templates",
    printletters: "plugins/Raphael-printletters",

    //sanchez: "../assets/js/libs/sanchez_400.font",
    
  },

  shim: {
    // Backbone library depends on lodash and jQuery.
    backbone: {
      deps: ["lodash", "jquery"],
      exports: "Backbone"
    },

    raphael: {
      exports: "Raphael",
    },

    // Backbone.LayoutManager depends on Backbone.
    "plugins/backbone.layoutmanager": ["backbone"],
    // Raphael.printLetters depends on Raphael
    printletters: {
      deps: ["raphael"],
      exports: 'Raphael.fn.printLetters'
    },
  }

});
