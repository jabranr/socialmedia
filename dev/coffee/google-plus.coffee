### Google+ object ###
Socialmedia.GooglePlus = ->
	this.init()
	return

### Google+ init method ###
Socialmedia.GooglePlus.prototype.init = ->
    po = document.createElement 'script'
    po.type = 'text/javascript'
    po.async = true
    po.src = '//apis.google.com/js/platform.js'
    s = document.getElementsByTagName('script')[0]
    s.parentNode.insertBefore po, s
    return

### Google+ share method ###
Socialmedia.GooglePlus.prototype.Share = (options) ->
	platformUrl = '//plus.google.com/share?'
	data = options? and options.link? and "url=#{encodeURIComponent(options.link)}" or "url=#{encodeURIComponent window.location.href}"
	data += options? and options.lang? and "&hl=#{encodeURIComponent(options.lang)}" or "&hl=en"
	Socialmedia.Popup.apply this, [platformUrl + data]
