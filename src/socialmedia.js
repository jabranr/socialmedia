/**
 *
 * JavaScript library for Social media actions.
 *
 * @version: 0.9 beta
 * @author: hello@jabran.me
 * @url: http://github.com/jabranr
 * @website: http://jabran.me
 * @package: SocialMediaDotjs
 * 
 * @license: MIT License
 * 
 * Copyright (c) 2013 Jabran Rafique
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation 
 * files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, 
 * modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software
 * is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be 
 * included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR 
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE 
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */


// Setup the socialmedia.js facebook object
var facebook = {

	// Set the Facebook initialize status (FB.init) false
	fbinit: false,

	// Overriding init function to accept user provided settings / constructor
	init: function( settings )	{

		// Move the dynamically created "<div id=fb-root></div>" into body of document
		window.onload = function()	{
			var fbrootdiv = document.getElementById( 'fb-root' );
				document.body.appendChild( fbrootdiv );
		};

		// Setup Facebook init with user provided settings for appId and ChannelUrl
		if ( settings !== undefined )	{
			
			window.fbAsyncInit = function() {
				FB.init({
					'appId'					: settings.appid,
					'channelUrl'			: settings.channelurl,
					'status'				: false, // Intentionally set false to avoid the early calls to FB.getLoginStatus()
					'cookie'				: true,
					'xfbml'					: true,
					'frictionlessRequests'	: false // Intentionally set false to avoid the early calls to FB.getLoginStatus()
				});

				// Once Facebook completes initizialing, set our fbinit to true for trackback.
				facebook.fbinit = true;


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

				if ( typeof( settings.width ) !== undefined && typeof( settings.height ) !== undefined )
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

				if ( typeof( settings.autogrow !== undefined ) )
					FB.Canvas.setAutoGrow( settings.autogrow );
				else
					FB.Canvas.setAutoGrow();

				/**
				 * Setup Canvas scroll on page load. This works as replacement to the window.scrollTo method.
				 *
				 * Facebook Note:
				 * This method is only enabled when Canvas Height is set to "Settable (Default: 800px)" in the App Dashboard.
				 */

				if ( typeof( settings.x ) !== undefined && typeof( settings.y ) !== undefined )
					FB.Canvas.scrollTo( parseInt( settings.x ), parseInt( settings.y ));
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
				'title': options.title,
				'url': options.url,
				'image': options.image,
				'caption': options.caption,
				'description': options.description
			},	
				function( response )	{
					if ( response && response.post_id )
						return typeof( success ) === 'function' ? success() : false; // User provided callback functions in result of successful post to timeline
					else
						return typeof( fail ) === 'function' ? fail() : false; // User provided callback function in result of a dialog cancel or failure
				}
			);
		}
	},
	
	// Setup Facebook Invite dialog with user provided options and callback function
	invite: function( options, callback )	{

		if ( this.fbinit ) { // Making sure that Facebook API is ready
			FB.ui({
				'method': 'apprequests',
				'message': options.msg
			},
				function( response )	{
					if ( response && response.to )
						return typeof( callback ) === 'function' ? callback() : false;
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
			if ( typeof( options.tweet ) !== undefined ) 
				t = 'text=' + encodeURIComponent( options.tweet );
			if ( typeof( options.handler ) !== undefined ) 
				t = t + '&via=' + encodeURIComponent( options.handler );
			if ( typeof( options.url ) !== undefined ) 
				t = t + '&url=' + encodeURIComponent( options.url );
		}
		return window.open( i + t, '_blank' );
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

