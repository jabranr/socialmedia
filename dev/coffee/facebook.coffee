### Facebook object ###

__mehfil.Facebook = (settings)->
	this.appid = settings.appid? and settings.appid or ''
	this.status = settings.status? and settings.status or false
	this.requests = settings.requests? and settings.requests or false
	this.debug = settings.debug? and settings.debug or false
	this.init()
	return

__mehfil.Facebook.prototype.init = ->
	_this = this
	window.fbAsyncInit = ->
		FB.init
			appId: _this.appid
			status: _this.status
			cookie: true
			xfbml: true
			frictionlessRequests: _this.requests
		
		### Setup FB SDK script source ###
		_this.fbsdk = document.querySelector '#facebook-jssdk'
		
		### Append app_id to fbsdk source ###
		_this.fbsdk.src += '#xfbml=1&appId=' + _this.appid
		
		### Setup FB ready status ###
		_this.sdkLoaded = true

	### Move the auto-generated fb-root DOM element to appropriate position ###
	if addEventListener?
		window.addEventListener 'load', ->
			document.body.appendChild document.getElementById 'fb-root'
	else if attachEvent?
		window.attachEvent 'load', ->
			document.body.appendChild document.getElementById 'fb-root'

	### Load the Facebook JavaScript SDK ###
	((d, debug) ->
		id = 'facebook-jssdk'
		ref = d.getElementsByTagName('script')[0]
		return if d.getElementById(id)
		js = d.createElement 'script'
		js.id = id
		js.async = true
		js.src = if debug then __mehfil.SDK.facebook_debug else __mehfil.SDK.facebook
		fbdiv = d.createElement 'div'
		fbdiv.id = 'fb-root'
		ref.parentNode.insertBefore fbdiv, ref
		ref.parentNode.insertBefore js, ref
	)(document, _this.debug)

	return

### Facebook canvas setsize function ###
__mehfil.Facebook.prototype.setSize = (settings) ->
	if settings? and settings.width or settings.height
		FB.Canvas.setSize
			width: parseInt(settings.width) or 810
			height: parseInt(settings.height) or 800
	else FB.Canvas.setSize()

### Facebook canvas autogrow function ###
__mehfil.Facebook.prototype.autogrow = (settings = true) ->
	FB.Canvas.setAutoGrow settings

### Facebook canvas scroll function ###
__mehfil.Facebook.prototype.scroll = (settings) ->
	x = if settings? and settings.x? then settings.x or 0
	y = if settings? and settings.y? then settings.y or 0
	if x and y then FB.Canvas.scrollTo x, y else false

### Facebook share function ###
__mehfil.Facebook.prototype.Share = (options) ->
	FB.ui
		method: 'feed'
		name: options and options.title? and options.title or ''
		link: options and options.url? and options.url or ''
		picture: options and options.image? and options.image or ''
		caption: options and options.caption? and options.caption or ''
		description: options and options.description? and options.description or ''
	, 
	(response) ->
		if response?
			if options.onSuccess? 
				options.onSuccess?.call this, response
			else if options.onFail? 
				options.onFail?.call this, response
		else false

### Facebook invite function ###
__mehfil.Facebook.prototype.Invite = (options) ->
	FB.ui
		method: 'apprequests',
		title: options and options.title? and options.title or ''
		message: options and options.message? and options.message or ''
		to: options and options.to? and options.to or []
		exclude_ids: options and options.exclude_ids? and options.exclude_ids or []
		max_recipients: options and options.max_to? and options.max_to or 100
		data: options and options.data? and options.data or {}
	, 
	(response) ->
		if response?
			options.callback? and options.callback?.call this, response
		else false

### Facebook add to page tab function ###
__mehfil.Facebook.prototype.AddToPage = () ->
	FB.ui method: 'pagetab', ->

### Facebook add friend function ###
__mehfil.Facebook.prototype.AddFriend = (options) ->
	FB.ui
	  method: 'friends'
	  id: options and options.id? and options.id || 'jabranr'
	,
	(response) ->
		if response?
			options.callback? and options.callback?.call this, response.action
		else false

### Facebook send function ###
__mehfil.Facebook.prototype.Send = (options) ->
	FB.ui
	  method: 'send'
	  link: options? and options.link? and options.link or window.location.href

### Facebook pay function ###
__mehfil.Facebook.prototype.Pay = (options) ->
	FB.ui
	  method: 'pay'
	  action: 'purchaseitem'
	  product: options? and options.link? and options.link or window.location.href
	, (data) ->
		if data?
			options? and options.callback?.call this, data
		else false