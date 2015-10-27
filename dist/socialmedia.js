/*! socialmedia | v1.7.8 | Jabran Rafique <hello@jabran.me> | MIT License | https://github.com/jabranr/Socialmedia.js */
!(function(root, doc, factory) {

  /* Setup Node.js, Common.js global */

  /* Setup browser global */
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory(root, doc);
  } else {
    root.Socialmedia = factory(root, doc);
  }
})(this, document, function(root, doc) {
  'use strict';

  /* Setup current or default protocol */
  var app, defaultProtocol, haveSocialmedia;
  defaultProtocol = root.location && root.location.protocol === 'https:' ? 'https:' : 'http:';

  /* Save the reference to previous owner */
  haveSocialmedia = root.Socialmedia;

  /* Locally scoped object literal */
  app = {

    /* noConflict to return the reference to previous owner */
    noConflict: function() {
      root.Socialmedia = haveSocialmedia;
      return this;
    },

    /* Current stable version. Keep it in sync with package.json */
    VERSION: "1.7.8",

    /* Current Facebook Graph API version. */
    GRAPH_API_VERSION: "v2.5",

    /* Setup SDK sources */
    SDK: {
      facebook: defaultProtocol + '//connect.facebook.net/en_US/all.js',
      facebook_debug: defaultProtocol + '//connect.facebook.net/en_US/all/debug.js',
      facebookv2: defaultProtocol + '//connect.facebook.net/en_US/sdk.js',
      facebook_debugv2: defaultProtocol + '//connect.facebook.net/en_US/sdk/debug.js',
      twitter: defaultProtocol + '//platform.twitter.com/widgets.js',
      googleplus: defaultProtocol + '//apis.google.com/js/client:platform.js',
      pinterest: defaultProtocol + '//assets.pinterest.com/js/pinit.js',
      parse_debug: defaultProtocol + '//www.parsecdn.com/js/parse-1.4.2.js',
      parse: defaultProtocol + '//www.parsecdn.com/js/parse-1.4.2.min.js'
    },

    /* Default popup method */
    Popup: function(url, settings) {
      var options, _popup;
      if (url == null) {
        url = 'about:blank';
      }
      if (settings == null) {
        settings = {};
      }
      options = {
        width: settings.width || 600,
        height: settings.height || 300,
        features: settings.features || ['dialog', 'location', 'dependent'],
        getFeatures: function() {
          var s;
          s = "width=" + this.width + ",height=" + this.height;
          s += ",left=" + ((root.outerWidth / 2) - (this.width / 2));
          s += ",top=" + ((root.outerHeight / 2) - (this.height / 2));
          return s += "," + (this.features.join(','));
        }
      };
      _popup = root.open(url, '_w_' + new Date().getUTCMilliseconds(), options.getFeatures());
      if (_popup) {
        return _popup.focus();
      }
    },

    /* Global method to load required SDK */
    LoadSDK: function(id, src) {
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
  };
  return app;
});

!(function(root, doc, factory) {

  /* Add to global object */
  root.Socialmedia.Facebook = factory(root, doc);
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory(root, doc);
  }
})(this, document, function(root, doc) {
  'use strict';

  /* Facebook object */
  var Facebook;
  Facebook = (function() {

    /* Constructor method */
    function Facebook(settings) {
      if (settings == null) {
        settings = {};
      }

      /* Throw error if app id is not provided */
      if (settings.appid == null) {
        throw new TypeError('Facebook app ID is required');
      }

      /* Throw error if app id is not a string */
      if (typeof settings.appid !== 'string') {
        throw new TypeError('Facebook app ID must be a string');
      }

      /* Setup default Parse options */
      this.parseId = settings.parseId || null;
      this.parseKey = settings.parseKey || null;
      this.parse = (this.parseId != null) && (this.parseKey != null);

      /* Setup default options */
      this.appid = settings.appid;
      this.locale = settings.locale || 'en_US';
      this.status = settings.status || false;
      this.channel = settings.channel || '';
      this.xfbml = settings.xfbml || !this.parse;
      this.cookie = settings.cookie || true;
      this.requests = settings.requests || false;
      this.version = settings.version || Socialmedia.GRAPH_API_VERSION;
      this.debug = settings.debug || false;
      this.autogrow = settings.autogrow || !this.parse;
      this.callback = settings.callback || function() {};

      /* Throw error if locale is not a string */
      if (typeof this.locale !== 'string') {
        throw new TypeError('Locale must be a ISO string i.e. en_US. More at https://developers.facebook.com/docs/plugins/like-button#language');
      }
      this.init();
      return this;
    }

    Facebook.prototype.init = function() {
      var src, that;
      that = this;

      /* Load Parse SDK if required and initialize Parse */
      if (that.parse) {
        if (typeof Parse === "undefined" || Parse === null) {
          throw new Error('Parse not found');
        } else {
          Parse.initialize(that.parseId, that.parseKey);
        }
      }
      root.fbAsyncInit = function() {
        var opts;
        opts = {
          appId: that.appid,
          status: that.status,
          channelUrl: that.channel,
          cookie: that.cookie,
          xfbml: that.xfbml,
          version: that.version,
          frictionlessRequests: that.requests
        };
        if (that.parse && (typeof Parse !== "undefined" && Parse !== null)) {
          Parse.FacebookUtils.init(opts);
        } else {
          FB.init(opts);
        }

        /* Setup FB SDK script source */
        that.fbsdk = doc.getElementById('facebook-js, docsdk');

        /* Append app_id to fbsdk source */
        if ((that.fbsdk != null) && !that.parse) {
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
        root.addEventListener('load', function() {
          doc.body.appendChild(doc.getElementById('fb-root'));
        });
      } else if (typeof attachEvent !== "undefined" && attachEvent !== null) {
        root.attachEvent('onload', function() {
          doc.body.appendChild(doc.getElementById('fb-root'));
        });
      }

      /* Load the Facebook JavaScript SDK */
      if (that.debug) {
        if (that.version === 'v1.0') {
          src = Socialmedia.SDK.facebook_debug.replace('en_US', that.locale);
        } else {
          src = Socialmedia.SDK.facebook_debugv2.replace('en_US', that.locale);
        }
      } else {
        if (that.version === 'v1.0') {
          src = Socialmedia.SDK.facebook.replace('en_US', that.locale);
        } else {
          src = Socialmedia.SDK.facebookv2.replace('en_US', that.locale);
        }
      }

      /* Load Facebook SDK */
      return Socialmedia.LoadSDK('facebook-jssdk', src);
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
      var that, _base;
      this.shareOptions = shareOptions != null ? shareOptions : {};

      /*
      			 * Default options
      			 *
      			 * method: 'share'
      			 * href: Absolute URL
      			 * callback: Function
       */
      this.shareOptions.method = 'share';
      if ((_base = this.shareOptions).callback == null) {
        _base.callback = function(response) {};
      }
      if (this.shareOptions.href == null) {
        throw new TypeError('href attribute is missing');
      }
      that = this;
      return FB.ui(this.shareOptions, function(response) {
        var _ref;
        if (response != null) {
          return (_ref = that.shareOptions.callback) != null ? _ref.call(this, response) : void 0;
        }
      });
    };


    /* Facebook share_open_graph function */

    Facebook.prototype.ShareOpenGraph = function(shareOptions) {
      var that, _base;
      this.shareOptions = shareOptions != null ? shareOptions : {};

      /*
      			 * Default options
      			 *
      			 * method: 'share_open_graph'
      			 * action_type: String Open Graph action type e.g. og.likes
      			 * action_properties: Object key/value pair. e.g. object: {URL}
      			 * callback: Function
       */
      if (this.shareOptions.action_type == null) {
        throw new TypeError('Open Graph action type is missing');
      }
      if (this.shareOptions.action_properties == null) {
        throw new TypeError('Open Graph action properties is missing');
      }
      this.shareOptions.method = 'share_open_graph';
      if ((_base = this.shareOptions).callback == null) {
        _base.callback = function(response) {};
      }
      this.shareOptions.action_properties = JSON.stringify(this.shareOptions.action_properties);
      that = this;
      return FB.ui(this.shareOptions, function(response) {
        var _ref;
        if (response != null) {
          return (_ref = that.shareOptions.callback) != null ? _ref.call(this, response) : void 0;
        }
      });
    };


    /* Facebook share function (Legacy support) */

    Facebook.prototype.Feed = function(shareOptions) {
      var that, _base;
      this.shareOptions = shareOptions != null ? shareOptions : {};

      /*
      			 * Default options
      			 *
      			 * method: 'feed'
      			 * name: String (Title)
      			 * link: Absolute URL
      			 * picture: Absolute URL
      			 * caption: String
      			 * description: String
      			 * callback: Function
       */
      if (this.shareOptions.name == null) {
        throw new TypeError('name attribute is missing');
      }
      if (this.shareOptions.link == null) {
        throw new TypeError('link attribute is missing');
      }
      this.shareOptions.method = 'feed';
      if ((_base = this.shareOptions).callback == null) {
        _base.callback = function(response) {};
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
      			 * title: String (Title)
      			 * message: String
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
  return Facebook;
});

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

!(function(root, doc, factory) {

  /* Add to global object */
  root.Socialmedia.Twitter = factory(root, doc);
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory(root, doc);
  }
})(this, document, function(root, doc) {
  'use strict';

  /* Twitter object */
  var Twitter;
  Twitter = (function() {
    function Twitter() {
      this.init();
      return this;
    }


    /* Twitter init method */

    Twitter.prototype.init = function() {
      var that;
      that = this;
      return Socialmedia.LoadSDK('twitter-wjs', Socialmedia.SDK.twitter);
    };


    /* Twitter share link method */

    Twitter.prototype.Tweet = function(options) {
      var data, intentShareUrl;
      if (options == null) {
        options = {};
      }
      intentShareUrl = '//twitter.com/intent/tweet?';
      data = options.tweet ? "text=" + (encodeURIComponent(options.tweet)) : "text=" + (encodeURIComponent(doc.title)) + " ";
      data += options.hashtag ? "&hashtags=" + (encodeURIComponent(options.hashtag.replace('/#/', ''))) + " " : '';
      data += options.recommend ? "&related=" + (encodeURIComponent(options.recommend.replace('/@/', ''))) + " " : '';
      data += options.via ? "&via=" + (encodeURIComponent(options.via.replace('/@/', ''))) + " " : '';
      data += options.link ? "&url=" + (encodeURIComponent(options.link)) + " " : "&url=" + (encodeURIComponent(root.location.href)) + " ";
      return Socialmedia.Popup.apply(this, [intentShareUrl + data]);
    };


    /* Twitter Follow method */

    Twitter.prototype.Follow = function(username) {
      var intentFollowUrl;
      if (username == null) {
        username = 'socialmedia_js';
      }
      username.replace(/@/, '');
      intentFollowUrl = '//twitter.com/intent/follow?';
      return Socialmedia.Popup.apply(this, [
        intentFollowUrl + ("screen_name=" + username), {
          width: 700,
          height: 485
        }
      ]);
    };


    /*
    		 * Twitter Mention method
    		 * Supports multiple recommendations separated by commas
     */

    Twitter.prototype.Mention = function(options) {
      var data, intentMentionUrl;
      if (options == null) {
        options = {};
      }
      intentMentionUrl = '//twitter.com/intent/tweet?';
      data = options.username && ("screen_name=" + (encodeURIComponent(options.username.replace(/@/, '')))) || '';
      data += options.recommend && ("&related=" + (encodeURIComponent(options.recommend.replace(/@/, '')))) || '';
      data += options.tweet && ("&text=" + (encodeURIComponent(options.tweet))) || '';
      return Socialmedia.Popup.apply(this, [intentMentionUrl + data]);
    };


    /*
    		 * Twitter Hashtag method
    		 * Supports multiple recommendations separated by commas
     */

    Twitter.prototype.Hashtag = function(options) {
      var data, intentHashtagUrl;
      if (options == null) {
        options = {};
      }
      intentHashtagUrl = '//twitter.com/intent/tweet?';
      data = options.hashtag && ("button_hashtag=" + (encodeURIComponent(options.hashtag.replace(/#/, '')))) || '';
      data += options.recommend && ("&related=" + (encodeURIComponent(options.recommend.replace(/@/, '')))) || '';
      data += options.tweet && ("&text=" + (encodeURIComponent(options.tweet))) || '';
      data += options.link && ("&url=" + (encodeURIComponent(options.link))) || '';
      return Socialmedia.Popup.apply(this, [intentHashtagUrl + data]);
    };

    return Twitter;

  })();
  return Twitter;
});
