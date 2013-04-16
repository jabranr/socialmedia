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

<strong>
	[* Script path must be according to your directory structure]
</strong>

<h2>List of available functions</h2>

<ol>
	<li><h3>Use basic Facebook API actions:</h3></li>
	<code>
		&lt; script src="socialmedia.min.js" onload="facebook.init({appid:'123456789', channelurl:'//yourdomain.com/channel.php'});" &gt;
		&lt;/script&gt;
	</code>
<p>
	Almost all of the <a href="https://developers.facebook.com/docs/plugins/" target="_blank">Facebook available plugins</a> work fine using above basic settings and initialization.
</p>

<li><h3>Use advance Facebook API actions:</h3></li>

<code>
	facebook.init({ settings });
</code>

<strong>Settings:</strong>

<ul>
	<li>
		<em>
			<strong>appid:</strong> Facebook application ID
		</em>
	</li>
	<li>
		<em>
			<strong>channelurl:</strong> Facebook channel file URL
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
			<strong>appid:</strong> Facebook application ID
		</em>
	</li>
	<li>
		<em>
			<strong>channelurl:</strong> Facebook channel file URL
		</em>
	</li>
	<li>
		<em>
			<strong>width:</strong> Facebook Canvas width as integer in pixels
		</em>
	</li>
	<li>
		<em>
			<strong>height:</strong> Facebook Canvas height as integer in pixels
		</em>
	</li>
	<li>
		<em>
			<strong>autogrow:</strong> true|false|interval (integer) – Set Facebook Canvas autogrow 
		</em>
	</li>
	<li>
		<em>
			<strong>x:</strong> Set Facebook Canvas horizontal scroll position as integer in pixels
		</em>
	</li>
	<li>
		<em>
			<strong>y:</strong> Set Facebook Canvas vertical scroll position as integer in pixels
		</em>
	</li>
</ul>

<p>All settings are optional. In absence of all settings, application will use the basic Facebook API actions.</p>

<h2>Facebook Like action</h2>

<p>
	Add following code snippet to display like button anywhere in the application.
</p>

<code>
	&lt;div class="fb-like" data-send="true" data-width="450" data-show-faces="true"&gt;&lt;/div&gt;
</code>

<h2>Facebook Share action</h2>

<p>Apply Facebook share action at any object in application to display share dialog using following method:</p>

<code>
	facebook.share({ options, callback, callback });
</code>

<strong>Options:</strong>

<ul>
	<li>
		<em>
			<strong>title:</strong>  title of application
		</em>
	</li>
	<li>
		<em>
			<strong>url:</strong> url of application
		</em>
	</li>
	<li>
		<em>
			<strong>image:</strong> image URL to display in share dialog
		</em>
	</li>
	<li>
		<em>
			<strong>caption:</strong> caption to display in share dialog
		</em>
	</li>
	<li>
		<em>
			<strong>description:</strong> brief description of application
		</em>
	</li>
</ul>

	<strong>Callback:</strong>
	<p>
		Callback function to return in result of successful share dialog action.
	</p>
	
	<strong>Callback:</strong>
	<p>
		Callback function to return in result of failure/cancelation of share dialog.
	</p>


<h2>Facebook Invite action</h2>

<p>
	Apply Facebook invite action at any object in application to display invite dialog using following method:
</p>

<code>
	facebook.invite({ options, callback });
</code>

<strong>Options:</strong>
<ul>
	<li>
		<em>
			<strong>message:</strong>  Invite message to be displayed in invite dialog.
		</em>
	</li>
</ul>

<strong>Callback:</strong>
<p>
	Callback function to return in result of successful invite dialog action.
</p>

<h2>Twitter Tweet action</h2>

<p>
	Apply Twitter tweet action at any object in application to post tweet using following method:
</p>

<code>
	twitter.tweet({ options });
</code>

<strong>Options:</strong>

<ul>
	<li>
		<em>
			<strong>tweet:</strong>  Invite message to be displayed in invite dialog.
		</em>
	</li>
	<li>
		<em>
			<strong>handler:</strong> twitter handler
		</em>
	</li>
	<li>
		<em>
			<strong>url:</strong> URL to post in tweet
		</em>
	</li>
</ul>

<p>
	All options are optional. A final tweet will be formed based upon whichever options are provided with values and will be URL encoded.
</p>

<h2>License:</h2>
<p>
	<a target="_blank" href="http://opensource.org/licenses/MIT">MIT License – http://opensource.org/licenses/MIT</a>
</p>
