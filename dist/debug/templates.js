this['JST'] = this['JST'] || {};

this['JST']['app/templates/compare-layout.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div id="compare">\n    <div class="navigation"></div>\n\n    <div class="weibo columns" id="left-column">\n        <div class="watch">\n            <h2>Weibo</h2>\n            <div class="paper"></div>\n            <div class="watch-view"></div>\n        </div>\n        <div class="bottom">\n            <div class="time-block">\n                <div class="curtain"></div>\n                <div class="current-time-box"></div>\n            </div>\n            <div class="date-time-freq">\n                <div class="paper"></div>\n            </div>\n        </div>\n    </div>\n    <div class="" id="middle-column">\n        <div class="keyword-title"></div>\n        <div class="time-block"></div>\n    </div>\n    <div class="twitter columns" id="right-column">\n        <div class="watch">\n            <h2>Twitter</h2>\n            <div class="paper"></div>\n            <div class="watch-view"></div>\n        </div>\n        <div class="bottom">\n            <div class="time-block">\n                <div class="curtain"></div>\n                <div class="current-time-box"></div>\n            </div>\n            <div class="date-time-freq">\n                <div class="paper"></div>\n            </div>\n        </div>\n    </div>\n    <div class="watches"></div>\n</div>';
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
__p+='<div id="index">\n    <div class="navigation"></div>\n    <div class="detail-block"></div>\n\n    <div class="columns" id="left-column">\n        <div class="tweets">\n        <div class="tweet-container">\n</div></div>\n    </div>\n    <div class="columns" id="middle-column">\n        <div class="keyword-title"></div>\n        <div class="watch">\n            <div class="paper">\n            </div>\n        </div>\n        \n    </div>\n    <div class="columns" id="right-column">\n        <div class="inner">\n            <div id="player"></div>\n            \n        </div>\n    </div>\n    <div id="bottom">\n        <div class="time-block">\n            <div class="curtain"></div>\n            <div class="current-time-box">\n            </div>\n        </div>\n        <div class="date-time-freq">\n            <div class="paper"></div>\n        </div>\n    </div>\n    <div class="watches"></div>\n    \n</div>';
}
return __p;
};

this['JST']['app/templates/navbar.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div id="settings-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="searchKeyword" aria-hidden="true">\n  <div class="modal-header">\n    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>\n    <h3 id="myModalLabel">Change settings</h3>\n  </div>\n  <div class="modal-body">\n  </div>\n</div>\n\n<div id="search-event" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="searchEvent" aria-hidden="true">\n  <div class="search-event-header modal-header">\n    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>\n    <h3 id="myModalLabel">Search Event</h3>\n  </div>\n  <div class="search-event-body modal-body">\n    \n  </div>\n</div>\n\n<div id="search-keyword" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="searchKeyword" aria-hidden="true">\n  <div class="modal-header">\n    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>\n    <h3 id="myModalLabel">Search athlete or hashtag</h3>\n  </div>\n  <div class="modal-body">\n  </div>\n</div>\n\n<div class="top-navigation">\n  <div class="title">\n\n    <div class="inside-title">\n      <div class="menu-left">\n        <ul>\n          <li><a href="/">Home</a></li>\n          <li id="settings-btn" class="modal-link" data-toggle="modal">\n            Settings\n          </li>\n          <li id="search-event-btn" class="modal-link" data-toggle="modal">\n            Search event\n          </li>\n          <li id="search-keyword-btn" class="modal-link" data-toggle="modal">\n            Search hashtag\n          </li>\n        </ul>\n      </div>\n      ';
 if(keywordType == 'event' && event !== undefined) { 
;__p+='\n        <h1>'+
( sport, gender, event )+
'</h1>\n      ';
 } else if(keywordType == 'keyword' && hashtag !== undefined) { 
;__p+='\n        <h1>'+
( hashtag )+
'</h1>\n      ';
 } else { 
;__p+='\n        <h1>Event or keyword not found</h1>\n      ';
 } 
;__p+='\n      <div class="subinfo">\n        <div class="subinfo-tab start">\n          <h2>Date and time of begin</h2>\n          <h3>'+
( moment(new Date(startDateTime)).format("DD.MM.YYYY HH:mm") )+
'</h3>\n        </div>\n        <div class="subinfo-tab end">\n          <h2>Date and time of end</h2>\n          <h3>'+
( moment(new Date(endDateTime)).format("DD.MM.YYYY HH:mm") )+
'</h3>\n        </div>\n        <div class="subinfo-tab timestep">\n          <h2>Interval</h2>\n          <h3>'+
( timeStep )+
'</h3>\n        </div>\n        <div class="subinfo-tab timestep">\n          <h2>Network</h2>\n          <h3>'+
( network )+
'</h3>\n        </div>\n      </div>\n      <div class="menu-right">\n        <ul>\n          <li><a href="'+
( urlSingle )+
'">Single watch view</a></li>\n          <li><a href="'+
( urlPattern )+
'">Pattern watch view</a></li>\n          ';
 if(keywordType == 'event') { 
;__p+='\n          <li><a href="'+
( urlCompare )+
'">Compare Twitter & Weibo</a></li>\n          ';
 } 
;__p+='\n        </ul>\n      </div>\n    </div>\n    \n  </div>\n\n  \n</div>';
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
__p+='<div class="form-horizontal">\n    <h2>Search an event</h2>\n    <div class="control-group">\n        <label class="control-label" for="event-gender">Choose gender: </label>\n        <div class="controls">\n            <select name="event-gender" id="event-gender">\n                <option value="men" ';
 if(gender == 'men') { 
;__p+=' selected ';
 } 
;__p+='>Male</option>\n                <option value="women" ';
 if(gender == 'women') { 
;__p+=' selected ';
 } 
;__p+='>Female</option>\n            </select>\n        </div>\n    </div>\n    <div class="control-group">\n        <label class="control-label" for="event-sport">Choose a sport</label>\n        <div class="controls">\n            <select name="event-sport" id="event-sport">\n                <option value="empty" selected></option>\n                <option value="diving" ';
 if(sport == 'diving') { 
;__p+=' selected ';
 } 
;__p+='>Diving</option>\n                <option value="swimming" ';
 if(sport == 'swimming') { 
;__p+=' selected ';
 } 
;__p+='>Swimming</option>\n                <option value="synchronised-swimming" ';
 if(sport == 'synchronised-swimming') { 
;__p+=' selected ';
 } 
;__p+='>Synchronised Swimming</option>\n                <option value="waterpolo" ';
 if(sport == 'waterpolo') { 
;__p+=' selected ';
 } 
;__p+='>Waterpolo</option>\n                <option value="archery" ';
 if(sport == 'archery') { 
;__p+=' selected ';
 } 
;__p+='>Archery</option>\n                <option value="badminton" ';
 if(sport == 'badminton') { 
;__p+=' selected ';
 } 
;__p+='>Badminton</option>\n                <option value="basketball" ';
 if(sport == 'basketball') { 
;__p+=' selected ';
 } 
;__p+='>Basketball</option>\n                <option value="boxing" ';
 if(sport == 'boxing') { 
;__p+=' selected ';
 } 
;__p+='>Boxing</option>\n                <option value="canoe-slalom" ';
 if(sport == 'canoe-slalom') { 
;__p+=' selected ';
 } 
;__p+='>Canoe Slalom</option>\n                <option value="canoe-sprint" ';
 if(sport == 'canoe-sprint') { 
;__p+=' selected ';
 } 
;__p+='>Canoe Sprint</option>\n                <option value="cycling" ';
 if(sport == 'cycling') { 
;__p+=' selected ';
 } 
;__p+='>Cycling</option>\n                <option value="cycling-bmx" ';
 if(sport == 'cycling-bmx') { 
;__p+=' selected ';
 } 
;__p+='>Cycling - BMX</option>\n                <option value="cycling-road" ';
 if(sport == 'cycling-road') { 
;__p+=' selected ';
 } 
;__p+='>Cycling - Road</option>\n                <option value="cycling-track" ';
 if(sport == 'cycling-track') { 
;__p+=' selected ';
 } 
;__p+='>Cycling - Track</option>\n                <option value="cycling-mountainbike" ';
 if(sport == 'cycling-mountainbike') { 
;__p+=' selected ';
 } 
;__p+='>Cycling - Mountain Bike</option>\n                <option value="equestrian" ';
 if(sport == 'equestrian') { 
;__p+=' selected ';
 } 
;__p+='>Equestrian</option>\n                <option value="fencing" ';
 if(sport == 'fencing') { 
;__p+=' selected ';
 } 
;__p+='>Fencing</option>\n                <option value="football" ';
 if(sport == 'football') { 
;__p+=' selected ';
 } 
;__p+='>Football</option>\n                <option value="golf" ';
 if(sport == 'golf') { 
;__p+=' selected ';
 } 
;__p+='>Golf</option>\n                <option value="gymnastics" ';
 if(sport == 'gymnastics') { 
;__p+=' selected ';
 } 
;__p+='>Gymnastics</option>\n                <option value="trampoline" ';
 if(sport == 'trampoline') { 
;__p+=' selected ';
 } 
;__p+='>Trampoline</option>\n                <option value="handball" ';
 if(sport == 'handball') { 
;__p+=' selected ';
 } 
;__p+='>Handball</option>\n                <option value="hockey" ';
 if(sport == 'hockey') { 
;__p+=' selected ';
 } 
;__p+='>Hockey</option>\n                <option value="judo" ';
 if(sport == 'v') { 
;__p+=' selected ';
 } 
;__p+='>Judo</option>\n                <option value="modern-pentathlon" ';
 if(sport == 'modern-pentathlon') { 
;__p+=' selected ';
 } 
;__p+='>Modern Pentathlon</option>\n                <option value="rowing" ';
 if(sport == 'rowing') { 
;__p+=' selected ';
 } 
;__p+='>Rowing</option>\n                <option value="sailing" ';
 if(sport == 'sailing') { 
;__p+=' selected ';
 } 
;__p+='>Sailing</option>\n                <option value="shooting" ';
 if(sport == 'shooting') { 
;__p+=' selected ';
 } 
;__p+='>Shooting</option>\n                <option value="table-tennis" ';
 if(sport == 'table-tennis') { 
;__p+=' selected ';
 } 
;__p+='>Table tennis</option>\n                <option value="taekwondo" ';
 if(sport == 'taekwondo') { 
;__p+=' selected ';
 } 
;__p+='>Taekwondo</option>\n                <option value="tennis" ';
 if(sport == 'tennis') { 
;__p+=' selected ';
 } 
;__p+='>Tennis</option>\n                <option value="triathlon" ';
 if(sport == 'triathlon') { 
;__p+=' selected ';
 } 
;__p+='>Triathlon</option>\n                <option value="volleyball" ';
 if(sport == 'volleyball') { 
;__p+=' selected ';
 } 
;__p+='>Volleyball</option>\n                <option value="beachvolleyball" ';
 if(sport == 'beachvolleyball') { 
;__p+=' selected ';
 } 
;__p+='>Beach Volleyball</option>\n                <option value="weightlifting" ';
 if(sport == 'weightlifting') { 
;__p+=' selected ';
 } 
;__p+='>Weightlifting</option>\n                <option value="wrestling" ';
 if(sport == 'wrestling') { 
;__p+=' selected ';
 } 
;__p+='>Wrestling</option>\n                <option value="athletics" ';
 if(sport == 'athletics') { 
;__p+=' selected ';
 } 
;__p+='>Athletics</option>\n            </select>\n        </div>\n    </div>\n\n    ';
 if (events.length > 0) { 
;__p+='\n    <div class="control-group">\n        <label class="control-label" for="event-event">Choose an event</label>\n        <div class="controls">\n            <select id="event-event" name="event-event">\n                <option value="empty" selected></option>\n                 ';
 _.each(events, function(event) { 
;__p+='\n                     <option ';
 if(selectedEvent == event.event) { 
;__p+=' selected ';
 } 
;__p+='data-hasvideo="'+
( event.video )+
'" data-startdatetime="'+
( event.startDateTime )+
'" data-enddatetime="'+
( event.endDateTime )+
'" data-hashtag-twitter="'+
( event.hashtag_twitter )+
'" data-hashtag-weibo="#'+
( event.hashtag_weibo )+
'">'+
( event.event )+
'</option>\n                 ';
 }); 
;__p+='\n             </select>\n        </div>\n    </div>\n    ';
 } 
;__p+='\n    <div class="control-group">\n        <label class="control-label" for="event-network">Network</label>\n        <div class="controls">\n            <select id="event-network" name="event-network">\n                <option value="twitter" selected>Twitter</option>\n                <option value="weibo">Weibo</option>\n            </select>\n        </div>\n    </div>\n    ';
 if (hasVideo == true) { 
;__p+='\n    <div class="control-group">\n        <label class="control-label" for="event-video">Show video?</label>\n        <div class="controls">\n           <select id="event-video" name="event-video">\n                <option value="true">Yes</option>\n                <option value="false" selected>No</option>\n            </select>\n        </div>\n    </div>\n    ';
 } 
;__p+='\n    <button class="btn btn-search" id="event-search">Search event</button>\n</div>';
}
return __p;
};

this['JST']['app/templates/searchkeywordtemplate.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="form-horizontal">\n    <h2>Search a keyword</h2>\n    <div class="control-group">\n        <label class="control-label" for="keyword">Hashtag (with #)</label>\n        <div class="controls">\n            <input type="text" id="keyword" name="keyword" />\n        </div>\n    </div>\n    <div class="control-group">\n        <label class="control-label" for="keyword">Network</label>\n        <div class="controls">\n            <select id="keyword-network" name="keyword-network">\n                <option value="twitter" selected>Twitter</option>\n                <option value="weibo">Weibo</option>\n            </select>\n        </div>\n    </div>\n    <div class="control-group">\n        <label class="control-label" for="keyword">Date at beginning</label>\n        <div class="controls">\n            <input type="date" name="keyword-start-date" class="date-time" value="2012-07-26" min="2012-07-26" max="2012-08-14" id="keyword-start-date" />\n        </div>\n    </div>\n    <div class="control-group">\n        <label class="control-label" for="keyword">Time at beginning</label>\n        <div class="controls">\n            <input type="time" name="keyword-start-time" class="date-time" value="09:00" id="keyword-start-time" />\n        </div>\n    </div>\n    <div class="control-group">\n        <label class="control-label" for="keyword">Date at end</label>\n        <div class="controls">\n            <input type="date" name="keyword-end-date" class="date-time" value="2012-07-26" min="2012-07-26" max="2012-08-14" id="keyword-end-date" />\n        </div>\n    </div>\n    <div class="control-group">\n        <label class="control-label" for="keyword">Time at end</label>\n        <div class="controls">\n            <input type="time" name="keyword-end-time" class="date-time" step="60" value="12:00" id="keyword-end-time" />\n        </div>\n    </div>\n    <button class="btn btn-search keyword-search">Search keyword or athlete</button>\n</div>';
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
'">Compare Twitter & Weibo</a>\n</div>';
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
'</small>\n</div>';
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
__p+='<div id="welcome-screen" class="modal show" tabindex="-1" role="dialog" aria-labelledby="searchKeyword" aria-hidden="true">\n  <div class="modal-header">\n    <h3 id="myModalLabel">Welcome!</h3>\n  </div>\n  <div class="modal-body">\n    <p>Dive into one of our most interesting picks and revive the emotions of the Olympic Events!</p>\n    <h4>The most interesting picks of the Olympic Games</h4>\n    <ul>\n        <li>\n          <a href="#search/twitter/event/gymnastics/5/1344343620000/1344346020000">\n            Gymnastics Artistic Women\'s Beam Final\n          </a>\n        </li>\n        <li>\n          <a href="#search/twitter/event/gymnastics/5/1344256680000/1344258720000">\n            Gymnastics Artistic Men\'s Vault Final\n          </a>\n        </li>\n        <li>\n          <a href="#search/twitter/event/gymnastics/5/1344253775000/1344255755000">\n            Gymnastics Artistic Women\'s Uneven Bars Final\n          </a>\n        </li>\n        <li>\n          <a href="#search/twitter/event/gymnastics/5/1344346560000/1344348840000">\n            Gymnastics Artistic Women\'s Floor Final\n          </a>\n        </li>\n        <li>\n          <a href="#search/twitter/event/tennis/5/1344160800000/1344168600000">\n            Tennis Men\'s Single Final\n          </a>\n        </li>\n        <li>\n          <a href="#search/twitter/event/swimming/5/1344015480000/1344015840000">\n            Swimming: 100m Butterfly Final\n          </a>\n        </li>\n         <li>\n          <a href="#search/twitter/event/swimming/5/1343588400000/1343588940000">\n            Swimming: 4x100m Free Men\n          </a>\n        </li>\n        <li>\n          <a href="#search/twitter/keyword/badminton/1800/1343739600000/1343826000000">\n            Badminton Scandal: Eight players got charged because they tried to lose their games\n          </a>\n        </li>\n    </ul>\n  </div>\n</div>';
}
return __p;
};