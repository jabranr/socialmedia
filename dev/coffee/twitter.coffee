### Twitter object ###
__mehfil.Twitter = ->
	this.init()
	return

### Twitter init method ###
__mehfil.Twitter.prototype.init = ->
	((a,b,c) ->
		d = a.getElementsByTagName(b)[0]
		a = a.createElement(b)
		a.id = c
		a.src = __mehfil.SDK.twitter
		d.parentNode.insertBefore(a, d)
	)(document, 'script', 'twitter-wjs')
	
	return

### Twitter share link method ###
__mehfil.Twitter.prototype.Tweet = (options = {}) ->
	intentShareUrl = '//twitter.com/intent/tweet?'
	data = options.tweet? and "text=" + encodeURIComponent options.tweet or ''
	data += options.via? and "&via=" + encodeURIComponent options.via or ''
	data += options.link? and "&url=" + encodeURIComponent options.link or encodeURIComponent window.location.href
	__mehfil.Popup intentShareUrl + data


### ref: https://about.twitter.com/resources/buttons#tweet ###