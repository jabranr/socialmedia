
/* Google+ object */
Socialmedia.GooglePlus = function() {
  this.init();
};


/* Google+ init method */

Socialmedia.GooglePlus.prototype.init = function() {
  var po, s;
  po = document.createElement('script');
  po.type = 'text/javascript';
  po.async = true;
  po.src = '//apis.google.com/js/platform.js';
  s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(po, s);
};


/* Google+ share method */

Socialmedia.GooglePlus.prototype.Share = function(options) {
  var data, platformUrl;
  platformUrl = '//plus.google.com/share?';
  data = (options != null) && (options.link != null) && ("url=" + (encodeURIComponent(options.link))) || ("url=" + (encodeURIComponent(window.location.href)));
  data += (options != null) && (options.lang != null) && ("&hl=" + (encodeURIComponent(options.lang))) || "&hl=en";
  return Socialmedia.Popup.apply(this, [platformUrl + data]);
};
