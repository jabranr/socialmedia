
/* Google+ object */
Socialmedia.GooglePlus = function() {
  this.init();
};


/* Google+ init method */

Socialmedia.GooglePlus.prototype.init = function() {
  var _this;
  _this = this;
  return (function(doc, tag, id) {
    var ref, sdk;
    if (doc.getElementById(id)) {
      return;
    }
    sdk = doc.createElement(tag);
    sdk.async = true;
    sdk.src = Socialmedia.SDK.googleplus;
    sdk.id = id;
    ref = doc.getElementsByTagName(tag)[0];
    ref.parentNode.insertBefore(sdk, ref);
    _this.gpsdk = doc.getElementById('#' + id);
  })(document, 'script', 'gplus-jssdk');
};


/* Google+ share method */

Socialmedia.GooglePlus.prototype.Share = function(options) {
  var data, platformUrl;
  if (options == null) {
    options = {};
  }
  platformUrl = '//plus.google.com/share?';
  data = (options.link != null) && ("url=" + (encodeURIComponent(options.link))) || ("url=" + (encodeURIComponent(window.location.href)));
  data += (options.lang != null) && ("&hl=" + (encodeURIComponent(options.lang))) || "&hl=en";
  return Socialmedia.Popup.apply(this, [platformUrl + data]);
};
