### Google+ object ###
Socialmedia.GooglePlus = ->
	this.init()
	return

### Google+ init method ###
Socialmedia.GooglePlus.prototype.init = ->
    _this = this
    ((doc, tag, id) ->
        return if doc.getElementById id
        sdk = doc.createElement tag
        sdk.async = true
        sdk.src = Socialmedia.SDK.googleplus
        sdk.id = id
        ref = doc.getElementsByTagName(tag)[0]
        ref.parentNode.insertBefore sdk, ref
        _this.gpsdk = doc.getElementById '#' + id
        return
    )(document, 'script', 'gplus-jssdk')

### Google+ share method ###
Socialmedia.GooglePlus.prototype.Share = (options) ->
	platformUrl = '//plus.google.com/share?'
	data = options? and options.link? and "url=#{encodeURIComponent options.link}" or "url=#{encodeURIComponent window.location.href}"
	data += options? and options.lang? and "&hl=#{encodeURIComponent options.lang}" or "&hl=en"
	Socialmedia.Popup.apply this, [platformUrl + data]