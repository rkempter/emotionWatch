this['JST'] = this['JST'] || {};

this['JST']['app/templates/compare-layout.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div id="compare">\n    <div class="navigation"></div>\n\n    <div class="weibo columns" id="left-column">\n        <div class="watch">\n            <h2>Weibo</h2>\n            <div class="paper"></div>\n            <div class="watch-view"></div>\n        </div>\n        <div class="bottom">\n            <div class="date-time-freq">\n                <div class="paper"></div>\n                <div class="freq"></div>\n            </div>\n        </div>\n    </div>\n    <div class="" id="middle-column">\n        <div class="keyword-title"></div>\n        <div class="time-block"></div>\n    </div>\n    <div class="twitter columns" id="right-column">\n        <div class="watch">\n            <h2>Twitter</h2>\n            <div class="paper"></div>\n            <div class="watch-view"></div>\n        </div>\n        <div class="bottom">\n            <div class="date-time-freq">\n                <div class="paper"></div>\n                <div class="freq"></div>\n            </div>\n        </div>\n    </div>\n    <div class="watches"></div>\n</div>';
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
__p+='<h4>Timeslot</h4>\n<p><small>from</small> '+
( localStartDateTime )+
'</p>\n<p><small>until</small> '+
( localEndDateTime )+
'</p>\n<p>Tweets: '+
( tweetCount )+
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
__p+='<div id="index">\n    <div class="navigation"></div>\n    <div class="detail-block"></div>\n\n    <div class="columns" id="left-column">\n        <div class="tweets"></div>\n    </div>\n    <div class="columns" id="middle-column">\n        <div class="keyword-title"></div>\n        <div class="watch">\n            <div class="paper">\n            </div>\n        </div>\n        \n    </div>\n    <div class="columns" id="right-column">\n        <div class="inner">\n            <div id="player"></div>\n            <div class="time-block"></div>\n        </div>\n    </div>\n    <div id="bottom">\n        <div class="date-time-freq">\n            <div class="paper"></div>\n        </div>\n    </div>\n    <div class="watches"></div>\n    \n</div>';
}
return __p;
};

this['JST']['app/templates/navbar.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div id="settings-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="searchKeyword" aria-hidden="true">\n  <div class="modal-header">\n    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>\n    <h3 id="myModalLabel">Change settings</h3>\n  </div>\n  <div class="modal-body">\n  </div>\n</div>\n\n<div id="search-event" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="searchEvent" aria-hidden="true">\n  <div class="search-event-header modal-header">\n    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>\n    <h3 id="myModalLabel">Search Event</h3>\n  </div>\n  <div class="search-event-body modal-body">\n    \n  </div>\n</div>\n\n<div id="search-keyword" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="searchKeyword" aria-hidden="true">\n  <div class="modal-header">\n    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>\n    <h3 id="myModalLabel">Search athlete or hashtag</h3>\n  </div>\n  <div class="modal-body">\n  </div>\n</div>\n\n<div class="top-navigation">\n  <div class="logo"><a href="/">The Olympic Emotion Project</a></div>\n  <div class="menu">\n    <ul>\n      <li id="settings-btn" data-toggle="modal">\n        Settings\n      </li>\n      <li id="search-event-btn" data-toggle="modal">\n        Search event\n      </li>\n      <li id="search-keyword-btn" data-toggle="modal">\n        Search hashtag / athlete\n      </li>\n      <li>About the project</li>\n      <li><a href="http://www.github.com/rkempter">Github</a></li>\n    </ul>\n  </div>\n</div>';
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
__p+='<h2>Search an event</h2>\n<div class="input-control">\n    <label for="event-gender">Choose gender</label>\n    <div class="inner-control">\n        <select name="event-gender" id="event-gender">\n            <option value="men">Male</option>\n            <option value="women">Female</option>\n        </select>\n    </div>\n</div>\n<div class="input-control">\n    <label for="event-sport">Choose a sport</label>\n    <div class="inner-control">\n        <select name="event-sport" id="event-sport">\n            <option value="diving">Diving</option>\n            <option value="swimming">Swimming</option>\n            <option value="synchronised swimming">Synchronised Swimming</option>\n            <option value="waterpolo">Waterpolo</option>\n            <option value="archery">Archery</option>\n            <option value="badminton">Badminton</option>\n            <option value="basketball">Basketball</option>\n            <option value="boxing">Boxing</option>\n            <option value="canoe slalom">Canoe Slalom</option>\n            <option value="canoe sprint">Canoe Sprint</option>\n            <option value="cycling">Cycling</option>\n            <option value="cycling-bmx">Cycling - BMX</option>\n            <option value="cycling-road">Cycling - Road</option>\n            <option value="cycling-track">Cycling - Track</option>\n            <option value="cycling-mountain bike">Cycling - Mountain Bike</option>\n            <option value="equestrian">Equestrian</option>\n            <option value="fencing">Fencing</option>\n            <option value="football">Football</option>\n            <option value="golf">Golf</option>\n            <option value="gymnastics">Gymnastics</option>\n            <option value="trampoline">Trampoline</option>\n            <option value="handball">Handball</option>\n            <option value="hockey">Hockey</option>\n            <option value="judo">Judo</option>\n            <option value="modern pentathlon">Modern Pentathlon</option>\n            <option value="rowing">Rowing</option>\n            <option value="sailing">Sailing</option>\n            <option value="shooting">Shooting</option>\n            <option value="table tennis">Table tennis</option>\n            <option value="taekwondo">Taekwondo</option>\n            <option value="tennis">Tennis</option>\n            <option value="triathlon">Triathlon</option>\n            <option value="volleyball">Volleyball</option>\n            <option value="beach volleyball">Beach Volleyball</option>\n            <option value="weightlifting">Weightlifting</option>\n            <option value="wrestling">Wrestling</option>\n            <option value="athletics">Athletics</option>\n        </select>\n    </div>\n</div>\n\n';
 if (events.length > 0) { 
;__p+='\n<div class="input-control">\n    <label for="event-network">Choose an event</label>\n    <div class="inner-control">\n        <select id="event-event">\n             ';
 _.each(events, function(event) { 
;__p+='\n                 <option data-startdatetime="'+
( event.startDateTime )+
'" data-enddatetime="'+
( event.endDateTime )+
'" data-hashtag-twitter="'+
( event.hashtag_twitter )+
'" data-hashtag-weibo="'+
( event.hashtag_weibo )+
'">'+
( event.event )+
'</option>\n             ';
 }); 
;__p+='\n         </select>\n    </div>\n</div>\n';
 } 
;__p+='\n<div class="input-control">\n    <label for="event-network">Network</label>\n    <div class="inner-control">\n        <select id="event-network" name="event-network">\n            <option value="twitter" selected>Twitter</option>\n            <option value="weibo">Weibo</option>\n        </select>\n    </div>\n</div>\n<button class="btn btn-search" id="event-search">Search event</button>';
}
return __p;
};

this['JST']['app/templates/searchkeywordtemplate.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<h2>Search a keyword or athlete / person</h2>\n<div class="input-control">\n    <label for="keyword">Keyword (with # or @)</label>\n    <div class="inner-control">\n        <input type="text" id="keyword" />\n    </div>\n</div>\n<div class="input-control">\n    <label for="keyword-network">Network</label>\n    <div class="inner-control">\n        <select id="keyword-network" name="keyword-network">\n            <option value="twitter" selected>Twitter</option>\n            <option value="weibo">Weibo</option>\n        </select>\n    </div>\n</div>\n<div class="input-control">\n    <label for="keyword-start-date-time">Startdate & time</label>\n    <div class="inner-control">\n        <input type="date" name="keyword-start-date" class="date-time" value="2012-07-26" min="2012-07-26" max="2012-08-14" id="keyword-start-date" />\n        <input type="time" name="keyword-start-time" class="date-time" value="09:00" id="keyword-start-time" />\n    </div>\n</div>\n <div class="input-control">\n    <label for="keyword-end-date-time">Enddate & time</label>\n    <div class="inner-control">\n        <input type="date" name="keyword-end-date" class="date-time" value="2012-07-26" min="2012-07-26" max="2012-08-14" id="keyword-end-date" />\n        <input type="time" name="keyword-end-time" class="date-time" step="60" value="12:00" id="keyword-end-time" />\n    </div>\n</div>\n<button class="btn btn-search keyword-search">Search keyword or athlete</button>';
}
return __p;
};

this['JST']['app/templates/settingstemplate.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div id="settings">\n    <h2>Settings</h2>\n    <div class="input-control">\n        <label>Animation duration of one step</label>\n        <div class="inner-control">\n            <input type="text" name="animation-duration" id="animation-duration" value="'+
( animationDuration )+
'" />\n        </div>\n    </div>\n    <div class="input-control">\n        <label>Length of a time step</label>\n        <div class="inner-control">\n            <input type="text" name="time-step" id="time-step" value="'+
( timeStep )+
'" />\n        </div>\n    </div>\n    <div class="input-control">\n        <label>Network</label>\n        <div class="inner-control">\n            <select id="network">\n                <option value="twitter">Twitter</option>\n                <option value="weibo">Weibo</option>\n            </select>\n        </div>\n    </div>\n    <div class="input-control">\n        <label>Date & time at beginning</label>\n        <div class="inner-control">\n            <input type="date" min="2012-07-26" max="2012-08-14" name="start-date" id="start-date" value="'+
( startDate )+
'" />\n            <input type="time" name="start-time" id="start-time" value="'+
( startTime )+
'" />\n        </div>\n    </div>\n    <div class="input-control">\n        <label>Date & time at end</label>\n        <div class="inner-control">\n            <input type="date" min="2012-07-26" max="2012-08-14"  name="end-date" id="end-date" value="'+
( endDate )+
'" />\n            <input type="time" name="end-time" id="end-time" value="'+
( endTime )+
'" />\n        </div>\n    </div>\n    <button class="btn btn-search" id="settings-change">Change settings</button>\n</div>';
}
return __p;
};

this['JST']['app/templates/timetemplate.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="time-box">\n    <div id="start-stop-control">'+
( label )+
'</div>\n    <span class="date">From '+
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
__p+='<li>\n     <span class="date '+
( emotion )+
'">'+
( moment(new Date(datetime)).format("HH:mm") )+
'</span>\n     <p>'+
( tweet )+
'\n     <small>'+
( user )+
'</small>\n</li>';
}
return __p;
};

this['JST']['app/templates/tweetview.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="inner">\n    <div class="title-box">\n        <h2>Tweets / weibos</h2>\n        <select id="emotion-category">\n            <option value="all">Show all</option>\n            <option value="love">Love</option>\n            <option value="pride">Pride</option>\n            <option value="surprise">Surprise</option>\n            <option value="excitement">Excitement</option>\n            <option value="joy">Joy</option>\n            <option value="like">Like</option>\n            <option value="anger">Anger</option>\n            <option value="shame">Shame</option>\n            <option value="shock">Shock</option>\n            <option value="anxiety">Anxiety</option>\n            <option value="sadness">Sadness</option>\n            <option value="dislike">Dislike</option>\n        </select>\n    </div>\n    <ul>\n\n    </ul>\n</div>';
}
return __p;
};

this['JST']['app/templates/videotemplate.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<video>\n  <source src="'+
( videoUrl )+
'" type=\'video/mp4; codecs="avc1.42E01E, mp4a.40.2"\' />\n</video>';
}
return __p;
};

this['JST']['app/templates/welcome.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<h1>The Olympic Emotion Project</h1>\n<p>The Olympic Emotion Project aims at extracting emotions from tweets and weibos sent during the Olympic Games and related to the same. The projects objective is to visualize the reaction of users to specific happenings like wins and losses. Every hashtag or person, including athletes, who were tweeting during the olympics, have an emotional profile, indicating the found emotions in the tweets related to that person.</p>\n<div class="left">\n    \n</div>\n<div class="right">\n    \n</div>\n<div style="clear: both;"></div>';
}
return __p;
};