# socialmedia.js

<blockquote>This branch is in continuous development. NOT ready for production use!</blockquote>

JavaScript library to enable SDKs and embed social sharing functions for various social media services. Download the latest release from [Releases](http://git.io/sm-release).


## Documentation

The library supports following services:

* [Facebook](#facebook)
* [Twitter](#twitter)
* [Google Plus](#google)
* [Pinterest](#pinterest)

### Facebook

Initialize the Facebook object using following scheme:

``` javascript
var facebook = new Socialmedia.Facebook( Object settings );
```

The `Settings` parameter takes following combination of key and values:

**Required parameters:**

``` javascript
appid: Your Facebook app ID in numeric string format.
```

**Optional parameters:**

``` javascript
status: Boolean True or False. Whether SDK to check login status.
(Default is false)
```
``` javascript
xfbml: Boolean True or False. Whether to enable XFBML parse.
(Default is true)
```
``` javascript
requests: Boolean True or False. Whether to enable Frictionless Requests.
(Default is false)
```
``` javascript
debug: Boolean True or False. Get uncompressed SDK source
(Default is false)
```
``` javascript
version: String Facebook SDK version
(Default is 'v2.0')
```

#### Methods:

**Add a friend on Facebook.**

``` javascript
facebook.AddFriend({ 
	String id, 
	Function callback 
});
```

**Add the app to Facebook page.**

``` javascript
facebook.AddToPage();
```


**Invite friends to the app/web page.**

``` javascript
facebook.Invite({
	String title,
	String message,
	Array to,
	Array exclude_ids,
	int max_to,
	Object data
});
```


**Pay with Facebook.**

``` javascript
facebook.Pay({
	String link,
	Function callback
});
```


**Send a link.**

``` javascript
facebook.Send({
	String link
});
```


**Share a link to Facebook Timeline.**

``` javascript
facebook.Share({
	String title,
	String link,
	String image,
	String caption,
	String description
});
```


**Facebook Canvas autogrow on content update. Default is true.**

``` javascript
facebook.autogrow( Boolen );
```


**Scroll the Facebook Canvas.**

``` javascript
facebook.scroll({
	int x, int y
});
```


**Set Facebook Canvas size. Default size 810x800.**

``` javascript
facebook.setSize({ 
	int width,
	int height
});
```

### Twitter

Initialize the Twitter object using following scheme:

``` javascript
var twitter = new Socialmedia.Twitter();
```

#### Methods:

``` javascript
twitter.Follow( String username );
```
``` javascript
twitter.Hashtag({
	String hashtag,
	String recommend,
	String tweet,
	String link
});
```
``` javascript
twitter.Mention({
	String username,
	String recommend,
	String tweet
});
```
``` javascript
twitter.Tweet({
	String tweet,
	String hashtag,
	String recommend,
	String via,
	String link
});
```

### Google+

Initialize the Facebook object using following scheme:

``` javascript
var gplus = new Socialmedia.GooglePlus();
```

#### Methods:

``` javascript
gplus.Share({
	String link,
	String lang
});
```

### Pinterest

Initialize the Pinterest object using following scheme:

``` javascript
var pin = new Socialmedia.Pinterest();
```

#### Methods:

``` javascript
pin.Pinit({
	String link,
	String image,
	String description
});
```

### Examples:

``` javascript
// Initialize Facebook SDK
var facebook = new Socialmedia.Facebook({ appid: '1234567890' });

// Initialize Twitter SDK
var twitter = new Socialmedia.Twitter();

// Initialize GooglePlus SDK
var gplus = new Socialmedia.GooglePlus();

// Initialize Pinterest SDK
var pin = new Socialmedia.Pinterest();
```

### References:
1: [Read more about frictionlessRequests](https://developers.facebook.com/docs/games/requests/v2.0#frictionless-requests)

## License:
MIT License – [http://opensource.org/licenses/MIT](http://opensource.org/licenses/MIT)
