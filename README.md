<h1>socialmedia.js</h1>
<p>Introductionsocialmedia.js is a small library containing collection of various methods that are used in social media interaction. This library is built to lessen the clutter of code from various social media platforms and by using the minimal and easy approach as well as: </p>
<ul>
  <li>Easy to use with convenient name functions</li>
  <li>Do more and write less i.e. inclusion of one facebook init method enables like, share, invite, send, like box, streams and many more functions.</li>
  <li>Helps avoid repeating the code from social media prepared APIs</li>
  <li>Uses the same usual core functions of social media platforms with minimum input</li>
  <li>Minimized version is 2kb that provides quick website load.</li>
  <li>Auto creates the required div elements in dom and keep them at appropriate positions</li>
</ul>
<h2> Downloading &amp; Installing socialmedia.js library </h2>
<ol>
  <li>Download the project using ZIP option at <a href="https://github.com/jabranr/socialmedia.js/archive/master.zip">https://github.com/jabranr/socialmedia.js/archive/master.zip</a></li>
  <li>Unzip the project and copy the socialmedia.min.js to your website/application project.</li>
  <li>Include socialmedia.min.js between HEAD tags.</li>
</ol>
<p><code>&lt;script src="socialmedia.min.js"&gt;&lt;/script&gt;</code></p>
<p><em>* Script path must reflect your directory structure</em></p>
<p>Then add this line between HEAD tags to load the library and that's all about the setup.</p>
<p><pre>
&lt;script&gt;
facebook.init({
  appid:'123456789', 
  channelurl:'//yourdomain.com/channel.php'
});
&lt;/script&gt;</pre></p>
<h2>List of available functions </h2>
<p>Following are currently available functions through this library. Every function comes with its options and callback functions as explained below.</p>
<h2> Use basic Facebook API actions: </h2>
<p><code>&lt;script src="socialmedia.min.js" onload="facebook.init({appid:'123456789', channelurl:'//yourdomain.com/channel.php'});"&gt; </code><code>&lt;/script&gt;</code></p>
<p>Almost all of the <a href="https://developers.facebook.com/docs/plugins/" target="_blank">Facebook available plugins</a> work fine using above basic settings and initialization.</p>
<h2> Use advance Facebook API actions:</h2>
<p><code> facebook.init({ settings }); </code> </p>
<p><strong><em>Settings:</em></strong> </p>
<ol>
  <li><em> appid: Facebook application ID </em> </li>
  <li><em> channelurl: Facebook channel file URL </em> </li>
</ol>
<h2> Advance Facebook Canvas options:</h2>
<p><code> facebook.init({ settings });</code></p>
<p><strong><em>Settings: </em></strong></p>
<ol>
  <li><em> appid: Facebook application ID </em> </li>
  <li><em> channelurl: Facebook channel file URL </em> </li>
  <li><em> width: Facebook Canvas width as integer in pixels </em> </li>
  <li><em> height: Facebook Canvas height as integer in pixels </em> </li>
  <li><em> autogrow: true|false|interval (integer) – Set Facebook Canvas autogrow </em> </li>
  <li><em> x: Set Facebook Canvas horizontal scroll position as integer in pixels </em> </li>
  <li><em> y: Set Facebook Canvas vertical scroll position as integer in pixels </em> </li>
</ol>
<p> All settings are optional. In absence of all settings, application will use the basic Facebook API actions.</p>
<h2>Facebook Like action:</h2>
<p>Add following code snippet to display like button anywhere in the application.</p>
<p><code>&lt;div class="fb-like" data-send="true" data-width="450" data-show-faces="true"&gt;&lt;/div&gt;</code></p>
<h2>Facebook Share action:</h2>
<p>Apply Facebook share action at any object in application to display share dialog using following method:<code> facebook.share({ options, callback, callback });</code></p>
<p><strong> <em>Options:</em></strong></p>
<ul>
  <li><em> title: title of application </em> </li>
  <li><em> url: url of application </em> </li>
  <li><em> image: image URL to display in share dialog </em> </li>
  <li><em> caption: caption to display in share dialog </em> </li>
  <li><em> description: brief description of application </em> </li>
</ul>
<p> <em><strong>Callback:</strong></em><strong></strong></p>
<ul>
  <li>Callback function to return in result of successful share dialog action.</li>
</ul>
<p><strong><em>Callback:</em></strong></p>
<ul>
  <li>Callback function to return in result of failure/cancelation of share dialog.</li>
</ul>
<h2>Facebook Invite action:</h2>
<p>Apply Facebook invite action at any object in application to display invite dialog using following method:</p>
<p><code>facebook.invite({ options, callback });</code></p>
<p><em><strong>Options: </strong></em><strong></strong></p>
<ul>
  <li><em> message: Invite message to be displayed in invite dialog. </em> </li>
</ul>
<p> <em><strong>Callback:</strong></em><strong></strong></p>
<ul>
  <li>Callback function to return in result of successful invite dialog action.</li>
</ul>
<h2>Twitter Tweet action:</h2>
<p>Apply Twitter tweet action at any object in application to post tweet using following method:</p>
<p><code>twitter.tweet({ options });</code></p>
<p><strong><em>Options:</em></strong></p>
<ul>
  <li><em> tweet: Invite message to be displayed in invite dialog. </em> </li>
  <li><em> handler: twitter handler </em> </li>
  <li><em> url: URL to post in tweet </em> </li>
</ul>
<p> All options are optional. A final tweet will be formed based upon whichever options are provided with values and will be URL encoded.</p>
<h2>License:</h2>
<p><a target="_blank" href="http://opensource.org/licenses/MIT">MIT License – http://opensource.org/licenses/MIT</a></p>
