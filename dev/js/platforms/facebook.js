
/* Facebook object */
Socialmedia.Facebook = (function() {

  /* Constructor method */
  function Facebook(settings) {
    if (settings == null) {
      settings = {};
    }

    /* Throw error if app id is not provided */
    if (settings.appid == null) {
      throw new Error('Facebook app ID is required');
    }

    /* Throw error if app id is not a string */
    if (typeof settings.appid !== 'string') {
      throw new Error('Facebook app ID must be a string');
    }

    /* Setup default variables */
    this.appid = settings.appid;
    this.status = settings.status || false;
    this.channel = settings.channel || document.location.href;
    this.xfbml = settings.xfbml || true;
    this.cookie = settings.cookie || true;
    this.requests = settings.requests || false;
    this.version = settings.version || 'v2.1';
    this.debug = settings.debug || false;
    this.autogrow = settings.autogrow || true;
    this.callback = settings.callback || function() {};
    this.init();
    return this;
  }

  Facebook.prototype.init = function() {
    var that;
    that = this;
    window.fbAsyncInit = function() {
      FB.init({
        appId: that.appid,
        status: that.status,
        channelUrl: that.channel,
        cookie: that.cookie,
        xfbml: that.xfbml,
        version: that.version,
        frictionlessRequests: that.requests
      });

      /* Setup FB SDK script source */
      that.fbsdk = document.getElementById('facebook-jssdk');

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

  Facebook.prototype.Share = function(shareOptions) {
    var that, _base, _base1, _base2;
    this.shareOptions = shareOptions != null ? shareOptions : {};

    /*
    		 * Default options
    		 *
    		 * method: 'feed'
    		 * name: Text (Title)
    		 * link: Absolute URL
    		 * picture: Absolute URL
    		 * caption: Text
    		 * description: Text
    		 * callback: Function
     */
    this.shareOptions.method = 'feed';
    if ((_base = this.shareOptions).callback == null) {
      _base.callback = function(response) {};
    }

    /* Legacy support */
    if (shareOptions && (shareOptions.title != null)) {
      if ((_base1 = this.shareOptions).name == null) {
        _base1.name = shareOptions && shareOptions.title;
      }
    }
    if (shareOptions && (shareOptions.image != null)) {
      if ((_base2 = this.shareOptions).picture == null) {
        _base2.picture = shareOptions && shareOptions.image;
      }
    }
    that = this;
    return FB.ui(this.shareOptions, function(response) {
      var _ref;
      if (response != null) {
        return (_ref = that.shareOptions.callback) != null ? _ref.call(this, response) : void 0;
      }
    });
  };


  /* Facebook invite function */

  Facebook.prototype.Invite = function(inviteOptions) {
    var that;
    this.inviteOptions = inviteOptions != null ? inviteOptions : {};

    /*
    		 * Default options
    		 *
    		 * method: 'apprequests'
    		 * title: Text (Title)
    		 * message: Text
    		 * to: Array
    		 * exclude_ids: Array
    		 * max_recipients: Number
    		 * data: Object
    		 * callback: Function
     */
    this.inviteOptions.method = 'apprequests';
    that = this;
    return FB.ui(this.inviteOptions, function(response) {
      var _ref;
      if (response != null) {
        return (_ref = that.inviteOptions.callback) != null ? _ref.call(this, response) : void 0;
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

  Facebook.prototype.AddFriend = function(friendOptions) {
    var that;
    this.friendOptions = friendOptions != null ? friendOptions : {};

    /*
    		 * Default options
    		 *
    		 * method: 'friends'
    		 * id: Facebook ID or username
    		 * callback: Function
     */
    this.friendOptions.method = 'friends';
    that = this;
    return FB.ui(this.friendOptions, function(response) {
      var _ref;
      if (response != null) {
        return (_ref = that.friendOptions.callback) != null ? _ref.call(this, response) : void 0;
      }
    });
  };


  /* Facebook send function */

  Facebook.prototype.Send = function(sendOptions) {
    this.sendOptions = sendOptions != null ? sendOptions : {};

    /*
    		 * Default options
    		 *
    		 * method: 'send'
    		 * link: Absolute URL
     */
    this.sendOptions.method = 'send';
    return FB.ui(this.sendOptions);
  };


  /* Facebook pay function */

  Facebook.prototype.Pay = function(payOptions) {
    var that;
    this.payOptions = payOptions != null ? payOptions : {};

    /*
    		 * Default options
    		 *
    		 * method: 'pay'
    		 * action: 'purchaseitem'
    		 * product: Absolute URL
    		 * callback: Function
     */
    this.payOptions.method = 'pay';
    this.payOptions.action = 'purchaseitem';
    that = this;
    return FB.ui(this.payOptions, function(data) {
      var _ref;
      if (data != null) {
        return (that.payOptions != null) && ((_ref = payOptions.callback) != null ? _ref.call(this, data) : void 0);
      }
    });
  };

  return Facebook;

})();
