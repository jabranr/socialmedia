
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
    a.src = Socialmedia.SDK.twitter;
    return d.parentNode.insertBefore(a, d);
  })(document, 'script', 'twitter-wjs');
};


/* Twitter share link method */

Socialmedia.Twitter.prototype.Tweet = function(options) {
  var data, intentShareUrl;
  intentShareUrl = '//twitter.com/intent/tweet?';
  data = (options != null) && options.tweet ? "text=" + (encodeURIComponent(options.tweet)) + " " : "text=" + (encodeURIComponent(document.title)) + " ";
  data += (options != null) && options.hashtag ? "&hashtags=" + (encodeURIComponent(options.hashtag)) + " " : ' ';
  data += (options != null) && options.recommend ? "&related=" + (encodeURIComponent(options.recommend)) + " " : ' ';
  data += (options != null) && options.via ? "&via=" + (encodeURIComponent(options.via)) + " " : ' ';
  data += (options != null) && options.link ? "&url=" + (encodeURIComponent(options.link)) + " " : "&url=" + (encodeURIComponent(window.location.href)) + " ";
  return Socialmedia.Popup.apply(this, [intentShareUrl + data]);
};


/* Twitter Follow method */

Socialmedia.Twitter.prototype.Follow = function(username) {
  var intentFollowUrl;
  if (username == null) {
    username = 'jabranr';
  }
  username.replace(/@/, '');
  intentFollowUrl = '//twitter.com/intent/follow?';
  return Socialmedia.Popup.apply(this, [
    intentFollowUrl + ("screen_name=" + username), {
      width: 700,
      height: 485
    }
  ]);
};


/* Twitter Mention method */

Socialmedia.Twitter.prototype.Mention = function(username) {
  var intentMentionUrl;
  if (username == null) {
    username = 'jabranr';
  }
  username.replace(/@/, '');
  intentMentionUrl = '//twitter.com/intent/tweet?';
  return Socialmedia.Popup.apply(this, [intentMentionUrl + ("screen_name=" + username)]);
};


/* Twitter Hashtag method */

Socialmedia.Twitter.prototype.Hashtag = function(hashtag) {
  var intentHashtagUrl;
  if (hashtag == null) {
    hashtag = 'socialmedia';
  }
  hashtag.replace(/#/, '');
  intentHashtagUrl = '//twitter.com/intent/tweet?';
  return Socialmedia.Popup.apply(this, [intentHashtagUrl + ("button_hashtag=" + hashtag)]);
};


/* ref: https://about.twitter.com/resources/buttons#tweet */
