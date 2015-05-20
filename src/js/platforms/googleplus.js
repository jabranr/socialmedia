!(function(root, Socialmedia) {

  /* Google+ object */
  Socialmedia.GooglePlus = (function() {
    function GooglePlus(settings) {
      if (settings == null) {
        settings = {};
      }
      this.clientid = settings.appid || null;
      this.cookiepolicy = settings.cookiepolicy || 'single_host_origin';
      this.callback = settings.callback || function() {};
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
      root.gplusCallback = function() {
        return root.gapi.auth.checkSessionState({
          clientid: that.clientid,
          session_state: null
        }, that.callback);
      };
      if (that.clientid) {
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
      if (root.gapi == null) {
        return false;
      }
      that = this;
      return root.gapi.auth.signIn({
        clientid: that.clientid,
        cookiepolicy: that.cookiepolicy,
        callback: callback
      });
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
})(this, Socialmedia);
