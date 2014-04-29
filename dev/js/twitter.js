
/* Twitter object */
Socialmedia.Twitter = function() {
  this.init();
};


/* Twitter init method */

Socialmedia.Twitter.prototype.init = function() {
  (function(a, b, c) {
    var d;
    d = a.getElementsByTagName(b)[0];
    a = a.createElement(b);
    a.id = c;
    Socialmedia.SDK.twitter;
    return d.parentNode.insertBefore(a, d);
  })(document, 'script', 'twitter-wjs');
};


/* Twitter share link method */

Socialmedia.Twitter.prototype.Tweet = function(options) {
  var data, intentShareUrl;
  if (options == null) {
    options = {};
  }
  intentShareUrl = '//twitter.com/intent/tweet?';
  data = (options.tweet != null) && ("text=" + (encodeURIComponent(options.tweet)) + " ") || ' ';
  data += (options.link != null) && ("&url=" + (encodeURIComponent(options.link)) + " ") || encodeURIComponent(window.location.href);
  data += (options.via != null) && ("&via=" + (encodeURIComponent(options.via)) + " ") || ' ';
  return Socialmedia.Popup(intentShareUrl + data);
};


/* Twitter Follow method */

Socialmedia.Twitter.prototype.Follow = function(username) {
  var intentFollowUrl;
  if (username == null) {
    username = 'jabranr';
  }
  username.replace(/@/, '');
  intentFollowUrl = '//twitter.com/intent/follow?';
  return Socialmedia.Popup(intentFollowUrl + ("screen_name=" + username), {
    width: 750,
    height: 465
  });
};


/* Twitter Mention method */

Socialmedia.Twitter.prototype.Mention = function(username) {
  var intentMentionUrl;
  if (username == null) {
    username = 'jabranr';
  }
  username.replace(/@/, '');
  intentMentionUrl = '//twitter.com/intent/tweet?';
  return Socialmedia.Popup(intentMentionUrl + ("screen_name=" + username));
};


/* Twitter Hashtag method */

Socialmedia.Twitter.prototype.Hashtag = function(hashtag) {
  var intentHashtagUrl;
  if (hashtag == null) {
    hashtag = 'socialmedia';
  }
  hashtag.replace(/#/, '');
  intentHashtagUrl = '//twitter.com/intent/tweet?';
  return Socialmedia.Popup(intentHashtagUrl + ("button_hashtag=" + hashtag));
};


/* ref: https://about.twitter.com/resources/buttons#tweet */
