
/*!
 * Javascript library to embed socialmedia functions in a web app
 */

/*
Global object
 */
window.Socialmedia = window.Socialmedia || {};


/*
Default function obejcts
Facebook
 */

Socialmedia.Facebook = function(settings) {
  this.appid = settings.appid || null;
  this.status = settings.status || false;
  this.requests = settings.requests || false;
  this.init();
};

Socialmedia.Facebook.prototype.init = function() {
  var _this;
  _this = this;
  window.fbAsyncInit = function() {
    FB.init({
      appId: this.appid,
      status: this.status,
      cookie: true,
      xfbml: true,
      frictionlessRequests: this.requests
    });

    /*
    		Setup FB SDK script source
     */
    _this.fbsdk = document.querySelector('#facebook-jssdk');

    /*
    		Append app_id to fbsdk source
     */
    _this.fbsdk.src += '#xfbml=1&appid=' + _this.appid;

    /*
    		Setup FB ready status
     */
    return _this.sdkLoaded = true;
  };

  /*
  	Move the auto-generated fb-root DOM element to appropriate position
   */
  if (typeof addEventListener !== "undefined" && addEventListener !== null) {
    window.addEventListener('load', function() {
      return document.body.appendChild(document.getElementById('fb-root'));
    });
  } else if (typeof attachEvent !== "undefined" && attachEvent !== null) {
    window.attachEvent('load', function() {
      return document.body.appendChild(document.getElementById('fb-root'));
    });
  }

  /*
  	Load the Facebook JavaScript SDK
   */
  (function(d, debug) {
    var fbdiv, id, js, ref;
    id = 'facebook-jssdk';
    ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement('script');
    js.id = id;
    js.async = true;
    js.src = '//connect.facebook.net/en_US/all' + (debug ? '/debug' : '') + '.js';
    fbdiv = d.createElement('div');
    fbdiv.id = 'fb-root';
    ref.parentNode.insertBefore(fbdiv, ref);
    return ref.parentNode.insertBefore(js, ref);
  })(document, false);
};
