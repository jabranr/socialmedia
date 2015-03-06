### Pinterest object ###
class Socialmedia.Pinterest
	constructor: ->
		@init()
		return @

	### Pinterest init method ###
	init: ->
		that = @
		((doc, tag, id) ->
			return if doc.getElementById id
			sdk = doc.createElement tag
			sdk.id = id
			sdk.async = true
			sdk.src = Socialmedia.SDK.pinterest
			ref = doc.getElementsByTagName(tag)[0]
			ref.parentNode.insertBefore sdk, ref
			that.pinsdk = doc.getElementById id
			return
		)(document, 'script', 'pinterest-jssdk')

	### Pinterest share method ###
	Pinit: (options = { }) ->
		platformUrl = '//pinterest.com/pin/create/button/?'
		data = options.link? and "url=#{encodeURIComponent options.link }" or "url=#{encodeURIComponent window.location.href}"
		data += options.image? and "&media=#{encodeURIComponent options.image }" or ""
		data += options.description? and "&description=#{encodeURIComponent options.description }" or "&description=#{encodeURIComponent document.title}"
		Socialmedia.Popup.apply @, [platformUrl + data, 
			width: 765 
			height: 325
		]