/**
 * JavaScript Document
 *
 * JavaScript template for Social media actions.
 *
 * @version: 0.0.1
 * @author: hello@jabran.me
 * @url: http://github.com/jabranr
 * @website: http://jabran.me
 * @package: Making life easier!
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
 *
 *
 */

var facebook = {
	
	init: function( app_id )	{
	
		window.fbAsyncInit = function() {
			FB.init({
				'appId'     : app_id,
				'channelUrl' : '',
				'status'     : true,
				'cookie'    : true,
				'xfbml'     : true,
				'frictionlessRequests' : true
			});
		};
	},
	
	share: function(name_, link_, picture_, caption_, description_)	{
		
		var n = name_ == '' ? '' : n,
			l = link_ == '' ? '' : l,
			p = picture_ == '' ? '' : p,
			c = caption_ == '' ? '' : c,
			d = description_ == '' ? '' : d;
		
		FB.ui({
			'method': 'feed',
			'name': n,
			'link': l,
			'picture': p,
			'caption': c,
			'description': d
		},
			function(response)	{
				if (response && response.post_id)	{
					// Post successful
				}
				else	{
					// Post unsuccessful
				}
			}
		);
	},
	
	invite: function(msg)	{
		FB.ui({
			'method': 'apprequests',
			'message': msg
		},
			function(response)	{
				// Response handler			
			}
		);
	}

},

twitter = {
	
	tweet: function(msg, handler, url)	{
		var m = msg == '' ? '' : 'text=' + msg,
			v = handler == '' ? '' : '&via=' + handler,
			u = url == '' ? '' : '&url=' + url,
			tweetMsg = '//twitter.com/share?' + m + u + v;
		window.open(tweetMsg,'_blank');		
	}
	
};

(function(d, debug){
	var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
	if (d.getElementById(id)) {return;}
		js = d.createElement('script'); js.id = id; js.async = true;
		js.src = "//connect.facebook.net/en_US/all" + (debug ? "/debug" : "") + ".js";
		ref.parentNode.insertBefore(js, ref);
}(document, false));