# Socialmedia.js

<blockquote>If you are using version 1.4.0 or less then you will need to update the code as methods in this library are not compatible with older versions.</blockquote>

Socialmedia.js enables JavaScript SDKs and their associated social sharing functions for various social media services. At the moment, Socialmedia.js supports following social media services:

* [Facebook](#facebook)
* [Twitter](#twitter)
* [Google Plus](#google)
* [Pinterest](#pinterest)

### Usage:

* Download the latest release from [Releases](http://git.io/sm-release).
* The zipped package contains complete source code. The `src/` folder contains the uncompressed and minified versions.
* Include the source file `src/socialmedia-1.4.1.min.js` into your HTML document.
* Use following classes to enable various SDKs and their associated methods:

``` javascript
// Initialize Facebook SDK
var facebook = new Socialmedia.Facebook({ appid: '1234567890' });

// Initialize Facebook SDK in debug mode
var facebook = new Socialmedia.Facebook({ appid: '1234567890', debug: true });

// Initialize Facebook SDK version 2.0
var facebook = new Socialmedia.Facebook({ appid: '1234567890', version: 'v2.0' });

// Initialize Twitter SDK
var twitter = new Socialmedia.Twitter();

// Initialize GooglePlus SDK
var gplus = new Socialmedia.GooglePlus();

// Initialize Pinterest SDK
var pin = new Socialmedia.Pinterest();
```

For complete list of methods associated with each class, see the [detailed documentation](#documentation).

### Contribute / Feedback / Issues

**To contribute, fork or clone, use following URLs:**

``` html
HTTP: https://github.com/jabranr/socialmedia.js.git
SSH: git@github.com:jabranr/socialmedia.js.git
SVN: https://github.com/jabranr/socialmedia.js
```

**Report an issue, bug or enhancement:**

[https://github.com/jabranr/socialmedia.js/issues](https://github.com/jabranr/socialmedia.js/issues)

## Documentation

The library supports following social media services:

* [Facebook](#facebook)
* [Twitter](#twitter)
* [Google Plus](#google)
* [Pinterest](#pinterest)

### Facebook

Initialize the Facebook class using following scheme:

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
// Whether SDK to check login status.
status: Boolean True or False. (Default is false)
```
``` javascript
// Whether to enable XFBML parse.
xfbml: Boolean True or False. (Default is true)
```
``` javascript
// Whether to enable Frictionless Requests.
requests: Boolean True or False. (Default is false)
```
``` javascript
// Get uncompressed Facebook SDK source for debugging
debug: Boolean True or False. (Default is false)
```
``` javascript
// Get new v2.0 Facebook SDK
version: String Facebook SDK version (Default is null)
```

#### Methods:

**Add a friend on Facebook.**

``` javascript
facebook.AddFriend({ 
	String id, 
	Function callback 
});

// callback response returns true or false

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
	Object data,
	Function callback
});

// callback response contains successful request data
```


**Pay with Facebook.**

``` javascript
facebook.Pay({
	String link,
	Function callback
});

// callback response contains successful transaction data
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
	String description,
	Function onSuccess,
	Function onFail
});

// onSuccess response contains successful request data
// onFail response contains failed request data
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

Initialize the Twitter class using following scheme:

``` javascript
var twitter = new Socialmedia.Twitter();
```

#### Methods:

Simple Tweet

``` javascript
twitter.Tweet({
	String tweet,
	String hashtag,
	String recommend,
	String via,
	String link
});
```

Follow another Twitter user

``` javascript
twitter.Follow( String username );
```

Post a Tweet with custom Hashtag, recommendations and link

``` javascript
twitter.Hashtag({
	String hashtag,
	String recommend,
	String tweet,
	String link
});
```

Tweet to another Twitter user directly by using Twitter Mention

``` javascript
twitter.Mention({
	String username,
	String recommend,
	String tweet
});
```

### Google+

Initialize the GooglePlus class using following scheme:

``` javascript
var gplus = new Socialmedia.GooglePlus();
```

#### Methods:

Share to Google+

``` javascript
gplus.Share({
	String link,
	String lang
});
```

### Pinterest

Initialize the Pinterest class using following scheme:

``` javascript
var pin = new Socialmedia.Pinterest();
```

#### Methods:

Pin a link to Pinterest boards

``` javascript
pin.Pinit({
	String link,
	String image,
	String description
});
```

### References:

1. [Read more about frictionlessRequests](https://developers.facebook.com/docs/games/requests/v2.0#frictionless-requests)
2. [Facebook JavaScript SDK](https://developers.facebook.com/docs/javascript/)
3. [Twitter JavaScript SDK](https://about.twitter.com/resources/buttons)
4. [Google+ JavaScript SDK](https://developers.google.com/+/web/share/)
5. [Pinterest JavaScript SDK](https://developers.pinterest.com/pin_it/)


## License:

&copy; Jabran Rafique ([@jabranr](https://twitter.com/jabranr)) | 2014 | MIT License – [http://opensource.org/licenses/MIT](http://opensource.org/licenses/MIT)