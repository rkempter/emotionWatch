# SocialEmotionEye Application

## Introduction

SocialEmotionEye is an application which visualizes emotions expressed on Twitter during the Olympic Games 2012 in London. It requires the SocialEmotionEye Server (<https://github.com/rkempter/emotionWatchServer>) and access to the database with the >40 mio tweets.

## Installation

1. Clone the repository to your computer
2. In ``àpp/app.js```, adjust the variable 'server' to the correct host and port on which the server is running.
3. Add a virtual host (not sure if this is optional or not!)

In httpd-vhosts.conf (Mac Configuration)
```
<VirtualHost *:80>
    ServerName example.dev
    DocumentRoot "/your/path/to/the/application/"
    DirectoryIndex index.html
    <Directory "/your/path/to/the/application/">
        AllowOverride All
        Allow from all
    </Directory>
</VirtualHost>
```
and add ```127.0.0.1   example.dev``` to your host file. Restart apache
4. Run the server, access the site. It should work.

## Requirements

The application was created using Backbone.js, Raphaël.js, lowdash.js, jQuery, Moment.js, and it is based on the Backbone Boilerplate, which used the Backbone Layout Manager. I believe that in newer versions of the Backbone Boilerplate, the Layout Manager is not used anymore...

## Additional notes

For production, there is a grunt-file coming with the Backbone Boilerplate distribution. running the command ```bbb release -force``` lints the javascript files and generates one single file. There is a problem with the LESS to CSS compilation based on grunt and some copy-paste is required.

I wasn't finding a proper production solution, therefore, you have to switch the server url in the app.js file manually before compilation... (Big TODO).

Unit and functional Tests would be a good idea as well...

## Architecture

Basically, the 'router.js' file generates all the views by calling the needed models, collections and views. Models are filled up with data coming from the server API. The view files focus on displaying this information.

### Timing

Timing is handled by the view 'timeview.js', respectively 'timeview_compare.js'. The view uses a timer and triggers events such as 'start:watch', 'stop:time', 'change:globalTime' with the date & time attached as a parameter. Those events are propagated using the global 'app' variable.

### EmotionWatch

The emotion watch can be found in the folder '/models/emotionWatch.js' and '/views/watch/emotionwatchview.js'. For using the watch, a Raphael canvas object is required. Those can be found in 'views/canvas/'.