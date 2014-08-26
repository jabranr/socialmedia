### Facebook object ###

class Socialmedia.Facebook
	### Constructor method ###
	constructor: (settings = { })->

		### Fulfil crucial app id requirements ###
		throw new Error 'Facebook app ID is required' unless settings.appid?

		### Setup default variables ###
		@appid		= settings.appid
		@status		= settings.status	or false
		@xfbml		= settings.xfbml	or true
		@cookie		= settings.cookie	or true
		@requests	= settings.requests	or false
		@version	= settings.version	or ''
		@debug		= settings.debug	or false
		@autogrow 	= settings.autogrow or true
		@callback	= settings.callback	or ->
		@init()
		return

	init: ->
		that = @
		window.fbAsyncInit = ->
			FB.init
				appId: that.appid
				status: that.status
				cookie: that.cookie
				xfbml: that.xfbml
				version: that.version
				frictionlessRequests: that.requests
			
			### Setup FB SDK script source ###
			that.fbsdk = document.getElementById '#facebook-jssdk'
			
			### Append app_id to fbsdk source ###
			if that.fbsdk?
				that.fbsdk.src += '#xfbml=1&appId=' + that.appid

			### Facebook canvas autogrow function ###
			FB.Canvas.setAutoGrow that.autogrow

			### Async callback function ###
			if that.callback?
				FB.getLoginStatus that.callback
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
				if ver is '' or ver isnt 'v1.0'
					sdk.src = Socialmedia.SDK.facebook_debugv2
				else
					sdk.src = Socialmedia.SDK.facebook_debug
			else
				if ver is '' or ver isnt 'v1.0'
					sdk.src = Socialmedia.SDK.facebookv2
				else
					sdk.src = Socialmedia.SDK.facebook
			fbdiv = doc.createElement 'div'
			fbdiv.id = 'fb-root'
			ref = doc.getElementsByTagName(tag)[0]
			ref.parentNode.insertBefore fbdiv, ref
			ref.parentNode.insertBefore sdk, ref
			return
		)(document, that.debug, 'script','facebook-jssdk', that.version)

	### Facebook canvas setsize function ###
	setSize: (settings = { }) ->
		if settings.width? or settings.height?
			FB.Canvas.setSize
				width	: parseInt(settings.width)	or 810
				height	: parseInt(settings.height)	or 800
		else FB.Canvas.setSize()

	### Facebook canvas scroll function ###
	scroll: (settings = { }) ->
		x = settings.x or 0
		y = settings.y or 0
		if x and y then FB.Canvas.scrollTo x, y

	### Facebook share function ###
	Share: (options = { }) ->
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
	Invite: (options = { }) ->
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
	AddToPage: () ->
		FB.ui method: 'pagetab', ->

	### Facebook add friend function ###
	AddFriend: (options = {}) ->
		FB.ui
		  method: 'friends'
		  id: options.id || 'jabranr'
		,
		(response) ->
			if response?
				options.callback?.call this, response.action
			else false

	### Facebook send function ###
	Send: (options = {}) ->
		FB.ui
		  method: 'send'
		  link: options.link or window.location.href

	### Facebook pay function ###
	Pay: (options = {}) ->
		FB.ui
		  method: 'pay'
		  action: 'purchaseitem'
		  product: options.link or window.location.href
		, (data) ->
			if data?
				options? and options.callback?.call this, data
			else false