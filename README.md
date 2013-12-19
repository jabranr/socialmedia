#socialmedia.js

##Introduction

socialmedia.js is a small JavaScript library containing collection of various methods that are used for social media interactions. This library is built to lessen the clutter of code from various social media platforms and by using the minimal and easy setup. Other features include:

+ Easy to use with convenient callbacks and friendly naming.
+ Do more and write less i.e. inclusion of one facebook `init` method enables Facebook Like, Share, Invite, Send, Streams and many more defalt Facebook plugins.
+ Helps avoid repeating the same code in application.
+ Uses the same default core functions of social media platforms but with minimum input and setup.
+ Minified version is ~5kb that provides quick page load.
+ Auto creates the required div elements in `DOM` and keep them at appropriate levels in code.

##Installation &amp; Setup

1. [Download the latest release](https://github.com/jabranr/socialmedia.js/releases/)
2. A release includes the source code and ready to use example.
3. Minified source code located in `src/` is recommended.
4. Load and initialize the async Facebook SDKs using following code block in `<HEAD>` section of HTML document.

``` javascript
<script src="src/socialmedia.min.js">
  facebook.init({
    appid: 'YOUR_FACEBOOK_APP_ID',
    channelurl: '//yourdomain.com/channel.php'
  });
</script>
```
##List of Social Functions
Following are currently available functions through this library. Every function comes with its options and callback functions as explained below.

All of the [Facebook plugins](https://developers.facebook.com/docs/plugins/) work fine using above basic settings and initialization.

**Facebook Like Button Usage Example**

Adding following code snippet (normally found at [Facebook Like Button Plugin Page](https://developers.facebook.com/docs/plugins/like-button/)) will display an integrated Like Button in web page.

``` javascript
<div class="fb-like" data-href="YOUR_WEBSITE_URL_HERE" data-layout="standard" data-action="like" data-show-faces="false" data-share="false"></div>
```
Or a Like Button with Share Button..

``` javascript
<div class="fb-like" data-href="YOUR_WEBSITE_URL_HERE" data-layout="standard" data-action="like" data-show-faces="true" data-share="true"></div>
```


###Using advance Facebook API actions
To use the advance features of Facebook's API and social actions, you can pass set of options as an object in above `facebook.init` function as illustrated in following example:

**Settings:**

``` javascript

facebook.init({ settings });


facebook.init({
  appid: 'YOUR_FACEBOOK_APP_ID',
  channelurl: '//yourdomain.com/channel.php',
  status: false|true, //Optional & false by default
  flrequests: false|true, //Optional & false by default
  width: integer, //Optional - Default is automatic setSize()
  height: integer, //Optional - Default is automatic setSize()
  autogrow: true|false, //Default true
  x: integer, //Scroll canvas horizontally
  y: integer //Scroll canvas horizontally
});

```

###Facebook Share action

Apply Facebook share action at any object in application to display share dialog using following method:

``` javascript
facebook.share({ options, callback, callback });
```

**Options:**

Following options can be set for Share action.

+ title: title of application
+ url: url of application
+ image: image URL to display in share dialog
+ caption: caption to display in share dialog
+ description: brief description of application

**Callback:**

First callback function to return in result of share dialog's successful action.

**Secondary Callback:**

Secondary callback function to return in result of failure/cancelation of share dialog.

###Facebook Invite action:

Apply Facebook invite action at any object in application to display invite dialog using following method:
``` javascript
facebook.invite({ options, callback });
```

**Options:**

Following options can be set for Facebook Invite action.

+ message: Invite message to be displayed in invite dialog.

**Callback:**

Callback function to return in result of successful invite dialog action. Callback carries the Facebook response object.

###Twitter Tweet action:

Apply Twitter tweet action at any object in application to post tweet using following method:

``` javascript
twitter.tweet({ options });
```
**Options:**

Following options can be set for Tweet action.

+ tweet: Invite message to be displayed in invite dialog
+ handler: twitter handler
+ url: URL to post in tweet

All options are optional. A final tweet will be formed based upon whichever options are provided with values and will be URL encoded.

###Google Plus action:

Apply Google Plus action at any object in application to post it to Google Plus using following method:

``` javascript
gplus.plus({ options });
```

**Options:**

Following options can be set for Google Plus action.

+ url: URL to post to Google Plus

All options are optional. A final tweet will be formed based upon whichever options are provided with values and will be URL encoded.

##License:
[MIT License – http://opensource.org/licenses/MIT](http://opensource.org/licenses/MIT)
