/**
 * @description: JavaScript library for Social media actions.
 * @version: 1.4
 * @author: hello@jabran.me
 * @package: SocialMediaDotjs
 */


// Setup the socialmedia.js facebook object
var	facebook = {

	// Set the Facebook initialize status (FB.init) false
	fbinit: false,

	// Overriding init function to accept user provided settings / constructor
	init: function( settings, callback )	{

		// Move the dynamically created "<div id=fb-root></div>" into body of document
		window.onload = function()	{
			var fbrootdiv = document.getElementById( 'fb-root' );
				document.body.appendChild( fbrootdiv );
		};

		// Setup Facebook init with user provided settings for appId and ChannelUrl
		if ( typeof(settings) !== "undefined" )	{
			
			window.fbAsyncInit = function() {
				FB.init({
					'appId' : settings.appid,
					'channelUrl' : settings.channelurl,
					'status' : settings.status || false, // Intentionally set false to avoid the early calls to FB.getLoginStatus()
					'cookie' : true,
					'xfbml'	: true,
					'frictionlessRequests' : settings.flrequests || false // Intentionally set false to avoid the early calls to FB.getLoginStatus()
				});

				// Once Facebook completes initizialing, set our fbinit to true for trackback.
				facebook.fbinit = true;

				// Update the Facecbook SDK URL with application id
				var js = document.getElementById('facebook-jssdk');
				js.src += '#xfbml=1&appid=' + settings.appid;

				// Setup Canvas options based on user provided settings
				
				/**
				 * Setup Canvas size on page load based upon user provided width and height in facebook.init() options.
				 * If width and height are not set by user then defaults are enabled to let resizing work best according to contents.
				 *
				 * Facebook Notes:
				 * This method is only enabled when Canvas Height is set to "Fluid" in the App Dashboard.
				 * When determining the Canvas Height automatically the height it can only be increased, not decreased. 
				 * When possible please pass the explicit dimensions as properties of an object
				 */

				if ( typeof( settings.width ) !== "undefined" && typeof( settings.height ) !== "undefined" )
					FB.Canvas.setSize({
						width: parseInt( settings.width ),
						height: parseInt( settings.height )
					});
				else
					FB.Canvas.setSize();
				
				/**
				 * Setup Canvas AutoGrow on page load according to length of contents. This can be used in relevance with CSS overflow property
				 * as set to hidden to disable the inner scrollbars for canvas frame. Default is true and other available options are false and 
				 * interval in integer format.
				 * 
				 * Facebook Note:
				 * This method is only enabled when Canvas Height is set to "Fixed at (800)px" in the App Dashboard.
				 */

				if ( typeof( settings.autogrow !== "undefined" ) )
					FB.Canvas.setAutoGrow( settings.autogrow );
				else
					FB.Canvas.setAutoGrow();

				/**
				 * Setup Canvas scroll on page load. This works as replacement to the window.scrollTo method.
				 *
				 * Facebook Note:
				 * This method is only enabled when Canvas Height is set to "Settable (Default: 800px)" in the App Dashboard.
				 */

				if ( typeof( settings.x ) !== "undefined" && typeof( settings.y ) !== "undefined" )
					FB.Canvas.scrollTo( parseInt( settings.x ), parseInt( settings.y ));

				// Run user defined callback function or return FB object
				if (callback && typeof(callback) === 'function')
					callback.call(this, window.FB);
			};
		}
		else 	{
			this.fbinit = true;
		}
	},

	// Setup Facebook Share dialog with user provided options as well as success and failed callback functions
	share: function( options, success, fail )	{

		if ( this.fbinit )	{ // Making sure that Facebook API is ready
			FB.ui({
				'method': 'feed',
				'name': options.title,
				'link': options.url,
				'picture': options.image,
				'caption': options.caption,
				'description': options.description
			},	
				function( response )	{
					if ( response && response.post_id )
						return typeof( success ) === "function" ? success.call(this, response) : false; // User provided callback functions in result of successful post to timeline
					else
						return typeof( fail ) === "function" ? fail.call(this) : false; // User provided callback function in result of a dialog cancel or failure
				}
			);
		}
	},
	
	// Setup Facebook Invite dialog with user provided options and callback function
	invite: function( options, callback )	{

		if ( this.fbinit ) { // Making sure that Facebook API is ready
			FB.ui({
				'method': 'apprequests',
				'title': options.title,
				'message': options.msg,
				'to': options.to,
				'exclude_ids': options.exclude_ids,
				'max_recipients': options.max_to,
				'data': options.data
			},
				function( response )	{
					if ( response && response.to )
						return typeof( callback ) === "function" ? callback.call(this, response) : false;
					return false;
				}
			);
		}
	}

},

twitter = {
	
	tweet: function( options )	{

		if ( options )	{
			var t, i = '//twitter.com/intent/tweet?';
			if ( typeof( options.tweet ) !== "undefined" ) 
				t = 'text=' + encodeURIComponent( options.tweet );
			if ( typeof( options.handler ) !== "undefined" ) 
				t = t + '&via=' + encodeURIComponent( options.handler );
			if ( typeof( options.url ) !== "undefined" ) 
				t = t + '&url=' + encodeURIComponent( options.url );
		}
		return window.open( i + t, '_blank' );
	}
	
},

gplus = {
	plus: function( options )	{

		if ( options )	{
			var gp, u = '//plus.google.com/share';
			if ( typeof( options.url ) !== "undefined" )	{
				gp = u + '?url=' + encodeURIComponent( options.url );
			}
		}
		return window.open( gp, '_blank' );
	}
};

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
