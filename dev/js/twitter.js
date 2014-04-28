
/* Twitter object */
__mehfil.Twitter = function() {
  this.init();
};


/* Twitter init method */

__mehfil.Twitter.prototype.init = function() {
  (function(a, b, c) {
    var d;
    d = a.getElementsByTagName(b)[0];
    a = a.createElement(b);
    a.id = c;
    a.src = __mehfil.SDK.twitter;
    return d.parentNode.insertBefore(a, d);
  })(document, 'script', 'twitter-wjs');
};


/* Twitter share link method */

__mehfil.Twitter.prototype.Tweet = function(options) {
  var data, intentShareUrl;
  if (options == null) {
    options = {};
  }
  intentShareUrl = '//twitter.com/intent/tweet?';
  data = (options.tweet != null) && "text=" + encodeURIComponent(options.tweet || '');
  data += (options.via != null) && "&via=" + encodeURIComponent(options.via || '');
  data += (options.link != null) && "&url=" + encodeURIComponent(options.link || encodeURIComponent(window.location.href));
  return __mehfil.Popup(intentShareUrl + data);
};


/* ref: https://about.twitter.com/resources/buttons#tweet */
