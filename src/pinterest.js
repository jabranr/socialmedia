(function(root) {
  'use strict';

  if (typeof root.Socialmedia === 'undefined') {
    throw new Error('Core module not found.');
  }

  var doc = root.document;
  var app = root.Socialmedia;

  function Pinterest() {
    this.init();
    return this;
  }

  Pinterest.prototype.init = function() {
    return app.LoadSDK('pinterest-jssdk', app.SDK.pinterest);
  };

  Pinterest.prototype.Pinit = function(options) {
    var opts = options || {};
    var uri = '//pinterest.com/pin/create/button/?';
    var data = (typeof opts.link !== 'undefined') && ('url=' + (encodeURIComponent(opts.link))) || ('url=' + (encodeURIComponent(root.location.href)));
        data += (typeof opts.image !== 'undefined') && ('&media=' + (encodeURIComponent(opts.image))) || '';
        data += (typeof opts.description !== 'undefined') && ('&description=' + (encodeURIComponent(opts.description))) || ('&description=' + (encodeURIComponent(doc.title)));

    return app.Popup.apply(this, [
      uri + data, {
        width: 765,
        height: 325
      }
    ]);
  };

  // Export to module / global
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Pinterest;
  } else {
    app.Pinterest = app.Pinterest || Pinterest;
  }

  return app;

})(this);