
/* Pinterest object */
Socialmedia.Pinterest = function() {
  return this.init();
};


/* Pinterest init method */

Socialmedia.Pinterest.prototype.init = function() {
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
    sdk.src = Socialmedia.SDK.pinterest;
    ref = doc.getElementsByTagName(tag)[0];
    ref.parentNode.insertBefore(sdk, ref);
    _this.pinsdk = doc.getElementById('#' + id);
  })(document, 'script', 'pinterest-jssdk');
};


/* Pinterest share method */

Socialmedia.Pinterest.prototype.Pinit = function(options) {
  var data, platformUrl;
  platformUrl = '//pinterest.com/pin/create/button/?';
  data = (options.link != null) && ("url=" + (encodeURIComponent(options.link))) || ("url=" + (encodeURIComponent(window.location.href)));
  data += (options.image != null) && ("media=" + (encodeURIComponent(options.image))) || "";
  data += (options.description != null) && ("description=" + (encodeURIComponent(options.description))) || ("description=" + (encodeURIComponent(document.title)));
  return Socialmedia.Popup.apply(this, [
    platformUrl + data, {
      width: 765,
      height: 325
    }
  ]);
};
