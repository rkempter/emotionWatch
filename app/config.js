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
    tweetfrequencymodel: "models/tweetfrequencymodel",
    navigationmodel: "models/navigation/navigationmodel",
    videomodel: "models/video/videomodel",

    // collection
    emotioncollection: "collections/frontpage/emotioncollection",
    emotionwatchcollection: "collections/pattern/emotionwatchcollection",
    tweetcollection: "collections/tweetcollection",
    tweetfrequencycollection: "collections/tweetfrequencycollection",

    // views
    emotioncollectionview: "views/frontpage/emotioncollectionview",
    detailview: "views/detail/detailview",
    tweetview: "views/tweet/tweetview",
    settingsview: "views/settings/settingsview",
    searcheventview: "views/search/searcheventview",
    searchkeywordview: "views/search/searchkeywordview",
    emotionview: "views/frontpage/emotionview",
    paperview: "views/canvas/paperview",
    timeview: "views/time/timeview",
    timeview_compare: "views/time/timeview_compare",
    welcomeview: "views/frontpage/welcomeview",
    frequencypaperview: "views/canvas/frequencypaperview",
    videoview: "views/video/videoview",
    emotionwatchview: "views/watch/emotionwatchview",
    navigationview: "views/navigation/navigationview",
    tweetcollectionview: "views/tweet/tweetcollectionview",
    tweetfrequencyview: "views/frequency/tweetfrequencyview",
    compareview: "views/compare/compareview",
    comparetitleview: "views/compare/comparetitleview",
    filterkeywordview: "views/search/filterkeywordview",
    tweetfrequencycollectionview: "views/frequency/tweetfrequencycollectionview",

    templates: "templates"
    
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
    "plugins/bootstrap-modal": ['jquery'],
    "plugins/jquery.timer": ['jquery']
  }

});
