
/* Global object with unique identifier */
window.Socialmedia = window.Socialmedia || {};

Socialmedia.SDK = {
  facebook: '//connect.facebook.net/en_US/all.js',
  facebook_debug: '//connect.facebook.net/en_US/debug/all.js',
  twitter: '//platform.twitter.com/widgets.js',
  googleplus: '//apis.google.com/js/platform.js'
};

Socialmedia.Popup = function(url, settings) {
  var options, _popup;
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
  _popup = window.open(url, '_w_' + new Date().getUTCMilliseconds(), options.getString());
  return _popup.focus();
};
