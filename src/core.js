!(function(root, doc) {
  "use strict";

  var appVersion = '2.0.0';
  var graphApiVersion = 'v2.5';
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

  var app = {
    public: {
      GRAPH_API_VERSION: graphApiVersion,
      VERSION: appVersion,
      SDK: sdkList
    }
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
        str = "width=" + this.width + ",height=" + this.height;
        str += ",left=" + ((root.outerWidth / 2) - (this.width / 2));
        str += ",top=" + ((root.outerHeight / 2) - (this.height / 2));
        return str += "," + (this.features.join(','));
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
    if (doc.getElementById(id)) return;

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

  /**
   * Expose helper methods
   */
  app.public.Popup = _makePopup;
  app.public.LoadSDK = _loadSDK;

  // Export to module / global
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = app.public;
  } else {
    root.Socialmedia = root.Socialmedia || app.public;
  }

})(window, document);