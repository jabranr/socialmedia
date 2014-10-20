### Facebook object ###

class Socialmedia.Facebook
	### Constructor method ###
	constructor: (settings = { })->

		### Throw error if app id is not provided ###
		throw new Error 'Facebook app ID is required' unless settings.appid?

		### Throw error if app id is not a string ###
		throw new Error 'Facebook app ID must be a string' unless typeof settings.appid is 'string'

		### Setup default variables ###
		@appid		= settings.appid
		@status		= settings.status		or false
		@channel	= settings.channel		or document.location.href
		@xfbml		= settings.xfbml		or true
		@cookie		= settings.cookie		or true
		@requests	= settings.requests		or false
		@version	= settings.version		or 'v2.1'
		@debug		= settings.debug		or false
		@autogrow 	= settings.autogrow 	or true
		@callback	= settings.callback		or ->
		@init()
		return @

	init: ->
		that = @
		window.fbAsyncInit = ->
			FB.init
				appId: that.appid
				status: that.status
				channelUrl: that.channel
				cookie: that.cookie
				xfbml: that.xfbml
				version: that.version
				frictionlessRequests: that.requests
			
			### Setup FB SDK script source ###
			that.fbsdk = document.getElementById 'facebook-jssdk'

			
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
				if ver is 'v1.0'
					sdk.src = Socialmedia.SDK.facebook_debug
				else
					sdk.src = Socialmedia.SDK.facebook_debugv2
			else
				if ver is 'v1.0'
					sdk.src = Socialmedia.SDK.facebook
				else
					sdk.src = Socialmedia.SDK.facebookv2
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
	Share: (@shareOptions = { }) ->

		###
		# Default options
		#
		# method: 'feed'
		# name: Text (Title)
		# link: Absolute URL
		# picture: Absolute URL
		# caption: Text
		# description: Text
		# callback: Function
		###

		@shareOptions.method = 'feed'
		@shareOptions.callback ?= (response) ->

		### Legacy support ###
		@shareOptions.name ?= shareOptions and shareOptions.title if shareOptions and shareOptions.title?
		@shareOptions.picture ?= shareOptions and shareOptions.image if shareOptions and shareOptions.image?

		# throw new Error 'URL is missing' unless @shareOptions.link?

		that = @
		FB.ui @shareOptions, (response) ->
			if response?
				that.shareOptions.callback?.call this, response


	### Facebook invite function ###
	Invite: (@inviteOptions = { }) ->

		###
		# Default options
		#
		# method: 'apprequests'
		# title: Text (Title)
		# message: Text
		# to: Array
		# exclude_ids: Array
		# max_recipients: Number
		# data: Object
		# callback: Function
		###

		@inviteOptions.method = 'apprequests'

		that = @
		FB.ui @inviteOptions, (response) ->
			if response?
				that.inviteOptions.callback?.call this, response

	### Facebook add to page tab function ###
	AddToPage: () ->
		FB.ui method: 'pagetab', ->

	### Facebook add friend function ###
	AddFriend: (@friendOptions = { }) ->

		###
		# Default options
		#
		# method: 'friends'
		# id: Facebook ID or username
		# callback: Function
		###

		@friendOptions.method = 'friends'

		that = @
		FB.ui @friendOptions, (response) ->
			if response?
				that.friendOptions.callback?.call this, response

	### Facebook send function ###
	Send: (@sendOptions = { }) ->

		###
		# Default options
		#
		# method: 'send'
		# link: Absolute URL
		###

		@sendOptions.method = 'send'
		
		FB.ui @sendOptions

	### Facebook pay function ###
	Pay: (@payOptions = { }) ->
		
		###
		# Default options
		#
		# method: 'pay'
		# action: 'purchaseitem'
		# product: Absolute URL
		# callback: Function
		###

		@payOptions.method = 'pay'
		@payOptions.action = 'purchaseitem'

		that = @
		FB.ui @payOptions, (data) ->
			if data?
				that.payOptions? and payOptions.callback?.call this, data