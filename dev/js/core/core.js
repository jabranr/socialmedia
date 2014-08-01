!(function(root, factory) {

  /* Setup modular support */
  var Socialmedia;
  Socialmedia = function() {
    return factory();
  };
  if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
    define(function() {
      'use strict';
      return factory();
    });
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory;
  } else {
    window.Socialmedia = factory;
  }
})(this, function() {
  'use strict';

  /* Global object with unique identifier */
  var Socialmedia;
  Socialmedia = {};

  /* Setup SDK sources */
  Socialmedia.SDK = {
    facebook: '//connect.facebook.net/en_US/all.js',
    facebook_debug: '//connect.facebook.net/en_US/all/debug.js',
    facebookv2: '//connect.facebook.net/en_US/sdk.js',
    facebook_debugv2: '//connect.facebook.net/en_US/sdk/debug.js',
    twitter: '//platform.twitter.com/widgets.js',
    googleplus: '//apis.google.com/js/platform.js',
    pinterest: '//assets.pinterest.com/js/pinit.js'
  };

  /* Default popup method */
  Socialmedia.Popup = function(url, settings) {
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
  };
  return Socialmedia;
});


/* Global init method */
