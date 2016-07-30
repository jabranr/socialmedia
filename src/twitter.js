(function(root) {
  'use strict';

  if (typeof root.Socialmedia === 'undefined') {
    throw new Error('Core module not found.');
  }

  var doc = root.document;
  var app = root.Socialmedia;

  function Twitter() {
    this.init();
    return this;
  }

  Twitter.prototype.init = function() {
    return app.LoadSDK('twitter-wjs', app.SDK.twitter);
  };

  Twitter.prototype.Tweet = function(options) {
    var opts = options || {};
    var uri = '//twitter.com/intent/tweet?';
    var dataArr = [];

    dataArr.push('text=' + encodeURIComponent(opts.tweet || doc.title));
    dataArr.push('url=' + encodeURIComponent(opts.link || root.location.href));

    if (opts.hashtag) {
      var hashtag = opts.hashtag.replace('/#/',  '');
      dataArr.push('hashtag=' + encodeURIComponent(hashtag));
    }

    if (opts.recommend) {
      var recommend = opts.recommend.replace('/@/',  '');
      dataArr.push('related=' + encodeURIComponent(recommend));
    }

    if (opts.via) {
      var via = opts.via.replace('/@/',  '');
      dataArr.push('related=' + encodeURIComponent(via));
    }

    return app.Popup.apply(this, [uri + dataArr.join('&')]);
  };

  Twitter.prototype.Follow = function(username) {
    var uri = '//twitter.com/intent/follow?';
    var screen_name = username.replace('/@/', '') || 'socialmedia_js';
    var dialogSize = {
      width: 700,
      height: 485
    };

    return app.Popup.apply(this, [uri + ('screen_name=' + screen_name), dialogSize]);
  };

  Twitter.prototype.Mention = function(options) {
    var opts = options || {};
    var uri = '//twitter.com/intent/tweet?';
    var dataArr = [];

    dataArr.push('text=' + encodeURIComponent(opts.tweet || ''));

    if (opts.username) {
      var username = opts.username.replace('/@/',  '');
      dataArr.push('screen_name=' + encodeURIComponent(username));
    }

    if (opts.recommend) {
      var recommend = opts.recommend.replace('/@/',  '');
      dataArr.push('related=' + encodeURIComponent(recommend));
    }

    return app.Popup.apply(this, [uri + dataArr.join('&')]);
  };

  Twitter.prototype.Hashtag = function(options) {
    var opts = options || {};
    var uri = '//twitter.com/intent/tweet?';
    var dataArr = [];

    dataArr.push('button_hashtag=' + encodeURIComponent(opts.hashtag.replace('/@/', '')) || 'socialmedia_js');

    if (opts.recommend) {
      var recommend = opts.recommend.replace('/@/',  '');
      dataArr.push('related=' + encodeURIComponent(recommend));
    }

    if (opts.tweet) {
      dataArr.push('text=' + encodeURIComponent(opts.tweet));
    }

    if (opts.link) {
      dataArr.push('url=' + encodeURIComponent(opts.link));
    }

    return app.Popup.apply(this, [uri + dataArr.join('&')]);
  };


  // Export to module / global
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Twitter;
  } else {
    app.Twitter = app.Twitter || Twitter;
  }

  return app;

})(this);