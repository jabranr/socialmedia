(function(root) {
  'use strict';

  if (typeof root.Socialmedia === 'undefined') {
    throw new Error('Core module not found.');
  }

  var app = root.Socialmedia;

  function GooglePlus(options) {
    var opts = options || {};
    this.client_id = opts.appid || opts.client_id || null;
    this.cookiepolicy = opts.cookiepolicy || 'single_host_origin';
    this.scope = opts.scope || 'https://www.googleapis.com/auth/plus.login';
    this.callback = opts.callback || function() {};

    // Throw error if client_id is not a string
    if (this.client_id && typeof this.client_id !== 'string') {
      throw new TypeError('Google client_id/appid must be a string.');
    }

    this.init();
    return this;
  }

  GooglePlus.prototype.init = function() {
    var self = this;

    root.___gcfg = {
      lang: 'en-US',
      parsetags: 'onload'
    };

    root.gplusCallback = function(authResponse) {
      if (! self.client_id) {
        throw new TypeError('Google app/client ID is required.');
      }

      return root.gapi.auth.authorize({
        client_id: self.client_id,
        scope: self.scope,
        immediate: true
      }, self.callback.call(this, authResponse));
    };

    return app.LoadSDK('gplus-jssdk', app.SDK.googleplus + (self.client_id ? '?onload=gplusCallback' : ''));
  };

  GooglePlus.prototype.SignIn = function(callback) {
    var self = this;

    if (!root.gapi || !this.client_id) {
      throw new TypeError('Google client/app id is required.');
    }

    return root.gapi.auth.authorize({
      client_id: self.client_id,
      scope: self.scope
    }, callback);
  };

  GooglePlus.prototype.Share = function(options) {
    var opts = options || {};
    var uri = '//plus.google.com/share?';
    var dataArr = [];

    dataArr.push('url=' + encodeURIComponent(opts.link || root.location.href));
    dataArr.push('hl=' + encodeURIComponent(opts.lang || 'en'));

    return app.Popup.apply(this, [uri + dataArr.join('&')]);
  };

  // Export to module / global
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = GooglePlus;
  } else {
    app.GooglePlus = app.GooglePlus || GooglePlus;
  }

  return app;

})(window);