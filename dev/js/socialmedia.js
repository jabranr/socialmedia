
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
