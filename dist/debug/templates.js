this['JST'] = this['JST'] || {};

this['JST']['app/templates/compare-init-template.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div id="settings" class="form-horizontal">\n    <h2>Initialize the comparison</h2>\n    <h3>General settings</h3>\n    <div class="control-group">\n        <label class="control-label" for="time-step">Length of a time step</label>\n        <div class="controls">\n          <select id="time-step" name="time-step">\n                <option ';
 if(timeStep == 5) { 
;__p+=' selected ';
 } 
;__p+='value="5">5 seconds</option>\n                <option ';
 if(timeStep == 15) { 
;__p+=' selected ';
 } 
;__p+='value="15">15 seconds</option>\n                <option ';
 if(timeStep == 60) { 
;__p+=' selected ';
 } 
;__p+='value="60">1 minute</option>\n                <option ';
 if(timeStep == 120) { 
;__p+=' selected ';
 } 
;__p+='value="120">2 minutes</option>\n                <option ';
 if(timeStep == 300) { 
;__p+=' selected ';
 } 
;__p+='value="300">5 minutes</option>\n                <option ';
 if(timeStep == 900) { 
;__p+=' selected ';
 } 
;__p+='value="900">15 minutes</option>\n                <option ';
 if(timeStep == 1800) { 
;__p+=' selected ';
 } 
;__p+='value="1800">30 minutes</option>\n                <option ';
 if(timeStep == 3600) { 
;__p+=' selected ';
 } 
;__p+='value="3600">1 hour</option>\n                <option ';
 if(timeStep == 7200) { 
;__p+=' selected ';
 } 
;__p+='value="7200">2 hours</option>\n                <option ';
 if(timeStep == 43200) { 
;__p+=' selected ';
 } 
;__p+='value="43200">12 hours</option>\n            </select>\n        </div>\n    </div>\n    <div class="control-group">\n        <label class="control-label" for="start-date">Date at beginning</label>\n        <div class="controls">\n            <input type="date" min="2012-07-26" max="2012-08-14" name="start-date" id="start-date" value="'+
( startDate )+
'" />\n        </div>\n    </div>\n    <div class="control-group">\n        <label class="control-label" for="start-time">Time at beginning</label>\n        <div class="controls">\n            <input type="time" name="start-time" id="start-time" value="'+
( startTime )+
'" />\n        </div>\n    </div>\n    <div class="control-group">\n        <label class="control-label" for="end-date">Date at end</label>\n        <div class="controls">\n            <input type="date" min="2012-07-26" max="2012-08-14"  name="end-date-left" id="end-date" value="'+
( endDate )+
'" />\n        </div>\n    </div>\n    <div class="control-group">\n        <label class="control-label" for="end-time">Time at end</label>\n        <div class="controls">\n            <input type="time" name="end-time-left" id="end-time" value="'+
( endTime )+
'" />\n        </div>\n    </div>\n    <hr />\n\n    <h2>Left watch</h2>\n\n    <div class="control-group">\n        <label class="control-label" for="network">Hashtags or athlete\'s twitter name (with # and @)</label>\n        <p class="help">If multiple hashtags or twitter names are entered, seperate them by comma</p>\n        <div class="controls">\n            <input type="text" name="hashtag-left" />\n        </div>\n    </div>\n\n    <div class="control-group">\n        <label class="control-label" for="network">Network</label>\n        <div class="controls">\n            <select id="network" name="network-left">\n                <option ';
 if(network == 'twitter') { 
;__p+=' selected ';
 } 
;__p+='value="twitter">Twitter</option>\n                <option ';
 if(network == 'weibo') { 
;__p+=' selected ';
 } 
;__p+='value="weibo">Weibo</option>\n            </select>\n        </div>\n    </div>\n    <hr />\n    <h2>Right watch</h2>\n    <div class="control-group">\n        <label class="control-label" for="network">Hashtags or athlete\'s twitter name (with # and @)</label>\n        <p class="help">If multiple hashtags or twitter names are entered, seperate them by comma</p>\n        <div class="controls">\n            <input type="text" name="hashtag-right" />\n        </div>\n    </div>\n    <div class="control-group">\n        <label class="control-label" for="network">Network</label>\n        <div class="controls">\n            <select id="network" name="network-right">\n                <option ';
 if(network == 'twitter') { 
;__p+=' selected ';
 } 
;__p+='value="twitter">Twitter</option>\n                <option ';
 if(network == 'weibo') { 
;__p+=' selected ';
 } 
;__p+='value="weibo">Weibo</option>\n            </select>\n        </div>\n    </div>\n    <button class="btn btn-search" id="settings-change">Start</button>\n</div>';
}
return __p;
};

this['JST']['app/templates/compare-init.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div id="compare">\n    <div class="menu">\n        <ul>\n            <li>\n                <a href="#home">Start page</a>\n            </li>\n            <li>\n                <a href="#searchhome">Single Watch View Search</a>\n            </li>\n        </ul>\n    </div>\n    <div class="navigation">\n        <h1 class="title">Compare events, topics or athletes</h1>\n    </div>\n\n    <div id="initialization-form">\n        <div class="init-column" id="left-watch">\n            <h2>Left watch</h2>\n            <div class="control-group">\n                <label class="control-label" for="networkLeft">Network</label>\n                <div class="controls">\n                    <select id="networkLeft" name="networkLeft">\n                        <option>Twitter</option>\n                        <option>Weibo</option>\n                        <option>Both</option>\n                    </select>\n                </div>\n            </div>\n            <div class="control-group">\n                <label class="control-label" for="keywordLeft">Search term</label>\n                <div id="keywordLeft" class="keywords">\n                    ';
 for(var i = 0; i < keywords.length; i++) { 
;__p+='\n                        <label class="checkbox">\n                          <input type="checkbox" value="'+
( keywords[i] )+
'"> '+
( keywords[i] )+
'\n                        </label>\n                    ';
 }; 
;__p+='\n                </div>\n            </div>\n        </div>\n        <div class="init-column" id="general-info">\n            <h2>Pick an event</h2>\n            <div class="control-group">\n                <label for="events" class="control-label">Event</label>\n                <div class="controls">\n                    <select name="events" id="events">\n                        ';
 for(var event in events) { 
;__p+='\n                        <option ';
 if(eventId === event) {
;__p+='selected';
 }
;__p+=' value="'+
(events[event].id)+
'">'+
(events[event].event)+
' ('+
(events[event].sport)+
') - '+
(events[event].gender)+
'</option>\n                        ';
 } 
;__p+='\n                    </select>\n                </div>\n            </div>\n            <div class="submit">\n                <button id="load-visualization" class="btn btn-primary">Load visualization</button>\n                <div class="alert alert-error">\n                </div>\n            </div>\n        </div>\n        <div class="init-column" id="right-watch">\n            <h2>Right watch</h2>\n            <div class="control-group">\n                <label class="control-label" for="networkRight">Network</label>\n                <div class="controls">\n                    <select id="networkRight" name="networkRight">\n                        <option selected>Twitter</option>\n                        <option>Weibo</option>\n                        <option>Both</option>\n                    </select>\n                </div>\n            </div>\n            <div class="control-group">\n                <label class="control-label" for="keywordRight">Search term</label>\n                <div id="keywordRight" class="keywords">\n                    ';
 for(var i = 0; i < keywords.length; i++) { 
;__p+='\n                        <label class="checkbox">\n                          <input type="checkbox" value="'+
( keywords[i] )+
'"> '+
( keywords[i])+
'\n                        </label>\n                    ';
 }; 
;__p+='\n                </div>\n            </div>\n        </div>\n    </div>\n</div>';
}
return __p;
};

this['JST']['app/templates/compare-layout.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div id="compare">\n    <div class="menu">\n        <ul>\n            <li>\n                <a href="#home">Start page</a>\n            </li>\n            <li>\n                <a href="#searchhome">Single Watch View Search</a>\n            </li>\n        </ul>\n    </div>\n    <div class="information">\n    \n    </div>\n    <div id="video"></div>\n    <div class="middle-separator"></div>\n    <div id="loading">\n        <div class="loading-background"></div>\n        <div class="loading-text">\n            <h2>Loading...</h2>\n            <button id="start-all" class="btn btn-primary">Start Visualisation</button>\n        </div>\n    </div>\n\n    <div class="visualization">\n        <div class="left-watch columns" id="left-column">\n            <div class="watch">\n                <h2></h2>\n                <div class="paper"></div>\n                <div class="watch-view"></div>\n            </div>\n            <div class="bottom">\n                <div class="time-block">\n                    <div class="curtain"></div>\n                    <div class="current-time-box"></div>\n                </div>\n                <div class="date-time-freq">\n                    <div class="paper"></div>\n                </div>\n                <div class="freq"></div>\n            </div>\n        </div>\n        <div class="" id="middle-column">\n            <div class="keyword-title"></div>\n            <div class="time-block"></div>\n        </div>\n        <div class="right-watch columns" id="right-column">\n            <div class="watch">\n                <h2></h2>\n                <div class="paper"></div>\n                <div class="watch-view"></div>\n            </div>\n            <div class="bottom">\n                <div class="time-block">\n                    <div class="curtain"></div>\n                    <div class="current-time-box"></div>\n                </div>\n                <div class="date-time-freq">\n                    <div class="paper"></div>\n                </div>\n                <div class="freq"></div>\n            </div>\n        </div>\n        <div class="watches"></div>\n    </div>\n</div>';
}
return __p;
};

this['JST']['app/templates/compare-title-template.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="top">\n    <div class="left-watch-info info-column">\n        <h2>'+
( keywordLeft )+
' <small>Network: '+
( networkLeft )+
'</small></h2>\n        <a href="'+
( leftLink )+
'">Analyze in Single Watch View</a>\n    </div>\n    <div class="right-watch-info info-column">\n        <h2>'+
( keywordRight )+
' <small>Network: '+
( networkRight )+
'</small></h2>\n        <a href="'+
( rightLink )+
'">Analyze in Single Watch View</a>\n    </div>\n</div>\n \n<div class="middle info-column">\n    <div id="middle-info">\n        <ul>\n            <li>\n                <h3>Current</h3>\n                <span class="dateTime">\n                    '+
( firstDateTime )+
' - '+
( secondDateTime )+
'\n                </span>\n            </li>\n            <li>Start: '+
(moment(new Date(startDateTime)).format("DD.MM.YYYY HH:mm:ss"))+
'</li>\n            <li>End: '+
(moment(new Date(endDateTime)).format("DD.MM.YYYY HH:mm:ss"))+
'</li>\n        </ul>\n    </div>\n    <div class="controls">\n        <button id="start-stop-control-btn" class="btn btn-primary">Pause</button>\n    </div>\n</div>';
}
return __p;
};

this['JST']['app/templates/comparison-wrapper.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div id="comparison"></div>';
}
return __p;
};

this['JST']['app/templates/datetimefreq.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<h3>'+
(startDateTime)+
' - '+
(endDateTime)+
'</h3>\n<h4>'+
(frequency)+
' tweets</h4>';
}
return __p;
};

this['JST']['app/templates/detailview.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<p>'+
( moment(new Date(localStartDateTime)).format("DD.MM.YYYY HH:mm:ss") )+
'</p>\n<p class="tweet-nbr">'+
( tweetCount )+
' tweets</p>\n<p>'+
( moment(new Date(localEndDateTime)).format("DD.MM.YYYY HH:mm:ss") )+
'</p>';
}
return __p;
};

this['JST']['app/templates/eventview.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<select id="events">\n     ';
 _.each(events, function(event) { 
;__p+='\n         <option data-startdatetime="'+
( event.get('startDateTime') )+
'" data-enddatetime="'+
( event.get('endDateTime') )+
'" data-hashtag="#gymnastics">'+
( event.get('sport') )+
' - '+
( event.get('event') )+
' - '+
( event.get('gender') )+
' ('+
( event.get('eventDate') )+
')</option>\n     ';
 }); 
;__p+='\n </select>\n <select id="network-event-selector">\n     <option value="twitter">Twitter</option>\n     <option value="weibo">Weibo</option>\n </select>\n <button type="submit" class="search-event-btn btn">Create new emotion watch</button>';
}
return __p;
};

this['JST']['app/templates/frontpage.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="paper"></div>\n<div class="welcome"></div>';
}
return __p;
};

this['JST']['app/templates/main-layout.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div id="index">\n    <div class="navigation"></div>\n    <div id="loading">\n        <div class="loading-background"></div>\n        <div class="loading-text">\n            <h2>Loading...</h2>\n            <button id="start-all" class="btn btn-primary">Start Visualisation</button>\n        </div>\n    </div>\n    <div class="columns" id="left-column">\n        <div class="tweets">\n            <div class="tweet-container"></div>\n        </div>\n    </div>\n    <div class="columns" id="middle-column">\n        <div class="keyword-title"></div>\n        <div class="watch">\n            <div class="paper">\n            </div>\n        </div>\n    </div>\n    <div class="columns" id="right-column">\n        <div class="inner">\n            <div id="player"></div>\n        </div>\n    </div>\n    <div id="bottom">\n        <div class="detail-block"></div>\n        <div class="time-block">\n            <div class="curtain"></div>\n            <div class="current-time-box">\n            </div>\n        </div>\n        <div class="date-time-freq">\n            <div class="paper"></div>\n        </div>\n    </div>\n    <div class="watches"></div> \n</div>';
}
return __p;
};

this['JST']['app/templates/navbar.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div id="settings-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="searchKeyword" aria-hidden="true">\n  <div class="modal-header">\n    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>\n    <h3 id="myModalLabel">Change settings</h3>\n  </div>\n  <div class="modal-body">\n  </div>\n</div>\n\n<div id="search-event" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="searchEvent" aria-hidden="true">\n  <div class="search-event-header modal-header">\n    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>\n    <h3 id="myModalLabel">Search Event</h3>\n  </div>\n  <div class="search-event-body modal-body">\n    \n  </div>\n</div>\n\n<div id="search-keyword" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="searchKeyword" aria-hidden="true">\n  <div class="modal-header">\n    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>\n    <h3 id="myModalLabel">Search athlete or hashtag</h3>\n  </div>\n  <div class="modal-body">\n  </div>\n</div>\n\n<div class="top-navigation">\n  <div class="title">\n\n    <div class="inside-title">\n      <div class="menu-left">\n        <ul>\n          <li><a href="#home">Home</a></li>\n          <li id="settings-btn" class="modal-link" data-toggle="modal">\n            Settings\n          </li>\n          <li id="search-event-btn" class="modal-link" data-toggle="modal">\n            Search event\n          </li>\n          <li id="search-keyword-btn" class="modal-link" data-toggle="modal">\n            Search hashtag\n          </li>\n        </ul>\n      </div>\n      ';
 if(keywordType === 'event' && event !== undefined) { 
;__p+='\n        <h1>'+
( sport, gender, event )+
'</h1>\n      ';
 } else if(keywordType == 'keyword' && keyword !== undefined) { 
;__p+='\n        <h1>'+
( keyword )+
'</h1>\n      ';
 } else { 
;__p+='\n        <h1>Event or keyword not found</h1>\n      ';
 } 
;__p+='\n      <div class="subinfo">\n        <div class="subinfo-tab start">\n          <h2>Timestamp of begin</h2>\n          <h3>'+
( moment(new Date(startDateTime)).format("DD.MM.YYYY HH:mm") )+
'</h3>\n        </div>\n        <div class="subinfo-tab end">\n          <h2>Timestamp of end</h2>\n          <h3>'+
( moment(new Date(endDateTime)).format("DD.MM.YYYY HH:mm") )+
'</h3>\n        </div>\n        <div class="subinfo-tab timestep">\n          <h2>Interval</h2>\n          <h3>'+
( timeStep )+
'</h3>\n        </div>\n        <div class="subinfo-tab timestep">\n          <h2>Network</h2>\n          <h3>'+
( network )+
'</h3>\n        </div>\n      </div>\n      <div class="menu-right">\n        <ul>\n          <li><a href="'+
( urlSingle )+
'">Single watch view</a></li>\n          ';
 if(keywordType == 'event') { 
;__p+='\n          <li><a href="#comparesearch/'+
( keyword )+
'">Compare Twitter & Weibo</a></li>\n          ';
 } else { 
;__p+='\n          <li><a href="#comparesearch">Compare Twitter & Weibo</a></li>\n          ';
 } 
;__p+='\n        </ul>\n      </div>\n    </div>\n  </div>\n</div>';
}
return __p;
};

this['JST']['app/templates/pattern-layout.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div id="pattern">\n    <div class="navigation"></div>\n\n    <div class="columns" id="middle-column">\n        <div class="keyword-title"></div>\n        <div class="watch">\n            <div class="paper">\n            </div>\n        </div>\n        \n    </div>\n    <div id="bottom">\n        <div class="date-time-freq">\n            <div class="paper"></div>\n        </div>\n    </div>\n    <div class="watches"></div>\n    <div class="detail-block"></div>\n</div>';
}
return __p;
};

this['JST']['app/templates/search.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div id="container">\n  <ul class="nav nav-tabs" id="myTab">\n    <li><a href="#event-tab">Event based watch</a></li>\n    <li><a href="#search-tab">Search based watch</a></li>\n  </ul>\n \n  <div class="tab-content">\n    <div class="tab-pane active" id="event-tab">\n      <form id="event-form" class="form-inline">\n        <div class="event-selector"></div>\n      </form>\n    </div>\n    <div class="tab-pane" id="search-tab">\n      <form id="search-form" class="form-inline">\n        <select>\n          <option value="July 28, 2012 18:00:00">28.07.2012</option>\n          <option value="July 29, 2012 18:00:00">29.07.2012</option>\n          <option value="July 30, 2012 18:00:00">30.07.2012</option>\n          <option value="July 31, 2012 18:00:00">31.07.2012</option>\n          <option value="August 01, 2012 18:00:00">01.08.2012</option>\n        </select>\n        <select id="network-event-selector">\n            <option value="twitter">Twitter</option>\n            <option value="weibo">Weibo</option>\n        </select>\n        <input type="text" id="keyword" class="input-medium" placeholder="Topic">\n        <button type="submit" class="search-btn btn">Create new emotion watch</button>\n      </form>\n    </div>\n  </div>\n  <div class="row">\n    <div class="span12" style="margin-top: 10px;">\n        <button id="start-watch" class="btn btn-success">Start Watch</button>\n        <button id="stop-watch" class="btn btn-danger">Stop Watch</button>\n    </div>\n  </div>\n</div>';
}
return __p;
};

this['JST']['app/templates/searcheventtemplate.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="form-horizontal">\n    <h2>Search an event</h2>\n    <div class="control-group">\n        <label class="control-label" for="event-sport">Choose an event</label>\n        <div class="controls">\n            <select id="event-selection">\n                ';
 for(var i in events) { 
;__p+='\n                <option value="'+
(events[i].id)+
'">'+
( events[i].sport)+
', '+
(events[i].event )+
', '+
(events[i].gender)+
'</option>\n                ';
 } 
;__p+='\n            </select>\n        </div>\n    </div>\n    <div class="control-group">\n        <label class="control-label" for="event-network">Network</label>\n        <div class="controls">\n            <select id="event-network" name="event-network">\n                <option value="twitter" selected>Twitter</option>\n                <option value="weibo">Weibo</option>\n                <option value="both">Both networks</option>\n            </select>\n        </div>\n    </div>\n    <button class="btn btn-search" id="event-search">Search event</button>\n</div>';
}
return __p;
};

this['JST']['app/templates/searchkeywordtemplate.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="form-horizontal">\n    <h2>Filter a keyword</h2>\n\n    <button class="btn btn-search keyword-search">Filter</button>\n</div>';
}
return __p;
};

this['JST']['app/templates/settingstemplate.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div id="settings" class="form-horizontal">\n    <h2>Settings</h2>\n    <div class="control-group">\n        <label class="control-label" for="time-step">Length of a time step</label>\n        <div class="controls">\n          <select id="time-step" name="time-step">\n                <option ';
 if(timeStep == 5) { 
;__p+=' selected ';
 } 
;__p+='value="5">5 seconds</option>\n                <option ';
 if(timeStep == 15) { 
;__p+=' selected ';
 } 
;__p+='value="15">15 seconds</option>\n                <option ';
 if(timeStep == 60) { 
;__p+=' selected ';
 } 
;__p+='value="60">1 minute</option>\n                <option ';
 if(timeStep == 120) { 
;__p+=' selected ';
 } 
;__p+='value="120">2 minutes</option>\n                <option ';
 if(timeStep == 300) { 
;__p+=' selected ';
 } 
;__p+='value="300">5 minutes</option>\n                <option ';
 if(timeStep == 900) { 
;__p+=' selected ';
 } 
;__p+='value="900">15 minutes</option>\n                <option ';
 if(timeStep == 1800) { 
;__p+=' selected ';
 } 
;__p+='value="1800">30 minutes</option>\n                <option ';
 if(timeStep == 3600) { 
;__p+=' selected ';
 } 
;__p+='value="3600">1 hour</option>\n                <option ';
 if(timeStep == 7200) { 
;__p+=' selected ';
 } 
;__p+='value="7200">2 hours</option>\n                <option ';
 if(timeStep == 43200) { 
;__p+=' selected ';
 } 
;__p+='value="43200">12 hours</option>\n            </select>\n        </div>\n    </div>\n    <div class="control-group">\n        <label class="control-label" for="network">Network</label>\n        <div class="controls">\n            <select id="network" name="network">\n                <option ';
 if(network == 'twitter') { 
;__p+=' selected ';
 } 
;__p+='value="twitter">Twitter</option>\n                <option ';
 if(network == 'weibo') { 
;__p+=' selected ';
 } 
;__p+='value="weibo">Weibo</option>\n            </select>\n        </div>\n    </div>\n    <div class="control-group">\n        <label class="control-label" for="start-date">Date at beginning</label>\n        <div class="controls">\n            <input type="date" min="2012-07-26" max="2012-08-14" name="start-date" id="start-date" value="'+
( startDate )+
'" />\n        </div>\n    </div>\n    <div class="control-group">\n        <label class="control-label" for="start-time">Time at beginning</label>\n        <div class="controls">\n            <input type="time" name="start-time" id="start-time" value="'+
( startTime )+
'" />\n        </div>\n    </div>\n    <div class="control-group">\n        <label class="control-label" for="end-date">Date at end</label>\n        <div class="controls">\n            <input type="date" min="2012-07-26" max="2012-08-14"  name="end-date" id="end-date" value="'+
( endDate )+
'" />\n        </div>\n    </div>\n    <div class="control-group">\n        <label class="control-label" for="end-time">Time at end</label>\n        <div class="controls">\n            <input type="time" name="end-time" id="end-time" value="'+
( endTime )+
'" />\n        </div>\n    </div>\n    <button class="btn btn-search" id="settings-change">Change settings</button>\n</div>';
}
return __p;
};

this['JST']['app/templates/timetemplate.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div id="start-stop-control">'+
( label )+
'</div>\n<div class="dates">\n    <span class="date">From '+
( firstDateTime )+
'</span>\n    <span class="date">until '+
( secondDateTime )+
'</span>\n</div>';
}
return __p;
};

this['JST']['app/templates/titletemplate.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<h1 class="title">'+
( title )+
'</h1>\n';
 if(event == null || gender == null) { 
;__p+='\n<h3>From the '+
( moment(startDateTime).format("Do MMM YYYY") )+
' until the '+
( moment(endDateTime).format("Do MMM YYYY") )+
', with steps of '+
( steps )+
'</h3>\n';
 } else { 
;__p+='\n<h3>'+
( event )+
', '+
( gender )+
', from the '+
( moment(startDateTime).format("Do MMM YYYY") )+
' until the '+
( moment(endDateTime).format("Do MMM YYYY") )+
', with steps of '+
( steps )+
'</h3>\n';
 } 
;__p+='\n<div class="display-type">\n    <a href="'+
( urlSingle )+
'">Single View</a> | <a href="'+
( urlPattern )+
'">Pattern view</a> | <a href="'+
( urlCompare )+
'">Compare Twitter & Weibo</a>\n</div>\n\n<div id="loading">\n    <div class="loading-background"></div>\n    <div class="loading-text">\n        <h2>Loading...</h2>\n        <button class="btn btn-primary">Start</button>\n    </div>\n</div>';
}
return __p;
};

this['JST']['app/templates/tweet.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="tweet" style="'+
( styler )+
'">\n     <span class="date '+
( emotion )+
'">'+
( moment(new Date(datetime)).format("HH:mm") )+
'</span>\n     <p>'+
( tweet )+
'</p>\n     <small>'+
( user )+
'</small>\n     <div class="tweet-emotion '+
( emotion )+
'">'+
( emotion )+
'</div>\n</div>';
}
return __p;
};

this['JST']['app/templates/tweetview.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='';
}
return __p;
};

this['JST']['app/templates/videotemplate.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='';
 if(videoUrl.indexOf('undefined') == -1) { 
;__p+='\n<video>\n  <source src="'+
( videoUrl )+
'" type=\'video/mp4; codecs="avc1.42E01E, mp4a.40.2"\' />\n</video>\n';
 } 
;__p+='';
}
return __p;
};

this['JST']['app/templates/welcome.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div id="welcome">\n  <h1 class="title">The Olympic Emotion Project</h1>\n\n  <div class="events">\n  <h2>The most interesting picks of the Olympic Games 2012 in London</h2>\n\n    <ul>\n      ';
 for(var i in events) { 
;__p+='\n      <li>\n        <h3>'+
(events[i].sport)+
', '+
(events[i].event)+
', '+
(events[i].gender)+
'</h3>\n        <a href="#search/twitter/event/'+
(events[i].id)+
'/5/'+
(new Date(events[i].startDateTime).getTime())+
'/'+
(new Date(events[i].endDateTime).getTime())+
'">Twitter</a> <a href="#search/weibo/event/'+
(events[i].id)+
'/5/'+
(new Date(events[i].startDateTime).getTime())+
'/'+
(new Date(events[i].endDateTime).getTime())+
'">Weibo</a> <a href="#search/both/event/'+
(events[i].id)+
'/5/'+
(new Date(events[i].startDateTime).getTime())+
'/'+
(new Date(events[i].endDateTime).getTime())+
'">Both</a>\n        <a href="#comparesearch/'+
(events[i].id)+
'">Compare</a>\n      </li>\n      ';
 } 
;__p+='\n    </ul>\n  </div>\n\n  <p class="lead">To get more information about this project, visit the <a href="http://grpupc1.epfl.ch/~valentina/OlympicProjectPage/OlympicProject.html">project page</a></p>\n\n</div>';
}
return __p;
};