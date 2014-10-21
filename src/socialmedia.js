/*! socialmedia | v1.5.4 | Jabran Rafique <hello@jabran.me> | MIT License | https://github.com/jabranr/Socialmedia.js */
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
    version: "1.5.4",

    /* Setup SDK sources */
    SDK: {
      facebook: defaultProtocol + '//connect.facebook.net/en_US/all.js',
      facebook_debug: defaultProtocol + '//connect.facebook.net/en_US/all/debug.js',
      facebookv2: defaultProtocol + '//connect.facebook.net/en_US/sdk.js',
      facebook_debugv2: defaultProtocol + '//connect.facebook.net/en_US/sdk/debug.js',
      twitter: defaultProtocol + '//platform.twitter.com/widgets.js',
      googleplus: defaultProtocol + '//apis.google.com/js/platform.js',
      pinterest: defaultProtocol + '//assets.pinterest.com/js/pinit.js'
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
      throw new Error('Facebook app ID is required');
    }

    /* Throw error if app id is not a string */
    if (typeof settings.appid !== 'string') {
      throw new Error('Facebook app ID must be a string');
    }

    /* Setup default variables */
    this.appid = settings.appid;
    this.status = settings.status || false;
    this.channel = settings.channel || '';
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
    return (function(doc, tag, id) {
      var ref, sdk;
      if (doc.getElementById(id)) {
        return;
      }
      sdk = doc.createElement(tag);
      sdk.async = true;
      sdk.src = Socialmedia.SDK.googleplus;
      sdk.id = id;
      ref = doc.getElementsByTagName(tag)[0];
      ref.parentNode.insertBefore(sdk, ref);
      that.gpsdk = doc.getElementById(id);
    })(document, 'script', 'gplus-jssdk');
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
    return (function(doc, tag, id) {
      var ref, sdk;
      if (doc.getElementById(id)) {
        return;
      }
      sdk = doc.createElement(tag);
      sdk.id = id;
      sdk.async = true;
      sdk.src = Socialmedia.SDK.pinterest;
      ref = doc.getElementsByTagName(tag)[0];
      ref.parentNode.insertBefore(sdk, ref);
      that.pinsdk = doc.getElementById(id);
    })(document, 'script', 'pinterest-jssdk');
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
    return (function(doc, tag, id) {
      var ref, sdk;
      if (doc.getElementById(id)) {
        return;
      }
      sdk = doc.createElement(tag);
      sdk.id = id;
      sdk.async = true;
      sdk.src = Socialmedia.SDK.twitter;
      ref = doc.getElementsByTagName(tag)[0];
      ref.parentNode.insertBefore(sdk, ref);
      that.twttrsdk = doc.getElementById(id);
    })(document, 'script', 'twitter-wjs');
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
