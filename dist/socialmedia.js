/*! socialmedia | v1.7.6 | Jabran Rafique <hello@jabran.me> | MIT License | https://github.com/jabranr/Socialmedia.js */
!(function(root, factory) {

  /* Setup modular support */
  if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
    define(['Socialmedia'], factory);
  } else if (typeof module !== 'undefined' && typeof exports === 'object') {
    module.exports = factory;
  } else {
    if (window.Socialmedia == null) {
      window.Socialmedia = factory;
    }
  }
})(this, (function() {
  'use strict';

  /* Array indexOf support for IE8- */
  var Socialmedia, defaultProtocol;
  if (typeof Array.prototype.indexOf === "undefined") {
    Array.prototype.indexOf = function(item) {
      var i;
      i = 0;
      while (i < this.length) {
        if (this[i] === item) {
          return i;
        }
        i++;
      }
      return -1;
    };
  }

  /* Setup current or default protocol */
  defaultProtocol = window.location.protocol === 'file:' ? 'http:' : window.location.protocol;

  /* Global object with unique identifier */
  Socialmedia = {

    /* Version */
    version: "1.8.6",

    /* Setup SDK sources */
    SDK: {
      facebook: defaultProtocol + '//connect.facebook.net/en_US/all.js',
      facebook_debug: defaultProtocol + '//connect.facebook.net/en_US/all/debug.js',
      facebookv2: defaultProtocol + '//connect.facebook.net/en_US/sdk.js',
      facebook_debugv2: defaultProtocol + '//connect.facebook.net/en_US/sdk/debug.js',
      twitter: defaultProtocol + '//platform.twitter.com/widgets.js',
      googleplus: defaultProtocol + '//apis.google.com/js/platform.js',
      pinterest: defaultProtocol + '//assets.pinterest.com/js/pinit.js',
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
          s += ",left=" + ((window.outerWidth / 2) - (this.width / 2));
          s += ",top=" + ((window.outerHeight / 2) - (this.height / 2));
          return s += "," + (this.features.join(','));
        }
      };
      _popup = window.open(url, '_w_' + new Date().getUTCMilliseconds(), options.getFeatures());
      if (_popup) {
        return _popup.focus();
      }
    },

    /* Global method to load required SDK */
    LoadSDK: function(id, src) {
      var div, ref, sdk;
      if (document.getElementById(id)) {
        return;
      }
      sdk = document.createElement('script');
      sdk.id = id;
      sdk.async = true;
      sdk.src = src;
      ref = document.getElementsByTagName('script')[0];
      ref.parentNode.insertBefore(sdk, ref);
      if (id === 'facebook-jssdk') {
        div = document.createElement('div');
        div.id = 'fb-root';
        ref.parentNode.insertBefore(div, ref);
      }
    }
  };
  return Socialmedia;
})());


/* Global init method */


/* Facebook object */
Socialmedia.Facebook = (function() {

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

    /* Setup default variables */
    this.appid = settings.appid;
    this.status = settings.status || false;
    this.channel = settings.channel || '';
    this.xfbml = settings.xfbml || true;
    this.cookie = settings.cookie || true;
    this.requests = settings.requests || false;
    this.version = settings.version || 'v2.3';
    this.debug = settings.debug || false;
    this.autogrow = settings.autogrow || true;
    this.callback = settings.callback || function() {};

    /* Support Parse */
    this.parseId = settings.parseId || null;
    this.parseKey = settings.parseKey || null;
    this.parse = this.parseId && this.parseKey;
    this.init();
    return this;
  }

  Facebook.prototype.init = function() {
    var src, that;
    that = this;

    /* Load Parse SDK if required and initialize Parse */
    if (that.parse) {
      Parse.initialize(that.parseId, that.parseKey);
    }
    window.fbAsyncInit = function() {
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
    if (that.debug) {
      if (that.version === 'v1.0') {
        src = Socialmedia.SDK.facebook_debug;
      } else {
        src = Socialmedia.SDK.facebook_debugv2;
      }
    } else {
      if (that.version === 'v1.0') {
        src = Socialmedia.SDK.facebook;
      } else {
        src = Socialmedia.SDK.facebookv2;
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


/* Twitter object */
Socialmedia.Twitter = (function() {
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
    data = options.tweet ? "text=" + (encodeURIComponent(options.tweet)) : "text=" + (encodeURIComponent(document.title)) + " ";
    data += options.hashtag ? "&hashtags=" + (encodeURIComponent(options.hashtag.replace('/#/', ''))) + " " : '';
    data += options.recommend ? "&related=" + (encodeURIComponent(options.recommend.replace('/@/', ''))) + " " : '';
    data += options.via ? "&via=" + (encodeURIComponent(options.via.replace('/@/', ''))) + " " : '';
    data += options.link ? "&url=" + (encodeURIComponent(options.link)) + " " : "&url=" + (encodeURIComponent(window.location.href)) + " ";
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
