<?php 

/**
 *
 * JavaScript library for Social media actions.
 *
 * @version: 1.3
 * @author: hello@jabran.me
 * @link: http://github.com/jabranr / http://jabran.me
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

 $version = '1.3';

?>
<!doctype HTML>
<html>
<head>
	<meta charset="utf-8">
		<title>socialmedia dot js &ndash; Jabran Rafique</title>
	<meta property="og:type" content="article">
	<meta property="og:url" content="http://jabran.me/sandbox/socialmediadotjs/">
	<meta property="og:image" content="http://jabran.me/sandbox/socialmediadotjs/images/socialmediadotjs_og.png">
	<meta property="og:title" content="socialmedia.js &ndash; Jabran Rafique">
	<meta property="og:description" content="Convenient JavaScript library to add social media interactions into web applications.">
	<meta name="image_url" content="http://jabran.me/sandbox/socialmediadotjs/images/socialmediadotjs_og.png">
	<meta name="googlebot" content="all, index, follow" />
	<meta name="robots" content="all, index, follow" />
	<meta name="msnbot" content="all, index, follow" />
	<link rel="canonical" href="http://jabran.me/sandbox/socialmediadotjs/">
	<meta name="robots" content="noodp">
	<link rel="shortcut icon" href="http://jabran.me/wp-content/themes/jabrandotme/images/favicon.ico">
	<link rel="stylesheet" href="style.css?v=<?php echo $version; ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
	<script src="../src/socialmedia.min.js"></script>
	<script>
		var _gaq = _gaq || [];
		_gaq.push(['_setAccount', 'UA-9809111-15']);
		_gaq.push(['_setDomainName', 'jabran.me']);
		_gaq.push(['_trackPageview']);

		(function() {
		var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		})();

		facebook.init({
			appid:'142530249248955',
			channelurl:'//jabran.me/channel.php',
			status: true,
			flrequests: true
		}, function(FB)	{
			FB.getLoginStatus(function(response)	{
				console.log(response);
			});
		});
	</script>
	
</head>
<body>

	<div id="wrapper">

		<h1>socialmedia.js</h1>

		<ul>
			<li><button class="bttn fbshare">Facebook Share on Timeline</button></li>
			<li><button class="bttn fbinvite">Facebook Invite Friends</button></li>
			<li><button class="bttn tweet">Tweet</button></li>
			<li><button class="bttn gplus">Google +</button></li>
		</ul>
		
		<br>
		
		<ul>
			<li><a href="https://github.com/jabranr/socialmedia.js#readme" class="bttn bttn-primary">Read Documentation</a></li>
			<li><a href="https://github.com/jabranr/socialmedia.js/archive/master.zip" class="bttn bttn-info">Download socialmedia.js</a></li>
			<li><a href="https://github.com/jabranr/socialmedia.js" class="bttn bttn-primary">Fork on Github</a></li>
		</ul>

		<br>

		<code>
			git://github.com/jabranr/socialmedia.js.git
		</code>

		<div class="footer">
			<ul>
				<li><a href="http://jabran.me" target="_parent" title="Folio">&copy; <?php echo gmdate('Y'); ?> Jabran Rafique</a></li>
				<li><a href="http://github.com/jabranr/socialmedia.js" target="_blank" title="Fork at Github">Fork at Github</a></li>
				<li><a href="http://opensource.org/licenses/MIT" target="_blank" title="MIT License">MIT License</a></li>
			</ul>
		</div>

	</div>

	<script>
	$(document).ready(function()	{

		var click = ('ontouchstart' in window) ? 'touchstart': 'click',
			fbsharebtn = $('button.fbshare'),
			fbinvitebtn = $('button.fbinvite'),
			tweetbtn = $('button.tweet'),
			gplusbtn = $('button.gplus');

		fbsharebtn.on(click, function()	{
			facebook.share({
				title: 'socialmedia.js by Jabran Rafique',
				url	: 'http://jabran.me/sandbox/socialmediadotjs',
				image: 'http://jabran.me/sandbox/socialmediadotjs/images/socialmediadotjs_og.png',
				caption: 'JavaScript library for social media interactions',
				description: 'Convenient JavaScript library to add social media interactions into web applications.'
			});
		});

		fbinvitebtn.on(click, function()	{
			facebook.invite({
				msg: 'Check this convenient JavaScript library to add social media interactions to your web application.'
			}, successCallback);
		});

		function successCallback(response)	{
			console.log('Example: Response object returned on success');
			console.log(response);
		}

		tweetbtn.on(click, function()	{
			twitter.tweet({
				handler: 'jabranr',
				tweet: 'socialmedia.js is convenient #JavaScript library for clutter free social media interactions',
				url: 'http://jabran.me/sandbox/socialmediadotjs'
			});
		});

		gplusbtn.on(click, function()	{
			gplus.plus({
				url: 'http://jabran.me/sandbox/socialmediadotjs'
			});
		});
	});
	</script>

</body>
</html>
