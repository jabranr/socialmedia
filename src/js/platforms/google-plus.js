
/* Google+ object */
Socialmedia.GooglePlus = (function() {
  function GooglePlus() {
    this.init();
    return this;
  }


  /* Google+ init method */

  GooglePlus.prototype.init = function() {
    var that;
    that = this;
    return Socialmedia.LoadSDK('gplus-jssdk', Socialmedia.SDK.googleplus);
  };


  /* Google+ share method */

  GooglePlus.prototype.Share = function(options) {
    var data, platformUrl;
    if (options == null) {
      options = {};
    }
    platformUrl = '//plus.google.com/share?';
    data = (options.link != null) && ("url=" + (encodeURIComponent(options.link))) || ("url=" + (encodeURIComponent(window.location.href)));
    data += (options.lang != null) && ("&hl=" + (encodeURIComponent(options.lang))) || "&hl=en";
    return Socialmedia.Popup.apply(this, [platformUrl + data]);
  };

  return GooglePlus;

})();
