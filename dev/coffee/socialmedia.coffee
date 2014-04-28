###!
 * Javascript library to embed socialmedia functions in a web app
###

###
Global object
###
window.Socialmedia = window.Socialmedia || {}


###
Default function obejcts
Facebook
###

Socialmedia.Facebook = (settings)->
	this.appid = settings.appid || null
	this.status = settings.status || false
	this.requests = settings.requests || false
	this.init()
	return

Socialmedia.Facebook.prototype.init = ->
	_this = this
	window.fbAsyncInit = ->
		FB.init({
			appId: this.appid
			status: this.status
			cookie: true
			xfbml: true
			frictionlessRequests: this.requests
		})
		
		###
		Setup FB SDK script source
		###
		_this.fbsdk = document.querySelector '#facebook-jssdk'

		
		###
		Append app_id to fbsdk source
		###
		_this.fbsdk.src += '#xfbml=1&appid=' + _this.appid

		
		###
		Setup FB ready status
		###
		_this.sdkLoaded = true

	###
	Move the auto-generated fb-root DOM element to appropriate position
	###
	if addEventListener?
		window.addEventListener 'load', ->
			document.body.appendChild document.getElementById 'fb-root'
	else if attachEvent?
		window.attachEvent 'load', ->
			document.body.appendChild document.getElementById 'fb-root'

	###
	Load the Facebook JavaScript SDK
	###
	((d, debug) ->
		id = 'facebook-jssdk'
		ref = d.getElementsByTagName('script')[0]
		return if d.getElementById(id)
		js = d.createElement 'script'
		js.id = id
		js.async = true
		js.src = '//connect.facebook.net/en_US/all' + (  if debug then '/debug' else '' ) + '.js'
		fbdiv = d.createElement 'div'
		fbdiv.id = 'fb-root'
		ref.parentNode.insertBefore fbdiv, ref
		ref.parentNode.insertBefore js, ref
	)(document, false)

	return
