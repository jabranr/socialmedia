### Facebook object ###

class Socialmedia.Facebook
	### Constructor method ###
	constructor: (settings = { })->

		### Throw error if app id is not provided ###
		throw new TypeError 'Facebook app ID is required' unless settings.appid?

		### Throw error if app id is not a string ###
		throw new TypeError 'Facebook app ID must be a string' unless typeof settings.appid is 'string'

		### Setup default variables ###
		@appid		= settings.appid
		@status		= settings.status		or false
		@channel	= settings.channel		or ''
		@xfbml		= settings.xfbml		or true
		@cookie		= settings.cookie		or true
		@requests	= settings.requests		or false
		@version	= settings.version		or 'v2.3'
		@debug		= settings.debug		or false
		@autogrow 	= settings.autogrow 	or true
		@callback	= settings.callback		or ->

		### Support Parse ###
		@parse		= false
		@parseId	= settings.parseId		or ''
		@parseKey	= settings.parseKey		or ''

		@init()
		return @

	init: ->
		that = @

		### Load Parse SDK if required and initialize Parse ###
		if @.parseId != '' and @.parseKey != ''
			Socialmedia.LoadSDK 'parse-jssdk', Socialmedia.SDK.parse
			parseCallback = ->
				Parse.initialize that.parseId, that.parseKey
				that.parse = true
				return

			if !Parse?
				setTimeout parseCallback, 100
			else
				parseCallback

		window.fbAsyncInit = ->
			opts =
				appId: that.appid
				status: that.status
				channelUrl: that.channel
				cookie: that.cookie
				xfbml: that.xfbml
				version: that.version
				frictionlessRequests: that.requests

			if that.parse and Parse?
				Parse.FacebookUtils.init opts
			else
				FB.init opts

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
		if that.debug
			if that.version is 'v1.0'
				src = Socialmedia.SDK.facebook_debug
			else
				src = Socialmedia.SDK.facebook_debugv2
		else
			if that.version is 'v1.0'
				src = Socialmedia.SDK.facebook
			else
				src = Socialmedia.SDK.facebookv2

		### Load Facebook SDK ###
		Socialmedia.LoadSDK 'facebook-jssdk', src

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
		# method: 'share'
		# href: Absolute URL
		# callback: Function
		###

		@shareOptions.method = 'share'
		@shareOptions.callback ?= (response) ->

		throw new TypeError 'href attribute is missing' unless @shareOptions.href?

		that = @
		FB.ui @shareOptions, (response) ->
			if response?
				that.shareOptions.callback?.call this, response

	### Facebook share_open_graph function ###
	ShareOpenGraph: (@shareOptions = { }) ->

		###
		# Default options
		#
		# method: 'share_open_graph'
		# action_type: String Open Graph action type e.g. og.likes
		# action_properties: Object key/value pair. e.g. object: {URL}
		# callback: Function
		###

		throw new TypeError 'Open Graph action type is missing' unless @shareOptions.action_type?
		throw new TypeError 'Open Graph action properties is missing' unless @shareOptions.action_properties?

		@shareOptions.method = 'share_open_graph'
		@shareOptions.callback ?= (response) ->
		@shareOptions.action_properties = JSON.stringify(@shareOptions.action_properties)

		that = @
		FB.ui @shareOptions, (response) ->
			if response?
				that.shareOptions.callback?.call this, response

	### Facebook share function (Legacy support) ###
	Feed: (@shareOptions = { }) ->

		###
		# Default options
		#
		# method: 'feed'
		# name: String (Title)
		# link: Absolute URL
		# picture: Absolute URL
		# caption: String
		# description: String
		# callback: Function
		###

		throw new TypeError 'name attribute is missing' unless @shareOptions.name?
		throw new TypeError 'link attribute is missing' unless @shareOptions.link?

		@shareOptions.method = 'feed'
		@shareOptions.callback ?= (response) ->

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
		# title: String (Title)
		# message: String
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