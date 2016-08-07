(function(root) {
  'use strict';

  if (typeof root.Socialmedia === 'undefined') {
    throw new Error('Core module not found.');
  }

  var doc = root.document;
  var app = root.Socialmedia;

  function _fbCallback(options) {
    if (!app.is(root.FB, 'object')) {
      throw new Error('Facebook SDK not ready yet.');
    }

    if (!options.callback) {
      return root.FB.ui(options);
    }

    var callback = options.callback;
    delete options.callback;
    return root.FB.ui(options, callback);
  }

  function _repositionFBRoot() {
    doc.body.appendChild(doc.getElementById('fb-root'));
  }

  function Facebook(options) {
    var opts = options || {};

    this.appid      =   opts.appid || null;
    this.locale     =   opts.locale || 'en_US';
    this.status     =   typeof opts.status !== 'undefined' ? opts.status : false;
    this.channel    =   opts.channel || '';
    this.xfbml      =   typeof opts.xfbml !== 'undefined' ? opts.xfbml : true;
    this.cookie     =   typeof opts.cookie !== 'undefined' ? opts.cookie : true;
    this.requests   =   typeof opts.requests !== 'undefined' ? opts.requests : false;
    this.version    =   opts.version || app.GRAPH_API_VERSION;
    this.debug      =   typeof opts.debug !== 'undefined' ? opts.debug : false;
    this.autogrow   =   typeof opts.autogrow !== 'undefined' ? opts.autogrow : true;
    this.callback   =   opts.callback || function() {};

    if (!this.appid) {
      throw new TypeError('Facebook app ID is required.');
    }

    if (this.appid && !app.is(this.appid, 'string')) {
      throw new TypeError('Facebook app ID must be a string.');
    }

    if (!app.is(this.locale, 'string')) {
      throw new TypeError('Locale must be an ISO string i.e. en_US. More at https://developers.facebook.com/docs/plugins/like-button#language');
    }

    this.init();
    return this;
  }

  Facebook.prototype.init = function() {
    var self = this;
    var src;

    root.fbAsyncInit = function() {
      if (!app.is(root.FB, 'object')) {
        throw new Error('Facebook SDK not ready yet.');
      }

      root.FB.init({
        appId: self.appid,
        status: self.status,
        channelUrl: self.channel,
        cookie: self.cookie,
        xfbml: self.xfbml,
        version: self.version,
        frictionlessRequests: self.requests
      });

      self.fbsdk = doc.getElementById('facebook-js');

      if (self.fbsdk !== null) {
        self.fbsdk.src += ('#xfbml=1&appId' + self.appid);
      }

      root.FB.Canvas.setAutoGrow(self.autogrow);

      if (self.callback && app.is(self.callback, 'function')) {
        root.FB.getLoginStatus(self.callback);
      }
    };

    if (root.addEventListener) {
      root.addEventListener('load', _repositionFBRoot);
    } else if (root.attachEvent) {
      root.attachEvent('onload', _repositionFBRoot);
    }

    if (self.locale !== 'en_US') {
      app.SDK.facebook_debug = app.SDK.facebook_debug.replace('en_US', self.locale);
      app.SDK.facebook_debugv2 = app.SDK.facebook_debugv2.replace('en_US', self.locale);
      app.SDK.facebook = app.SDK.facebook.replace('en_US', self.locale);
      app.SDK.facebookv2 = app.SDK.facebookv2.replace('en_US', self.locale);
    }

    if (self.debug) {
      if (self.version === 'v1.0') {
        src = app.SDK.facebook_debug;
      } else {
        src = app.SDK.facebook_debugv2;
      }
    } else {
      if (self.version === 'v1.0') {
        src = app.SDK.facebook;
      } else {
        src = app.SDK.facebookv2;
      }
    }

    return app.LoadSDK('fb-jssdk', src);
  };

  Facebook.prototype.setSize = function() {
    if (arguments.length > 0 && arguments.length < 3) {
      return root.FB.Canvas.setSize({
        width: parseInt(arguments[0]) || 810,
        height: parseInt(arguments[1]) || 800
      });
    } else {
      return root.FB.Canvas.setSize();
    }
  };

  Facebook.prototype.scroll = function() {
    if (arguments.length > 0 && arguments.length < 3) {
      var x = parseInt(arguments[0]) || 0;
      var y = parseInt(arguments[1]) || 1;

      return root.FB.Canvas.scrollTo(x, y);
    } else {
      return root.FB.Canvas.scrollTo();
    }
  };

  Facebook.prototype.Share = function(options) {
    var opts = options || {};
    opts.method = 'share';

    if (!app.is(opts.callback, 'function')) {
      opts.callback = function() {};
    }

    if (!opts.href || !app.is(opts.href, 'string')) {
      throw new TypeError('href option is required.');
    }

    return _fbCallback(opts);
  };

  Facebook.prototype.ShareOpenGraph = function(options) {
    var opts = options || {};
    opts.method = 'share_open_graph';

    if (!app.is(opts.callback, 'function')) {
      opts.callback = function() {};
    }

    if (!opts.action_type || !app.is(opts.action_type, 'string')) {
      throw new TypeError('action_type option is required.');
    }

    if (opts.action_properties) {
     if (!app.is(opts.action_properties, 'object')) {
        throw new TypeError('action_properties must be an object.');
      }

      opts.action_properties = JSON.stringify(opts.action_properties);
    }

    return _fbCallback(opts);
  };

  Facebook.prototype.Feed = function(options) {
    var opts = options || {};
    opts.method = 'feed';

    if (!app.is(opts.callback, 'function')) {
      opts.callback = function() {};
    }

    if (!opts.name || !app.is(opts.name, 'string')) {
      throw new TypeError('name option is required.');
    }

    if (!opts.link || !app.is(opts.link, 'string')) {
      throw new TypeError('link option is required.');
    }

    return _fbCallback(opts);
  };

  Facebook.prototype.Invite = function(options) {
    var opts = options || {};
    opts.method = 'apprequests';

    if (!app.is(opts.callback, 'function')) {
      opts.callback = function() {};
    }

    if (!opts.title || !app.is(opts.title, 'string')) {
      throw new TypeError('title option is required.');
    }

    if (opts.message && !app.is(opts.message, 'string')) {
      throw new TypeError('message option must be a string.');
    }

    if (opts.to && !app.is(opts.to, 'array')) {
      throw new TypeError('to option must be an array.');
    }

    if (opts.exclude_ids && !app.is(opts.exclude_ids, 'array')) {
      throw new TypeError('exclude_ids option must be an array.');
    }

    if (opts.max_recipients && !app.is(opts.max_recipients, 'number')) {
      throw new TypeError('max_recipients option must be an integer.');
    }

    if (opts.data && !app.is(opts.data, 'object')) {
      throw new TypeError('data option must be an integer.');
    }

    return _fbCallback(opts);
  };

  Facebook.prototype.AddToPage = function() {
    return _fbCallback({
      method: 'pagetab'
    }, function() {});
  };

  /**
   * @deprecated Facebook method. Only use for v2.4 and less SDK
   * @todo remove method in next Facebook version upgrade
   */
  Facebook.prototype.AddFriend = function(options) {
    var opts = options || {};
    opts.method = 'friends';

    if (!app.is(opts.callback, 'function')) {
      opts.callback = function() {};
    }

    return _fbCallback(opts);
  };

  Facebook.prototype.Send = function(options) {
    var opts = options || {};
    opts.method = 'send';

    if (!opts.link || !app.is(opts.link, 'string')) {
      throw new TypeError('link option is required.');
    }

    return _fbCallback(opts);
  };

  Facebook.prototype.Pay = function(options) {
    var opts = options || {};
    opts.method = 'pay';
    opts.action = 'purchaseitem';

    if (!app.is(opts.callback, 'function')) {
      opts.callback = function() {};
    }

    if (!opts.product || !app.is(opts.product, 'string')) {
      throw new TypeError('product option is required.');
    }

    return _fbCallback(opts);
  };

  /**
   * @since v2.0.2
   */
  Facebook.prototype.GoLive = function(options) {
    var opts = options || {};
    var userCallback = opts.callback;

    if (!app.is(userCallback, 'function')) {
      userCallback = function() {};
    }

    opts.display = 'popup';
    opts.method = 'live_broadcast';
    opts.phase = 'create';
    opts.callback = function(response) {
      if (!response.id) {
        return;
      }

      return _fbCallback({
        display: 'popup',
        method: 'live_broadcast',
        phase: 'publish',
        broadcast_data: response,
        callback: userCallback
      });
    };

    return _fbCallback(opts);
  };

  // Export to module / global
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Facebook;
  } else {
    app.Facebook = app.Facebook || Facebook;
  }

  return app;

})(this);