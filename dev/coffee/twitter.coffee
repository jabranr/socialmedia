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
		a.src = Socialmedia.SDK.twitter
		d.parentNode.insertBefore(a, d)
	)(document, 'script', 'twitter-wjs')
	
	return

### Twitter share link method ###
Socialmedia.Twitter.prototype.Tweet = (options) ->
	intentShareUrl = '//twitter.com/intent/tweet?'
	data = if options? and options.tweet then "text=#{encodeURIComponent(options.tweet)} " else "text=#{encodeURIComponent document.title} "
	data += if options? and options.hashtag then "&hashtags=#{encodeURIComponent(options.hashtag)} " else ''
	data += if options? and options.recommend then "&related=#{encodeURIComponent(options.recommend)} " else ''
	data += if options? and options.via then "&via=#{encodeURIComponent(options.via)} " else ''
	data += if options? and options.link then "&url=#{encodeURIComponent(options.link)} " else "&url=#{encodeURIComponent window.location.href} "
	Socialmedia.Popup.apply this, [intentShareUrl + data]

### Twitter Follow method ###
Socialmedia.Twitter.prototype.Follow = (username = 'jabranr') ->
	username.replace /@/, ''
	intentFollowUrl = '//twitter.com/intent/follow?'
	Socialmedia.Popup.apply this, [intentFollowUrl + "screen_name=#{username}", 
			width: 700
			height: 485
		]

###
# Twitter Mention method
# Supports multiple recommendations separated by commas
###
Socialmedia.Twitter.prototype.Mention = (options) ->
	intentMentionUrl = '//twitter.com/intent/tweet?'
	data = options? and options.username and "screen_name=#{encodeURIComponent(options.username.replace(/@/, ''))}" or ''
	data += options? and options.recommend and "&related=#{encodeURIComponent(options.recommend)}" or ''
	data += options? and options.tweet and "&text=#{encodeURIComponent(options.tweet)}" or ''
	Socialmedia.Popup.apply this, [intentMentionUrl + data]

###
# Twitter Hashtag method
# Supports multiple recommendations separated by commas
###
Socialmedia.Twitter.prototype.Hashtag = (options) ->
	intentHashtagUrl = '//twitter.com/intent/tweet?'
	data = options? and options.hashtag and "button_hashtag=#{encodeURIComponent(options.hashtag.replace(/#/, ''))}" or ''
	data += options? and options.recommend and "&related=#{encodeURIComponent(options.recommend)}" or ''
	data += options? and options.tweet and "&text=#{encodeURIComponent(options.tweet)}" or ''
	data += options? and options.link and "&url=#{encodeURIComponent(options.link)}" or ''
	Socialmedia.Popup.apply this, [intentHashtagUrl + data]