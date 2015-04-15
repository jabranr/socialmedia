!(function(root, Socialmedia) {

  /* Twitter object */
  Socialmedia.Twitter = (function() {
    function Twitter() {
      this.init();
      return this;
    }


    /* Twitter init method */

    Twitter.prototype.init = function() {
      var that;
      that = this;
      return Socialmedia.LoadSDK('twitter-wjs', Socialmedia.SDK.twitter);
    };


    /* Twitter share link method */

    Twitter.prototype.Tweet = function(options) {
      var data, intentShareUrl;
      if (options == null) {
        options = {};
      }
      intentShareUrl = '//twitter.com/intent/tweet?';
      data = options.tweet ? "text=" + (encodeURIComponent(options.tweet)) : "text=" + (encodeURIComponent(document.title)) + " ";
      data += options.hashtag ? "&hashtags=" + (encodeURIComponent(options.hashtag.replace('/#/', ''))) + " " : '';
      data += options.recommend ? "&related=" + (encodeURIComponent(options.recommend.replace('/@/', ''))) + " " : '';
      data += options.via ? "&via=" + (encodeURIComponent(options.via.replace('/@/', ''))) + " " : '';
      data += options.link ? "&url=" + (encodeURIComponent(options.link)) + " " : "&url=" + (encodeURIComponent(root.location.href)) + " ";
      return Socialmedia.Popup.apply(this, [intentShareUrl + data]);
    };


    /* Twitter Follow method */

    Twitter.prototype.Follow = function(username) {
      var intentFollowUrl;
      if (username == null) {
        username = 'socialmedia_js';
      }
      username.replace(/@/, '');
      intentFollowUrl = '//twitter.com/intent/follow?';
      return Socialmedia.Popup.apply(this, [
        intentFollowUrl + ("screen_name=" + username), {
          width: 700,
          height: 485
        }
      ]);
    };


    /*
    		 * Twitter Mention method
    		 * Supports multiple recommendations separated by commas
     */

    Twitter.prototype.Mention = function(options) {
      var data, intentMentionUrl;
      if (options == null) {
        options = {};
      }
      intentMentionUrl = '//twitter.com/intent/tweet?';
      data = options.username && ("screen_name=" + (encodeURIComponent(options.username.replace(/@/, '')))) || '';
      data += options.recommend && ("&related=" + (encodeURIComponent(options.recommend.replace(/@/, '')))) || '';
      data += options.tweet && ("&text=" + (encodeURIComponent(options.tweet))) || '';
      return Socialmedia.Popup.apply(this, [intentMentionUrl + data]);
    };


    /*
    		 * Twitter Hashtag method
    		 * Supports multiple recommendations separated by commas
     */

    Twitter.prototype.Hashtag = function(options) {
      var data, intentHashtagUrl;
      if (options == null) {
        options = {};
      }
      intentHashtagUrl = '//twitter.com/intent/tweet?';
      data = options.hashtag && ("button_hashtag=" + (encodeURIComponent(options.hashtag.replace(/#/, '')))) || '';
      data += options.recommend && ("&related=" + (encodeURIComponent(options.recommend.replace(/@/, '')))) || '';
      data += options.tweet && ("&text=" + (encodeURIComponent(options.tweet))) || '';
      data += options.link && ("&url=" + (encodeURIComponent(options.link))) || '';
      return Socialmedia.Popup.apply(this, [intentHashtagUrl + data]);
    };

    return Twitter;

  })();
})(this, Socialmedia);
