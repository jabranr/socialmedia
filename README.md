<h1>socialmedia.js</h1>

<h2>Introduction</h2>

<p>socialmedia.js is a small library containing collection of various methods that are used in social media interaction. This library is built to lessen the clutter of code from various social media platforms and by using the minimal and easy approach as well as:</p>

<ul>
	<li>Easy to use with convenient name functions</li>
	<li>Do more and write less i.e. inclusion of one facebook init method enables like, share, invite, send, like box, streams and many more functions.</li>
	<li>Helps avoid repeating the code from social media prepared APIs</li>
	<li>Uses the same usual core functions of social media platforms with minimum input</li>
	<li>Minimized version is 2kb that provides quick website load.</li>
	<li>Auto creates the required div elements in dom and keep them at appropriate positions</li>
</ul>

<h2>Using the socialmedia.js library</h2>

<ol>
	<li>Download the project using ZIP option at http://github.com/jabranr/socialmedia.js</li>
	<li>Unzip the project and copy the socialmedia.min.js to your website/application project.</li>
	<li>Include socialmedia.min.js and have it loaded using async method in your web document.</li>
</ol>

<code>
	&lt;script src="socialmedia.min.js" onload="facebook.init({appid:'123456789', channelurl:'//yourdomain.com/channel.php'});" &gt;
	&lt;/script&gt;
</code>

<strong><em>[* Script path must be according to your directory structure]</em></strong>

<h2>List of available functions</h2>

<ol>
	<li><h3>Use basic Facebook API actions:</h3></li>
	<code>
		&lt; script src="socialmedia.min.js" onload="facebook.init({appid:'123456789', channelurl:'//yourdomain.com/channel.php'});" &gt;
		&lt;/script&gt;
	</code>
<p>
	Almost all of the Facebook available plugins [https://developers.facebook.com/docs/plugins/] work fine using above basic settings and initialization.
</p>

<li><h3>Use advance Facebook API actions:</h3></li>

<code>
	facebook.init({ settings });
</code>

<strong>Settings:</strong>

<ul>
	<li>
		<em>
			appid: Facebook application ID
		</em>
	</li>
	<li>
		<em>
			channelurl: Facebook channel file URL
		</em>
	</li>
</ul>

<li><h3>Advance Facebook Canvas options:</h3></li>

<code>
	facebook.init({ settings });
</code>

<strong>Settings:</strong>

<ul>
	<li>
		<em>
			appid: Facebook application ID
		</em>
	</li>
	<li>
		<em>
			channelurl: Facebook channel file URL
		</em>
	</li>
	<li>
		<em>
			width: Facebook Canvas width as integer in pixels
		</em>
	</li>
	<li>
		<em>
			height: Facebook Canvas height as integer in pixels
		</em>
	</li>
	<li>
		<em>
			autogrow: true|false|interval (integer) – Set Facebook Canvas autogrow 
		</em>
	</li>
	<li>
		<em>
			x: Set Facebook Canvas horizontal scroll position as integer in pixels
		</em>
	</li>
	<li>
		<em>
			y: Set Facebook Canvas vertical scroll position as integer in pixels
		</em>
	</li>
</ul>

All settings are optional. In absence of all settings, application will use the basic Facebook API actions.

Facebook Like action
Add following code snippet to display like button anywhere in the application.
<div class="fb-like" data-send="true" data-width="450" data-show-faces="true"></div>

Facebook Share action
Apply Facebook share action at any object in application to display share dialog using following method:

facebook.share({ options, callback, callback });

Options:
title:  title of application
url: url of application
picture: image URL to display in share dialog
caption: caption to display in share dialog
description: brief description of application
Callback: 
Callback function to return in result of successful share dialog action.
Callback: 
Callback function to return in result of failure/cancelation of share dialog.

Facebook Invite action
Apply Facebook invite action at any object in application to display invite dialog using following method:

facebook.invite({ options, callback });

Options:
message:  Invite message to be displayed in invite dialog.
Callback: 
Callback function to return in result of successful invite dialog action.

Twitter Tweet action
Apply Twitter tweet action at any object in application to post tweet using following method:

twitter.tweet({ options });

Options:
tweet:  Invite message to be displayed in invite dialog.
handler: twitter handler
url: URL to post in tweet
All options are optional. A final tweet will be formed based upon whichever options are provided with values and will be URL encoded.
License:
MIT License – http://opensource.org/licenses/MIT
socialmedia.js
Introduction
socialmedia.js is a small library containing collection of various methods that are used in social media interaction. This library is built to lessen the clutter of code from various social media platforms and by using the minimal and easy approach as well as:
•	Easy to use with convenient name functions
•	Do more and write less i.e. inclusion of one facebook init method enables like, share, invite, send, like box, streams and many more functions.
•	Helps avoid repeating the code from social media prepared APIs
•	Uses the same usual core functions of social media platforms with minimum input
•	Minimized version is 2kb that provides quick website load.
•	Auto creates the required div elements in dom and keep them at appropriate positions
Using the socialmedia.js library
Download the project using ZIP option at http://github.com/jabranr/socialmedia.js
Unzip the project and copy the socialmedia.min.js to your website/application project.
Include socialmedia.min.js and have it loaded using async method in your web document.
<script src=” socialmedia.min.js” onload=”facebook.init({appid:’123456789’, channelurl:’//yourdomain.com/channel.php’});” ></script>
[* Script path must be according to your directory structure]
List of available functions
Use basic Facebook API actions:
<script src=” socialmedia.min.js” onload=”facebook.init({appid:’123456789’, channelurl:’//yourdomain.com/channel.php’});”></script>
Almost all of the Facebook available plugins [https://developers.facebook.com/docs/plugins/] work fine using above basic settings and initialization.

Use advance Facebook API actions:
facebook.init({ settings });
Settings:
appid: Facebook application ID
channelurl: Facebook channel file URL

Advance Facebook Canvas options:

facebook.init({ settings });
Settings:
appid: Facebook application ID
channelurl: Facebook channel file URL
width: Facebook Canvas width as integer in pixels
height: Facebook Canvas height as integer in pixels
autogrow: true|false|interval (integer) – Set Facebook Canvas autogrow 
x: Set Facebook Canvas horizontal scroll position as integer in pixels
y: Set Facebook Canvas vertical scroll position as integer in pixels

All settings are optional. In absence of all settings, application will use the basic Facebook API actions.

Facebook Like action
Add following code snippet to display like button anywhere in the application.
<div class="fb-like" data-send="true" data-width="450" data-show-faces="true"></div>

Facebook Share action
Apply Facebook share action at any object in application to display share dialog using following method:

facebook.share({ options, callback, callback });

Options:
title:  title of application
url: url of application
picture: image URL to display in share dialog
caption: caption to display in share dialog
description: brief description of application
Callback: 
Callback function to return in result of successful share dialog action.
Callback: 
Callback function to return in result of failure/cancelation of share dialog.

Facebook Invite action
Apply Facebook invite action at any object in application to display invite dialog using following method:

facebook.invite({ options, callback });

Options:
message:  Invite message to be displayed in invite dialog.
Callback: 
Callback function to return in result of successful invite dialog action.

Twitter Tweet action
Apply Twitter tweet action at any object in application to post tweet using following method:

twitter.tweet({ options });

Options:
tweet:  Invite message to be displayed in invite dialog.
handler: twitter handler
url: URL to post in tweet
All options are optional. A final tweet will be formed based upon whichever options are provided with values and will be URL encoded.
License:
MIT License – http://opensource.org/licenses/MIT
