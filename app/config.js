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
    util: "util",

    // models
    emotionmodel: "models/frontpage/emotionmodel",
    emotionwatch: "models/emotionWatch",
    tweetmodel: "models/tweetmodel",
    eventmodel: "models/eventmodel",
    tweetfrequencymodel: "models/tweetfrequencymodel",

    // collection
    emotioncollection: "collections/frontpage/emotioncollection",
    emotionwatchcollection: "collections/pattern/emotionwatchcollection",
    tweetcollection: "collections/tweetcollection",
    eventcollection: "collections/eventcollection",
    tweetfrequencycollection: "collections/tweetfrequencycollection",

    // views
    emotioncollectionview: "views/frontpage/emotioncollectionview",
    searcheventview: "views/search/searcheventview",
    emotionview: "views/frontpage/emotionview",
    paperview: "views/paperview",
    timeview: "views/timeview",
    welcomeview: "views/frontpage/welcomeview",
    titleview: "views/titleview",
    frequencypaperview: "views/frequencypaperview",
    videoview: "views/videoview",
    emotionwatchview: "views/emotionwatchview",
    searchview: "views/searchview",
    navigationview: "views/navigationview",
    emotionwatchcollectionview: "views/pattern/emotionwatchcollectionview",
    tweetcollectionview: "views/tweet/tweetcollectionview",
    eventcollectionview: "views/event/eventcollectionview",
    tweetfrequencyview: "views/frequency/tweetfrequencyview",


    templates: "templates",
    printletters: "../assets/js/plugins/Raphael-printletters",

    

    //sanchez: "../assets/js/libs/sanchez_400.font",
    
  },

  shim: {
    // Backbone library depends on lodash and jQuery.
    backbone: {
      deps: ["lodash", "jquery"],
      exports: "Backbone"
    },

    raphael: {
      exports: "Raphael"
    },

    // Backbone.LayoutManager depends on Backbone.
    "plugins/backbone.layoutmanager": ["backbone"],
    "plugins/bootstrap-tab": ["jquery"],
    "plugins/jquery.scrollto": ['jquery'],
    // Raphael.printLetters depends on Raphael
    // printletters: {
    //   deps: ["raphael"],
    //   exports: 'Raphael.fn.printLetters'
    // },
  }

});
