/*! socialmedia | v2.0.1 | Jabran Rafique <hello@jabran.me> | MIT License |  */
(function(root) {
  'use strict';

  var doc = root.document;
  var appVersion = '2.0.1';
  var graphApiVersion = 'v2.7';
  var defaultProtocol = (root.location && root.location.protocol === 'https:' ? 'https:' : 'http:');
  var sdkList = {
    facebook: defaultProtocol + '//connect.facebook.net/en_US/all.js',
    facebook_debug: defaultProtocol + '//connect.facebook.net/en_US/all/debug.js',
    facebookv2: defaultProtocol + '//connect.facebook.net/en_US/sdk.js',
    facebook_debugv2: defaultProtocol + '//connect.facebook.net/en_US/sdk/debug.js',
    twitter: defaultProtocol + '//platform.twitter.com/widgets.js',
    googleplus: defaultProtocol + '//apis.google.com/js/client:platform.js',
    pinterest: defaultProtocol + '//assets.pinterest.com/js/pinit.js'
  };

  /**
   * Make a custom popup helper method
   */
  function _makePopup(uri, settings) {
    uri = uri || 'about:blank';
    settings = settings || {};

    var _options = {
      width: settings.width || 600,
      height: settings.height || 300,
      features: settings.features || ['dialog', 'location', 'dependent'],
      getFeatures: function() {
        var str;
        str = 'width=' + this.width + ',height=' + this.height;
        str += ',left=' + ((root.outerWidth / 2) - (this.width / 2));
        str += ',top=' + ((root.outerHeight / 2) - (this.height / 2));
        return str += ',' + (this.features.join(','));
      }
    };

    var _timestamp = (new Date()).getTime();
    var _popup = root.open(uri, '_jr_' + _timestamp, _options.getFeatures());

    if (_popup) {
      return _popup.focus();
    }
  }

  /**
   * Load SDK helper method
   */
  function _loadSDK(id, src) {
    var div, ref, sdk;
    if (doc.getElementById(id)) {
      return;
    }

    sdk = doc.createElement('script');
    sdk.id = id;
    sdk.async = true;
    sdk.defer = true;
    sdk.src = src;
    ref = doc.getElementsByTagName('script')[0];
    ref.parentNode.insertBefore(sdk, ref);

    if (id === 'facebook-jssdk' || 'gplus-jssdk') {
      div = doc.createElement('div');
      div.id = id === 'facebook-jssdk' ? 'fb-root' : 'gplus-root';
      ref.parentNode.insertBefore(div, ref);
    }
  }

  function _isType(obj, expectedType) {
    var getType;
    getType = Object.prototype.toString.call(obj).toLowerCase();
    expectedType = expectedType.toLowerCase();
    return getType === '[object ' + expectedType + ']';
  }

  /**
   * Expose helper methods
   */
  var app = {
    GRAPH_API_VERSION: graphApiVersion,
    VERSION: appVersion,
    SDK: sdkList,
    Popup: _makePopup,
    LoadSDK: _loadSDK,
    is: _isType
  };

  // Export to module / global
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = app;
  } else {
    root.Socialmedia = root.Socialmedia || app;
  }

})(this);
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

  // Export to module / global
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Facebook;
  } else {
    app.Facebook = app.Facebook || Facebook;
  }

  return app;

})(this);
(function(root) {
  'use strict';

  if (typeof root.Socialmedia === 'undefined') {
    throw new Error('Core module not found.');
  }

  var app = root.Socialmedia;

  function GooglePlus(options) {
    var opts = options || {};
    this.client_id = opts.appid || opts.client_id || null;
    this.cookiepolicy = opts.cookiepolicy || 'single_host_origin';
    this.scope = opts.scope || 'https://www.googleapis.com/auth/plus.login';
    this.callback = opts.callback || function() {};

    // Throw error if client_id is not a string
    if (this.client_id && typeof this.client_id !== 'string') {
      throw new TypeError('Google client_id/appid must be a string.');
    }

    this.init();
    return this;
  }

  GooglePlus.prototype.init = function() {
    var self = this;

    root.___gcfg = {
      lang: 'en-US',
      parsetags: 'onload'
    };

    root.gplusCallback = function(authResponse) {
      if (! self.client_id) {
        throw new TypeError('Google app/client ID is required.');
      }

      return root.gapi.auth.authorize({
        client_id: self.client_id,
        scope: self.scope,
        immediate: true
      }, self.callback.call(this, authResponse));
    };

    return app.LoadSDK('gplus-jssdk', app.SDK.googleplus + (self.client_id ? '?onload=gplusCallback' : ''));
  };

  GooglePlus.prototype.SignIn = function(callback) {
    var self = this;

    if (!root.gapi || !this.client_id) {
      throw new TypeError('Google client/app id is required.');
    }

    return root.gapi.auth.authorize({
      client_id: self.client_id,
      scope: self.scope
    }, callback);
  };

  GooglePlus.prototype.Share = function(options) {
    var opts = options || {};
    var uri = '//plus.google.com/share?';
    var dataArr = [];

    dataArr.push('url=' + encodeURIComponent(opts.link || root.location.href));
    dataArr.push('hl=' + encodeURIComponent(opts.lang || 'en'));

    return app.Popup.apply(this, [uri + dataArr.join('&')]);
  };

  // Export to module / global
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = GooglePlus;
  } else {
    app.GooglePlus = app.GooglePlus || GooglePlus;
  }

  return app;

})(this);
(function(root) {
  'use strict';

  if (typeof root.Socialmedia === 'undefined') {
    throw new Error('Core module not found.');
  }

  var doc = root.document;
  var app = root.Socialmedia;

  function Pinterest() {
    this.init();
    return this;
  }

  Pinterest.prototype.init = function() {
    return app.LoadSDK('pinterest-jssdk', app.SDK.pinterest);
  };

  Pinterest.prototype.Pinit = function(options) {
    var opts = options || {};
    var uri = '//pinterest.com/pin/create/button/?';
    var data = (typeof opts.link !== 'undefined') && ('url=' + (encodeURIComponent(opts.link))) || ('url=' + (encodeURIComponent(root.location.href)));
        data += (typeof opts.image !== 'undefined') && ('&media=' + (encodeURIComponent(opts.image))) || '';
        data += (typeof opts.description !== 'undefined') && ('&description=' + (encodeURIComponent(opts.description))) || ('&description=' + (encodeURIComponent(doc.title)));

    return app.Popup.apply(this, [
      uri + data, {
        width: 765,
        height: 325
      }
    ]);
  };

  // Export to module / global
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Pinterest;
  } else {
    app.Pinterest = app.Pinterest || Pinterest;
  }

  return app;

})(this);
(function(root) {
  'use strict';

  if (typeof root.Socialmedia === 'undefined') {
    throw new Error('Core module not found.');
  }

  var doc = root.document;
  var app = root.Socialmedia;

  function Twitter() {
    this.init();
    return this;
  }

  Twitter.prototype.init = function() {
    return app.LoadSDK('twitter-wjs', app.SDK.twitter);
  };

  Twitter.prototype.Tweet = function(options) {
    var opts = options || {};
    var uri = '//twitter.com/intent/tweet?';
    var dataArr = [];

    dataArr.push('text=' + encodeURIComponent(opts.tweet || doc.title));
    dataArr.push('url=' + encodeURIComponent(opts.link || root.location.href));

    if (opts.hashtag) {
      var hashtag = opts.hashtag.replace('/#/',  '');
      dataArr.push('hashtag=' + encodeURIComponent(hashtag));
    }

    if (opts.recommend) {
      var recommend = opts.recommend.replace('/@/',  '');
      dataArr.push('related=' + encodeURIComponent(recommend));
    }

    if (opts.via) {
      var via = opts.via.replace('/@/',  '');
      dataArr.push('related=' + encodeURIComponent(via));
    }

    return app.Popup.apply(this, [uri + dataArr.join('&')]);
  };

  Twitter.prototype.Follow = function(username) {
    var uri = '//twitter.com/intent/follow?';
    var screen_name = username.replace('/@/', '') || 'socialmedia_js';
    var dialogSize = {
      width: 700,
      height: 485
    };

    return app.Popup.apply(this, [uri + ('screen_name=' + screen_name), dialogSize]);
  };

  Twitter.prototype.Mention = function(options) {
    var opts = options || {};
    var uri = '//twitter.com/intent/tweet?';
    var dataArr = [];

    dataArr.push('text=' + encodeURIComponent(opts.tweet || ''));

    if (opts.username) {
      var username = opts.username.replace('/@/',  '');
      dataArr.push('screen_name=' + encodeURIComponent(username));
    }

    if (opts.recommend) {
      var recommend = opts.recommend.replace('/@/',  '');
      dataArr.push('related=' + encodeURIComponent(recommend));
    }

    return app.Popup.apply(this, [uri + dataArr.join('&')]);
  };

  Twitter.prototype.Hashtag = function(options) {
    var opts = options || {};
    var uri = '//twitter.com/intent/tweet?';
    var dataArr = [];

    dataArr.push('button_hashtag=' + encodeURIComponent(opts.hashtag.replace('/@/', '')) || 'socialmedia_js');

    if (opts.recommend) {
      var recommend = opts.recommend.replace('/@/',  '');
      dataArr.push('related=' + encodeURIComponent(recommend));
    }

    if (opts.tweet) {
      dataArr.push('text=' + encodeURIComponent(opts.tweet));
    }

    if (opts.link) {
      dataArr.push('url=' + encodeURIComponent(opts.link));
    }

    return app.Popup.apply(this, [uri + dataArr.join('&')]);
  };


  // Export to module / global
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Twitter;
  } else {
    app.Twitter = app.Twitter || Twitter;
  }

  return app;

})(this);