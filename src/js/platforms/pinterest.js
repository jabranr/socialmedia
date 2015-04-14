
/* Pinterest object */
Socialmedia.Pinterest = (function() {
  function Pinterest() {
    this.init();
    return this;
  }


  /* Pinterest init method */

  Pinterest.prototype.init = function() {
    var that;
    that = this;
    return Socialmedia.LoadSDK('pinterest-jssdk', Socialmedia.SDK.pinterest);
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
