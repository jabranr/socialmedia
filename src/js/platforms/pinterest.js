!(function(root, doc, factory) {

  /* Add to global object */
  root.Socialmedia.Pinterest = factory(root, doc);
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory(root, doc);
  }
})(this, document, function(root, doc) {
  'use strict';

  /* Pinterest object */
  var Pinterest;
  Pinterest = (function() {
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
      data = (options.link != null) && ("url=" + (encodeURIComponent(options.link))) || ("url=" + (encodeURIComponent(root.location.href)));
      data += (options.image != null) && ("&media=" + (encodeURIComponent(options.image))) || "";
      data += (options.description != null) && ("&description=" + (encodeURIComponent(options.description))) || ("&description=" + (encodeURIComponent(doc.title)));
      return Socialmedia.Popup.apply(this, [
        platformUrl + data, {
          width: 765,
          height: 325
        }
      ]);
    };

    return Pinterest;

  })();
  return Pinterest;
});
