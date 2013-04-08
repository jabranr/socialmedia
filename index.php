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
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
	<script src="socialmedia.min.js"></script>
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
			channelurl:'//jabran.me/channel.php'
		});
	</script>
	
	<style>
	body	{
		font-family: Helvetica, Arial, sans-serif;
		font-size: 100%;
		color: #333;
		background: #eee;
		margin: 0;
		padding: 0;
		line-height: 1.5;
	}
	h1	{
		display: block;
		font-size: 3.75em;
		color:#999;
		text-shadow:0 1px 1px #fff;
		padding-bottom: 1em;
	}
	p 	{
		margin-bottom: 18px;
	}
	a, img, :focus 	{
		border: none;
		outline: none;
		text-decoration: none;
	}
	a,
	a:link	{
		color: #777CCC;
	}
	a:hover	{
		text-decoration: underline;
		color: #c30;
	}
	#wrapper	{
		width: 95%;
		margin: 50px auto;
		text-align: center;
	}
	button	{
		padding: 10px 20px;
		border-radius: 3px;
		cursor: pointer;
		border: 1px solid #d5d5d5;
		background: -webkit-linear-gradient(top, #f5f5f5, #eee);
		color: #333;
		text-shadow: 0 1px 1px #fff;
		font-size: 14px;
		font-weight: normal;
		box-shadow: 0 1px 2px #ccc;
	}
	button:hover	{
		background: -webkit-linear-gradient(top, #eee, #f8f8f8);
	}
	ul 	{
		list-style-type: none;
	}
	ul li 	{
		display: inline-block;
		margin: 5px; 
	}
	code 	{
		border: 1px solid #d5d5d5;
		border-radius: 3px;
		padding: 5px 30px;
		background: #fff;
		color:#c30;
	}
	.footer	{
		margin: 50px 0;
		font-size: 12px;
		border-top: 1px solid #999;
	}
	</style>
</head>
<body>

	<div id="wrapper">

		<h1>socialmedia.js</h1>

		<p>
			The document for this library is being updated. Please refer to changelog at <a href="http://github.com/jabranr/socialmedia.js" target="_blank">Github</a>.
		</P>

		<p class="code">
			<code>
				facebook.init({
					appid:'1234567890',
					channelurl:'//yourwebsite.com/channel.php'
				});
				</code>
	</p>

		<ul>
			<li><button class="fbshare btn btn-info">Share on Facebook</button></li>
			<li><button class="fbinvite btn btn-info">Invite Facebook friends</button></li>
			<li><button class="tweet btn btn-info">Tweet the story</button></li>
		</ul>

		<div class="footer">
			<ul>
				<li><a href="http://jabran.me" target="_parent" title="Folio">Jabran Rafique</a></li>
				<li><a href="http://github.com/jabranr/socialmedia.js" target="_blank" title="Fork at Github">Fork at Github</a></li>
				<li><a href="http://opensource.org/licenses/MIT" target="_blank" title="MIT License">MIT License</a></li>
			</ul>
		</div>

	</div>

	<script>
	$(document).ready(function()	{

		$('button.fbshare').on('click', function()	{
			facebook.share({
				name: 'socialmedia.js by Jabran Rafique',
				url	: 'http://jabran.me/sandbox/socialmediadotjs',
				image: 'http://jabran.me/sandbox/socialmediadotjs/images/socialmediadotjs_og.png',
				caption: 'JavaScript library for social media interactions',
				description: 'Convenient JavaScript library to add social media interactions into web applications.'
			});
		});

		$('button.fbinvite').on('click', function()	{
			facebook.invite({
				msg: 'Check this convenient JavaScript library to add social media interactions to your web application.'
			});
		});

		function yes()	{
			console.log('Example message: Successfully posted.');
		}
		function no()	{
			console.log('Example message: Execution failed.');
		}

		$('button.tweet').on('click', function()	{
			twitter.tweet({
				handler: 'jabranr',
				tweet: 'socialmedia.js is convenient #JavaScript library for clutter free social media interactions',
				url: 'http://jabran.me/sandbox/socialmediadotjs'
			});
		});
	});
	</script>

</body>
</html>
