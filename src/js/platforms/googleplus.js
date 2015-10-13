!(function(root, doc, factory) {

  /* Add to global object */
  root.Socialmedia.GooglePlus = factory(root, doc);
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory(root, doc);
  }
})(this, document, function(root, doc) {
  'use strict';

  /* Google+ object */
  var GooglePlus;
  GooglePlus = (function() {
    function GooglePlus(settings) {
      if (settings == null) {
        settings = {};
      }
      this.client_id = settings.appid || settings.client_id || null;
      this.cookiepolicy = settings.cookiepolicy || 'single_host_origin';
      this.scope = settings.scope || 'https://www.googleapis.com/auth/plus.login';
      this.callback = settings.callback || function() {};

      /* Throw error if client_id / appid is not a string */
      if (this.client_id !== null) {
        if (typeof this.client_id !== 'string') {
          throw new TypeError('Google client_id/appid must be a string');
        }
      }
      this.init();
      return this;
    }


    /* Google+ init method */

    GooglePlus.prototype.init = function() {
      var that;
      that = this;
      root.___gcfg = {
        lang: 'en-US',
        parsetags: 'onload'
      };
      root.gplusCallback = function(authResponse) {

        /* Throw error if client_id is not provided */
        if (that.client_id == null) {
          throw new TypeError('Google app/client ID is required');
        }
        return root.gapi.auth.authorize({
          client_id: that.client_id,
          scope: that.scope,
          immediate: true
        }, that.callback);
      };
      if (that.client_id) {
        return Socialmedia.LoadSDK('gplus-jssdk', Socialmedia.SDK.googleplus + '?onload=gplusCallback');
      } else {
        return Socialmedia.LoadSDK('gplus-jssdk', Socialmedia.SDK.googleplus);
      }
    };


    /* Sign in with Google */

    GooglePlus.prototype.SignIn = function(callback) {
      var that;
      if (callback == null) {
        callback = function() {};
      }
      if (!root.gapi || !this.client_id) {
        throw TypeError('Requires Client/App ID');
      }
      that = this;
      root.gapi.auth.authorize({
        client_id: that.client_id,
        scope: that.scope
      }, that.callback);
    };


    /* Google+ share method */

    GooglePlus.prototype.Share = function(options) {
      var data, platformUrl;
      if (options == null) {
        options = {};
      }
      platformUrl = '//plus.google.com/share?';
      data = (options.link != null) && ("url=" + (encodeURIComponent(options.link))) || ("url=" + (encodeURIComponent(root.location.href)));
      data += (options.lang != null) && ("&hl=" + (encodeURIComponent(options.lang))) || "&hl=en";
      return Socialmedia.Popup.apply(this, [platformUrl + data]);
    };

    return GooglePlus;

  })();
  return GooglePlus;
});
