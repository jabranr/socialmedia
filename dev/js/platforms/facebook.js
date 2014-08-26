
/* Facebook object */
Socialmedia.Facebook = (function() {

  /* Constructor method */
  function Facebook(settings) {
    if (settings == null) {
      settings = {};
    }

    /* Fulfil crucial app id requirements */
    if (settings.appid == null) {
      throw new Error('Facebook app ID is required');
    }

    /* Setup default variables */
    this.appid = settings.appid;
    this.status = settings.status || false;
    this.xfbml = settings.xfbml || true;
    this.cookie = settings.cookie || true;
    this.requests = settings.requests || false;
    this.version = settings.version || 'v2.1';
    this.debug = settings.debug || false;
    this.autogrow = settings.autogrow || true;
    this.callback = settings.callback || function() {};
    this.init();
    return;
  }

  Facebook.prototype.init = function() {
    var that;
    that = this;
    window.fbAsyncInit = function() {
      FB.init({
        appId: that.appid,
        status: that.status,
        cookie: that.cookie,
        xfbml: that.xfbml,
        version: that.version,
        frictionlessRequests: that.requests
      });

      /* Setup FB SDK script source */
      that.fbsdk = document.getElementById('#facebook-jssdk');

      /* Append app_id to fbsdk source */
      if (that.fbsdk != null) {
        that.fbsdk.src += '#xfbml=1&appId=' + that.appid;
      }

      /* Facebook canvas autogrow function */
      FB.Canvas.setAutoGrow(that.autogrow);

      /* Async callback function */
      if (that.callback != null) {
        FB.getLoginStatus(that.callback);
      }
    };

    /* Move the auto-generated fb-root DOM element to appropriate position */
    if (typeof addEventListener !== "undefined" && addEventListener !== null) {
      window.addEventListener('load', function() {
        document.body.appendChild(document.getElementById('fb-root'));
      });
    } else if (typeof attachEvent !== "undefined" && attachEvent !== null) {
      window.attachEvent('onload', function() {
        document.body.appendChild(document.getElementById('fb-root'));
      });
    }

    /* Load the Facebook JavaScript SDK */
    return (function(doc, dev, tag, id, ver) {
      var fbdiv, ref, sdk;
      if (doc.getElementById(id)) {
        return;
      }
      sdk = doc.createElement(tag);
      sdk.id = id;
      sdk.async = true;
      if (dev) {
        if (ver === 'v1.0') {
          sdk.src = Socialmedia.SDK.facebook_debug;
        } else {
          sdk.src = Socialmedia.SDK.facebook_debugv2;
        }
      } else {
        if (ver === 'v1.0') {
          sdk.src = Socialmedia.SDK.facebook;
        } else {
          sdk.src = Socialmedia.SDK.facebookv2;
        }
      }
      fbdiv = doc.createElement('div');
      fbdiv.id = 'fb-root';
      ref = doc.getElementsByTagName(tag)[0];
      ref.parentNode.insertBefore(fbdiv, ref);
      ref.parentNode.insertBefore(sdk, ref);
    })(document, that.debug, 'script', 'facebook-jssdk', that.version);
  };


  /* Facebook canvas setsize function */

  Facebook.prototype.setSize = function(settings) {
    if (settings == null) {
      settings = {};
    }
    if ((settings.width != null) || (settings.height != null)) {
      return FB.Canvas.setSize({
        width: parseInt(settings.width) || 810,
        height: parseInt(settings.height) || 800
      });
    } else {
      return FB.Canvas.setSize();
    }
  };


  /* Facebook canvas scroll function */

  Facebook.prototype.scroll = function(settings) {
    var x, y;
    if (settings == null) {
      settings = {};
    }
    x = settings.x || 0;
    y = settings.y || 0;
    if (x && y) {
      return FB.Canvas.scrollTo(x, y);
    }
  };


  /* Facebook share function */

  Facebook.prototype.Share = function(options) {
    if (options == null) {
      options = {};
    }
    return FB.ui({
      method: 'feed',
      name: options.title || '',
      link: options.link || '',
      picture: options.image || '',
      caption: options.caption || '',
      description: options.description || ''
    }, function(response) {
      var _ref, _ref1;
      if (response != null) {
        if (options.onSuccess != null) {
          return (_ref = options.onSuccess) != null ? _ref.call(this, response) : void 0;
        } else if (options.onFail != null) {
          return (_ref1 = options.onFail) != null ? _ref1.call(this, response) : void 0;
        }
      } else {
        return false;
      }
    });
  };


  /* Facebook invite function */

  Facebook.prototype.Invite = function(options) {
    if (options == null) {
      options = {};
    }
    return FB.ui({
      method: 'apprequests',
      title: options.title || '',
      message: options.message || '',
      to: options.to || [],
      exclude_ids: options.exclude_ids || [],
      max_recipients: options.max_to || 100,
      data: options.data || {}
    }, function(response) {
      var _ref;
      if (response != null) {
        return (_ref = options.callback) != null ? _ref.call(this, response) : void 0;
      } else {
        return false;
      }
    });
  };


  /* Facebook add to page tab function */

  Facebook.prototype.AddToPage = function() {
    return FB.ui({
      method: 'pagetab'
    }, function() {});
  };


  /* Facebook add friend function */

  Facebook.prototype.AddFriend = function(options) {
    if (options == null) {
      options = {};
    }
    return FB.ui({
      method: 'friends',
      id: options.id || 'jabranr'
    }, function(response) {
      var _ref;
      if (response != null) {
        return (_ref = options.callback) != null ? _ref.call(this, response.action) : void 0;
      } else {
        return false;
      }
    });
  };


  /* Facebook send function */

  Facebook.prototype.Send = function(options) {
    if (options == null) {
      options = {};
    }
    return FB.ui({
      method: 'send',
      link: options.link || window.location.href
    });
  };


  /* Facebook pay function */

  Facebook.prototype.Pay = function(options) {
    if (options == null) {
      options = {};
    }
    return FB.ui({
      method: 'pay',
      action: 'purchaseitem',
      product: options.link || window.location.href
    }, function(data) {
      var _ref;
      if (data != null) {
        return (options != null) && ((_ref = options.callback) != null ? _ref.call(this, data) : void 0);
      } else {
        return false;
      }
    });
  };

  return Facebook;

})();
