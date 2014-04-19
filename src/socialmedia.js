/**!
 * SocialMedia.js - Javascript library to embed socialmedia functions in a web app
 * @author: Jabran Rafique
 * @version: 1.4.1
 * @license: MIT License
 */

// Global object
window.Socialmedia  = window.Socialmedia || {};

// Facebook object
Socialmedia.Facebook = function( settings ) {
	this.appid = settings && settings.appid;
	this.status = settings && settings.status || false;
	this.frictionlessRequests = settings && settings.frictionlessRequests || false; 
	return this.init(); 
};

// Twitter object
Socialmedia.Twitter = function( settings ) { 
	return this.init(); 
};

// GooglePlus object
Socialmedia.GooglePlus = function( settings ) { 
	return this.init(); 
};

// Instagram object
Socialmedia.Instagram = function( settings ) { 
	return this.init(); 
};

// YouTube object
Socialmedia.YouTube = function( settings ) { 
	return this.init(); 
};

// Github object
Socialmedia.Github = function( settings ) { 
	return this.init(); 
};


/* ! 
 * Facebook functions 
 */

// Facebook init function
Socialmedia.Facebook.prototype.init = function() {

	var _this = this;

	// Call to Facebook init function
	window.fbAsyncInit = function() {
		FB.init({
			'appId'  : _this.appid,
			'status' : _this.status,
			'cookie' : true,
			'xfbml'  : true,
			'frictionlessRequests' : _this.frictionlessRequests
		});
		
		// Setup FB SDK script source
		_this.fbsdk = document.getElementById('facebook-jssdk');

		// Append app_id to fbsdk source
		_this.fbsdk.src += '#xfbml=1&appid=' + _this.appid;

		// Setup FB ready status
		_this.sdkLoaded = _this.fbinit = true;
	}

	// Move the auto-generated fb-root DOM element to appropriate position
	window.addEventListener('load', function()	{
		document.body.appendChild( document.getElementById('fb-root') );
	});

	// Load the Facebook JavaScript SDK
	(function(d, debug)	{
		var fbdiv, js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
		if (d.getElementById(id)) {return;}
			js = d.createElement('script'); js.id = id; js.async = true;
			js.src = "//connect.facebook.net/en_US/all" + (debug ? "/debug" : "") + ".js";
			fbdiv = d.createElement('div');
			fbdiv.id = 'fb-root';
			ref.parentNode.insertBefore(fbdiv, ref);
			ref.parentNode.insertBefore(js, ref);
	}(document, false));
};

// Facebook canvas setsize function
Socialmedia.Facebook.prototype.setSize = function( settings )	{
	if ( settings && (typeof(settings) !== 'undefined') && (settings.width || settings.height) ) {
		return FB.Canvas.setSize({
			width: parseInt( settings.width ) || 810,
			height: parseInt( settings.height ) || 800
		});
	}
	else {
		return FB.Canvas.setSize();
	}
};

// Facebook canvas autogrow function
Socialmedia.Facebook.prototype.autogrow = function( settings ) {
	return ( settings && typeof(settings) !== 'undefined' ) ?
			FB.Canvas.setAutoGrow( settings ) :
				FB.Canvas.setAutoGrow();
};

// Facebook canvas scroll function
Socialmedia.Facebook.prototype.scroll = function( settings ) {
	if ( settings && typeof(settings.x) !== 'undefined' &&  typeof(settings.y) !== 'undefined' )
		return FB.Canvas.scrollTo( parseInt(settings.x) || 0, parseInt(settings.y) || 0 );
	return false;
};

// Facebook share function
Socialmedia.Facebook.prototype.Share = function( options ) {
	return FB.ui({
		'method': 'feed',
		'name': options && options.title || '',
		'link': options && options.url || '',
		'picture': options && options.image || '',
		'caption': options && options.caption || '',
		'description': options && options.description || ''
	}, function( response )	{
		return ( response && response.post_id ) ?
			(options.onSuccess && typeof( options.onSuccess ) === "function" ? options.onSuccess.call(this, response) : false) :
				(options.onFail && typeof( options.onFail ) === "function" ? options.onFail.call(this) : false);
	});
};

// Facebook invite function
Socialmedia.Facebook.prototype.Invite = function( options ) {
	return FB.ui({
		'method': 'apprequests',
		'title': options && options.title || '',
		'message': options && options.msg || '',
		'to': options && options.to || [],
		'exclude_ids': options && options.exclude_ids || [],
		'max_recipients': options && options.max_to || 100,
		'data': options && options.data || {}
	}, function( response )	{
		return ( response && response.to ) ?
			(options.callback && typeof( options.callback ) === "function" ? options.callback.call(this, response) : false) :
				false;
	});
};

// Facebook add to page tab function
Socialmedia.Facebook.prototype.AddToPage = function() {
	return FB.ui({
	  method: 'pagetab'
	}, function(response){ });
};

// Facebook add friend function
Socialmedia.Facebook.prototype.AddFriend = function( friend_id, callback ) {
	return FB.ui({
	  method: 'friends',
	  id: (typeof(id) !== 'undefined') && friend_id || 'jabranr'
	}, function(response){
		return (callback && typeof(callback) === 'function') ? callback.call(this, response.action === true) : false; 
	});
};

// Facebook send function
Socialmedia.Facebook.prototype.Send = function( options ) {
	return FB.ui({
	  method: 'send',
	  link: options && typeof(options.link) !== 'undefined' && options.link || 'https://github.com/jabranr/socialmedia.js'
	});
};



/**
 * Twitter functions
 */

Socialmedia.Twitter.init = function(options) {}
