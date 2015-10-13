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
    VERSION: "1.7.7",

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
