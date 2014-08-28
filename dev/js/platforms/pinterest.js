
/* Pinterest object */
Socialmedia.Pinterest = (function() {
  function Pinterest() {
    this.init();
    return;
  }


  /* Pinterest init method */

  Pinterest.prototype.init = function() {
    var that;
    that = this;
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
      that.pinsdk = doc.getElementById(id);
    })(document, 'script', 'pinterest-jssdk');
  };


  /* Pinterest share method */

  Pinterest.prototype.Pinit = function(options) {
    var data, platformUrl;
    if (options == null) {
      options = {};
    }
    platformUrl = '//pinterest.com/pin/create/button/?';
    data = (options.link != null) && ("url=" + (encodeURIComponent(options.link))) || ("url=" + (encodeURIComponent(window.location.href)));
    data += (options.image != null) && ("&media=" + (encodeURIComponent(options.image))) || "";
    data += (options.description != null) && ("&description=" + (encodeURIComponent(options.description))) || ("&description=" + (encodeURIComponent(document.title)));
    return Socialmedia.Popup.apply(this, [
      platformUrl + data, {
        width: 765,
        height: 325
      }
    ]);
  };

  return Pinterest;

})();
