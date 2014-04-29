### Twitter object ###
Socialmedia.Twitter = ->
	this.init()
	return

### Twitter init method ###
Socialmedia.Twitter.prototype.init = ->
	((a,b,c) ->
		d = a.getElementsByTagName(b)[0]
		a = a.createElement(b)
		a.id = c
		Socialmedia.SDK.twitter
		d.parentNode.insertBefore(a, d)
	)(document, 'script', 'twitter-wjs')
	
	return

### Twitter share link method ###
Socialmedia.Twitter.prototype.Tweet = (options = {}) ->
	intentShareUrl = '//twitter.com/intent/tweet?'
	data = options.tweet? and "text=#{encodeURIComponent(options.tweet)} " or ' '
	data += options.link? and "&url=#{encodeURIComponent(options.link)} " or encodeURIComponent window.location.href
	data += options.via? and "&via=#{encodeURIComponent(options.via)} " or ' '
	Socialmedia.Popup intentShareUrl + data

### Twitter Follow method ###
Socialmedia.Twitter.prototype.Follow = (username = 'jabranr') ->
	username.replace /@/, ''
	intentFollowUrl = '//twitter.com/intent/follow?'
	Socialmedia.Popup intentFollowUrl + "screen_name=#{username}", 
		width: 750
		height: 465

### Twitter Mention method ###
Socialmedia.Twitter.prototype.Mention = (username = 'jabranr') ->
	username.replace /@/, ''
	intentMentionUrl = '//twitter.com/intent/tweet?'
	Socialmedia.Popup intentMentionUrl + "screen_name=#{username}"

### Twitter Hashtag method ###
Socialmedia.Twitter.prototype.Hashtag = (hashtag = 'socialmedia') ->
	hashtag.replace /#/, ''
	intentHashtagUrl = '//twitter.com/intent/tweet?'
	Socialmedia.Popup intentHashtagUrl + "button_hashtag=#{hashtag}"

### ref: https://about.twitter.com/resources/buttons#tweet ###