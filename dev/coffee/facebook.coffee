### Facebook object ###

Socialmedia.Facebook = (settings)->
	this.appid = settings.appid? and settings.appid or ''
	this.status = settings.status? and settings.status or false
	this.xfbml = settings.xfbml? and settings.xfbml or true
	this.cookie = settings.cookie? and settings.cookie or true
	this.requests = settings.requests? and settings.requests or false
	this.version = settings.version? and settings.version or ''
	this.debug = settings.debug? and settings.debug or false
	this.callback = settings.callback? and settings.callback or ->
	this.init()
	return

Socialmedia.Facebook.prototype.init = ->
	_this = this
	window.fbAsyncInit = ->
		FB.init
			appId: _this.appid
			status: _this.status
			cookie: _this.cookie
			xfbml: _this.xfbml
			version: _this.version
			frictionlessRequests: _this.requests
		
		### Setup FB SDK script source ###
		_this.fbsdk = document.querySelector '#facebook-jssdk'
		
		### Append app_id to fbsdk source ###
		_this.fbsdk.src += '#xfbml=1&appId=' + _this.appid


		### Async callback function ###
		FB.getLoginStatus = (response)->
			if response?
				_this.callback?.call this, response
			else false
			return
		return
		
	### Move the auto-generated fb-root DOM element to appropriate position ###
	if addEventListener?
		window.addEventListener 'load', ->
			document.body.appendChild document.getElementById 'fb-root'
			return

	else if attachEvent?
		window.attachEvent 'onload', ->
			document.body.appendChild document.getElementById 'fb-root'
			return

	### Load the Facebook JavaScript SDK ###
	((doc, dev, tag, id, ver) ->
		return if doc.getElementById id
		sdk = doc.createElement tag
		sdk.id = id
		sdk.async = true
		if dev 
			if ver? and ver == 'v2.0'
				sdk.src = Socialmedia.SDK.facebook_debugv2
			else
				sdk.src = Socialmedia.SDK.facebook_debug
		else
			if ver? and ver == 'v2.0'
				sdk.src = Socialmedia.SDK.facebookv2
			else
				sdk.src = Socialmedia.SDK.facebook
		fbdiv = doc.createElement 'div'
		fbdiv.id = 'fb-root'
		ref = doc.getElementsByTagName(tag)[0]
		ref.parentNode.insertBefore fbdiv, ref
		ref.parentNode.insertBefore sdk, ref
		return
	)(document, _this.debug, 'script','facebook-jssdk', _this.version)

### Facebook canvas setsize function ###
Socialmedia.Facebook.prototype.setSize = (settings) ->
	if settings? and settings.width or settings.height
		FB.Canvas.setSize
			width: parseInt(settings.width) or 810
			height: parseInt(settings.height) or 800
	else FB.Canvas.setSize()

### Facebook canvas autogrow function ###
Socialmedia.Facebook.prototype.autogrow = (settings = true) ->
	FB.Canvas.setAutoGrow settings

### Facebook canvas scroll function ###
Socialmedia.Facebook.prototype.scroll = (settings) ->
	x = if settings? and settings.x? then settings.x or 0
	y = if settings? and settings.y? then settings.y or 0
	if x and y then FB.Canvas.scrollTo x, y else false

### Facebook share function ###
Socialmedia.Facebook.prototype.Share = (options) ->
	FB.ui
		method: 'feed'
		name: options and options.title? and options.title or ''
		link: options and options.link? and options.link or ''
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
Socialmedia.Facebook.prototype.Invite = (options) ->
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
			options.callback?.call this, response
		else false

### Facebook add to page tab function ###
Socialmedia.Facebook.prototype.AddToPage = () ->
	FB.ui method: 'pagetab', ->

### Facebook add friend function ###
Socialmedia.Facebook.prototype.AddFriend = (options) ->
	FB.ui
	  method: 'friends'
	  id: options and options.id? and options.id || 'jabranr'
	,
	(response) ->
		if response?
			options.callback?.call this, response.action
		else false

### Facebook send function ###
Socialmedia.Facebook.prototype.Send = (options) ->
	FB.ui
	  method: 'send'
	  link: options? and options.link? and options.link or window.location.href

### Facebook pay function ###
Socialmedia.Facebook.prototype.Pay = (options) ->
	FB.ui
	  method: 'pay'
	  action: 'purchaseitem'
	  product: options? and options.link? and options.link or window.location.href
	, (data) ->
		if data?
			options? and options.callback?.call this, data
		else false