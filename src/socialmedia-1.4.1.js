/*! socialmedia | v1.4.1 | Jabran Rafique | MIT | https://github.com/jabranr/socialmedia.js */
/* Global object with unique identifier */
var __mehfil;

window.Socialmedia = window.Socialmedia || {};

__mehfil = window.Socialmedia;

__mehfil.SDK = {
  facebook: '//connect.facebook.net/en_US/all.js',
  facebook_debug: '//connect.facebook.net/en_US/debug/all.js',
  twitter: '//platform.twitter.com/widgets.js'
};

__mehfil.Popup = function(url, settings) {
  var options;
  if (url == null) {
    url = 'about:blank';
  }
  if (settings == null) {
    settings = {};
  }
  options = {
    width: (settings.width != null) && settings.width || 600,
    height: (settings.height != null) && settings.height || 300,
    features: (settings.features != null) && settings.features || ['dialog', 'location', 'dependent'],
    getString: function() {
      var s;
      s = "width=" + this.width + ",height=" + this.height;
      s += ",left=" + ((window.outerWidth / 2) - (this.width / 2));
      s += ",top=" + ((window.outerHeight / 2) - (this.height / 2));
      return s += "," + (this.features.join(','));
    }
  };
  return window.open(url, '_w_' + new Date().getUTCMilliseconds(), options.getString());
};


/* Facebook object */
__mehfil.Facebook = function(settings) {
  this.appid = (settings.appid != null) && settings.appid || '';
  this.status = (settings.status != null) && settings.status || false;
  this.requests = (settings.requests != null) && settings.requests || false;
  this.debug = (settings.debug != null) && settings.debug || false;
  this.init();
};

__mehfil.Facebook.prototype.init = function() {
  var _this;
  _this = this;
  window.fbAsyncInit = function() {
    FB.init({
      appId: _this.appid,
      status: _this.status,
      cookie: true,
      xfbml: true,
      frictionlessRequests: _this.requests
    });

    /* Setup FB SDK script source */
    _this.fbsdk = document.querySelector('#facebook-jssdk');

    /* Append app_id to fbsdk source */
    _this.fbsdk.src += '#xfbml=1&appId=' + _this.appid;

    /* Setup FB ready status */
    return _this.sdkLoaded = true;
  };

  /* Move the auto-generated fb-root DOM element to appropriate position */
  if (typeof addEventListener !== "undefined" && addEventListener !== null) {
    window.addEventListener('load', function() {
      return document.body.appendChild(document.getElementById('fb-root'));
    });
  } else if (typeof attachEvent !== "undefined" && attachEvent !== null) {
    window.attachEvent('load', function() {
      return document.body.appendChild(document.getElementById('fb-root'));
    });
  }

  /* Load the Facebook JavaScript SDK */
  (function(d, debug) {
    var fbdiv, id, js, ref;
    id = 'facebook-jssdk';
    ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement('script');
    js.id = id;
    js.async = true;
    js.src = debug ? __mehfil.SDK.facebook_debug : __mehfil.SDK.facebook;
    fbdiv = d.createElement('div');
    fbdiv.id = 'fb-root';
    ref.parentNode.insertBefore(fbdiv, ref);
    return ref.parentNode.insertBefore(js, ref);
  })(document, _this.debug);
};


/* Facebook canvas setsize function */

__mehfil.Facebook.prototype.setSize = function(settings) {
  if ((settings != null) && settings.width || settings.height) {
    return FB.Canvas.setSize({
      width: parseInt(settings.width) || 810,
      height: parseInt(settings.height) || 800
    });
  } else {
    return FB.Canvas.setSize();
  }
};


/* Facebook canvas autogrow function */

__mehfil.Facebook.prototype.autogrow = function(settings) {
  if (settings == null) {
    settings = true;
  }
  return FB.Canvas.setAutoGrow(settings);
};


/* Facebook canvas scroll function */

__mehfil.Facebook.prototype.scroll = function(settings) {
  var x, y;
  x = (settings != null) && (settings.x != null) ? settings.x || 0 : void 0;
  y = (settings != null) && (settings.y != null) ? settings.y || 0 : void 0;
  if (x && y) {
    return FB.Canvas.scrollTo(x, y);
  } else {
    return false;
  }
};


/* Facebook share function */

__mehfil.Facebook.prototype.Share = function(options) {
  return FB.ui({
    method: 'feed',
    name: options && (options.title != null) && options.title || '',
    link: options && (options.url != null) && options.url || '',
    picture: options && (options.image != null) && options.image || '',
    caption: options && (options.caption != null) && options.caption || '',
    description: options && (options.description != null) && options.description || ''
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

__mehfil.Facebook.prototype.Invite = function(options) {
  return FB.ui({
    method: 'apprequests',
    title: options && (options.title != null) && options.title || '',
    message: options && (options.message != null) && options.message || '',
    to: options && (options.to != null) && options.to || [],
    exclude_ids: options && (options.exclude_ids != null) && options.exclude_ids || [],
    max_recipients: options && (options.max_to != null) && options.max_to || 100,
    data: options && (options.data != null) && options.data || {}
  }, function(response) {
    var _ref;
    if (response != null) {
      return (options.callback != null) && ((_ref = options.callback) != null ? _ref.call(this, response) : void 0);
    } else {
      return false;
    }
  });
};


/* Facebook add to page tab function */

__mehfil.Facebook.prototype.AddToPage = function() {
  return FB.ui({
    method: 'pagetab'
  }, function() {});
};


/* Facebook add friend function */

__mehfil.Facebook.prototype.AddFriend = function(options) {
  return FB.ui({
    method: 'friends',
    id: options && (options.id != null) && options.id || 'jabranr'
  }, function(response) {
    var _ref;
    if (response != null) {
      return (options.callback != null) && ((_ref = options.callback) != null ? _ref.call(this, response.action) : void 0);
    } else {
      return false;
    }
  });
};


/* Facebook send function */

__mehfil.Facebook.prototype.Send = function(options) {
  return FB.ui({
    method: 'send',
    link: (options != null) && (options.link != null) && options.link || window.location.href
  });
};


/* Facebook pay function */

__mehfil.Facebook.prototype.Pay = function(options) {
  return FB.ui({
    method: 'pay',
    action: 'purchaseitem',
    product: (options != null) && (options.link != null) && options.link || window.location.href
  }, function(data) {
    var _ref;
    if (data != null) {
      return (options != null) && ((_ref = options.callback) != null ? _ref.call(this, data) : void 0);
    } else {
      return false;
    }
  });
};


/* Twitter object */
__mehfil.Twitter = function() {
  this.init();
};


/* Twitter init method */

__mehfil.Twitter.prototype.init = function() {
  (function(a, b, c) {
    var d;
    d = a.getElementsByTagName(b)[0];
    a = a.createElement(b);
    a.id = c;
    a.src = __mehfil.SDK.twitter;
    return d.parentNode.insertBefore(a, d);
  })(document, 'script', 'twitter-wjs');
};


/* Twitter share link method */

__mehfil.Twitter.prototype.Tweet = function(options) {
  var data, intentShareUrl;
  if (options == null) {
    options = {};
  }
  intentShareUrl = '//twitter.com/intent/tweet?';
  data = (options.tweet != null) && "text=" + encodeURIComponent(options.tweet || '');
  data += (options.via != null) && "&via=" + encodeURIComponent(options.via || '');
  data += (options.link != null) && "&url=" + encodeURIComponent(options.link || encodeURIComponent(window.location.href));
  return __mehfil.Popup(intentShareUrl + data);
};


/* ref: https://about.twitter.com/resources/buttons#tweet */
