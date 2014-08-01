### Facebook object ###

Socialmedia.Facebook = (settings)->
	this.appid		= settings.appid	or ''
	this.status		= settings.status	or false
	this.xfbml		= settings.xfbml	or true
	this.cookie		= settings.cookie	or true
	this.requests	= settings.requests	or false
	this.version	= settings.version	or ''
	this.debug		= settings.debug	or false
	this.callback	= settings.callback	or ->
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
		_this.fbsdk = document.getElementById '#facebook-jssdk'
		
		### Append app_id to fbsdk source ###
		if _this.fbsdk?
			_this.fbsdk.src += '#xfbml=1&appId=' + _this.appid


		### Async callback function ###
		if _this.callback?
			FB.getLoginStatus _this.callback
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
			width	: parseInt(settings.width)	or 810
			height	: parseInt(settings.height)	or 800
	else FB.Canvas.setSize()

### Facebook canvas autogrow function ###
Socialmedia.Facebook.prototype.autogrow = (settings = true) ->
	FB.Canvas.setAutoGrow settings

### Facebook canvas scroll function ###
Socialmedia.Facebook.prototype.scroll = (settings = {}) ->
	x = settings.x or 0
	y = settings.y or 0
	if x and y then FB.Canvas.scrollTo x, y else false

### Facebook share function ###
Socialmedia.Facebook.prototype.Share = (options = {}) ->
	FB.ui
		method		:	'feed'
		name		: 	options.title		or ''
		link		: 	options.link		or ''
		picture		: 	options.image		or ''
		caption		: 	options.caption		or ''
		description	: 	options.description	or ''
	, 
	(response) ->
		if response?
			if options.onSuccess? 
				options.onSuccess?.call this, response
			else if options.onFail? 
				options.onFail?.call this, response
		else false

### Facebook invite function ###
Socialmedia.Facebook.prototype.Invite = (options = {}) ->
	FB.ui
		method			:	'apprequests'
		title			:	options.title		or ''
		message			:	options.message		or ''
		to				:	options.to			or []
		exclude_ids		:	options.exclude_ids	or []
		max_recipients	:	options.max_to		or 100
		data			:	options.data		or {}
	, 
	(response) ->
		if response?
			options.callback?.call this, response
		else false

### Facebook add to page tab function ###
Socialmedia.Facebook.prototype.AddToPage = () ->
	FB.ui method: 'pagetab', ->

### Facebook add friend function ###
Socialmedia.Facebook.prototype.AddFriend = (options = {}) ->
	FB.ui
	  method: 'friends'
	  id: options.id || 'jabranr'
	,
	(response) ->
		if response?
			options.callback?.call this, response.action
		else false

### Facebook send function ###
Socialmedia.Facebook.prototype.Send = (options = {}) ->
	FB.ui
	  method: 'send'
	  link: options.link or window.location.href

### Facebook pay function ###
Socialmedia.Facebook.prototype.Pay = (options = {}) ->
	FB.ui
	  method: 'pay'
	  action: 'purchaseitem'
	  product: options.link or window.location.href
	, (data) ->
		if data?
			options? and options.callback?.call this, data
		else false