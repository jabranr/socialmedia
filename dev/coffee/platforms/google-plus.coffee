### Google+ object ###
class Socialmedia.GooglePlus 
    constructor: ->
    	@init()
    	return

    ### Google+ init method ###
    init: ->
        that = @
        ((doc, tag, id) ->
            return if doc.getElementById id
            sdk = doc.createElement tag
            sdk.async = true
            sdk.src = Socialmedia.SDK.googleplus
            sdk.id = id
            ref = doc.getElementsByTagName(tag)[0]
            ref.parentNode.insertBefore sdk, ref
            that.gpsdk = doc.getElementById '#' + id
            return
        )(document, 'script', 'gplus-jssdk')

    ### Google+ share method ###
    Share: (options = { }) ->
    	platformUrl = '//plus.google.com/share?'
    	data = options.link? and "url=#{encodeURIComponent options.link}" or "url=#{encodeURIComponent window.location.href}"
    	data += options.lang? and "&hl=#{encodeURIComponent options.lang}" or "&hl=en"
    	Socialmedia.Popup.apply @, [platformUrl + data]