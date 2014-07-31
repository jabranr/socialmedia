
/* Twitter object */
Socialmedia.Twitter = function() {
  this.init();
};


/* Twitter init method */

Socialmedia.Twitter.prototype.init = function() {
  var _this;
  _this = this;
  return (function(doc, tag, id) {
    var ref, sdk;
    if (doc.getElementById(id)) {
      return;
    }
    sdk = doc.createElement(tag);
    sdk.id = id;
    sdk.async = true;
    sdk.src = Socialmedia.SDK.twitter;
    ref = doc.getElementsByTagName(tag)[0];
    ref.parentNode.insertBefore(sdk, ref);
    _this.twttrsdk = doc.getElementById('#' + id);
  })(document, 'script', 'twitter-wjs');
};


/* Twitter share link method */

Socialmedia.Twitter.prototype.Tweet = function(options) {
  var data, intentShareUrl;
  intentShareUrl = '//twitter.com/intent/tweet?';
  data = (options != null) && options.tweet ? "text=" + (encodeURIComponent(options.tweet)) : "text=" + (encodeURIComponent(document.title)) + " ";
  data += (options != null) && options.hashtag ? "&hashtags=" + (encodeURIComponent(options.hashtag.replace('/#/', ''))) + " " : '';
  data += (options != null) && options.recommend ? "&related=" + (encodeURIComponent(options.recommend.replace('/@/', ''))) + " " : '';
  data += (options != null) && options.via ? "&via=" + (encodeURIComponent(options.via.replace('/@/', ''))) + " " : '';
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


/*
 * Twitter Mention method
 * Supports multiple recommendations separated by commas
 */

Socialmedia.Twitter.prototype.Mention = function(options) {
  var data, intentMentionUrl;
  intentMentionUrl = '//twitter.com/intent/tweet?';
  data = (options != null) && options.username && ("screen_name=" + (encodeURIComponent(options.username.replace(/@/, '')))) || '';
  data += (options != null) && options.recommend && ("&related=" + (encodeURIComponent(options.recommend.replace(/@/, '')))) || '';
  data += (options != null) && options.tweet && ("&text=" + (encodeURIComponent(options.tweet))) || '';
  return Socialmedia.Popup.apply(this, [intentMentionUrl + data]);
};


/*
 * Twitter Hashtag method
 * Supports multiple recommendations separated by commas
 */

Socialmedia.Twitter.prototype.Hashtag = function(options) {
  var data, intentHashtagUrl;
  intentHashtagUrl = '//twitter.com/intent/tweet?';
  data = (options != null) && options.hashtag && ("button_hashtag=" + (encodeURIComponent(options.hashtag.replace(/#/, '')))) || '';
  data += (options != null) && options.recommend && ("&related=" + (encodeURIComponent(options.recommend.replace(/@/, '')))) || '';
  data += (options != null) && options.tweet && ("&text=" + (encodeURIComponent(options.tweet))) || '';
  data += (options != null) && options.link && ("&url=" + (encodeURIComponent(options.link))) || '';
  return Socialmedia.Popup.apply(this, [intentHashtagUrl + data]);
};
