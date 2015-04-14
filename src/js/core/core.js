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
