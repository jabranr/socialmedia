! do (root = @, factory = (root) ->

	'use strict';

	### Setup current or default protocol ###
	defaultProtocol = if root.location and root.location.protocol is 'https:' then 'https:' else 'http:'

	### Save the reference to previous owner ###
	haveSocialmedia = root.Socialmedia

	### Locally scoped object literal ###
	app =

		### noConflict to return the reference to previous owner ###
		noConflict: ->
			root.Socialmedia = haveSocialmedia
			return @

		### Current stable version. Keep it in sync with package.json ###
		VERSION: "1.8.6",

		### Setup SDK sources ###
		SDK:
			facebook: defaultProtocol + '//connect.facebook.net/en_US/all.js'
			facebook_debug: defaultProtocol + '//connect.facebook.net/en_US/all/debug.js'
			facebookv2: defaultProtocol + '//connect.facebook.net/en_US/sdk.js'
			facebook_debugv2: defaultProtocol + '//connect.facebook.net/en_US/sdk/debug.js'
			twitter: defaultProtocol + '//platform.twitter.com/widgets.js'
			googleplus: defaultProtocol + '//apis.google.com/js/client:platform.js'
			pinterest: defaultProtocol + '//assets.pinterest.com/js/pinit.js'
			parse_debug: defaultProtocol + '//www.parsecdn.com/js/parse-1.4.2.js'
			parse: defaultProtocol + '//www.parsecdn.com/js/parse-1.4.2.min.js'

		### Default popup method ###
		Popup: (url = 'about:blank', settings = {}) ->
			options =
				width: settings.width or 600
				height: settings.height or 300
				features: settings.features or [
					'dialog'
					'location'
					'dependent'
				]
				getFeatures: ->
					s = "width=#{this.width},height=#{this.height}"
					s += ",left=#{(root.outerWidth / 2) - (this.width / 2)}"
					s += ",top=#{(root.outerHeight / 2) - (this.height / 2)}"
					s += ",#{this.features.join ','}"
			_popup = root.open url, '_w_' + new Date().getUTCMilliseconds(), options.getFeatures()
			if _popup then _popup.focus();

		### Global method to load required SDK ###
		LoadSDK: (id, src) ->
			return if document.getElementById id
			sdk = document.createElement 'script'
			sdk.id = id
			sdk.async = true
			sdk.src = src

			ref = document.getElementsByTagName('script')[0]
			ref.parentNode.insertBefore sdk, ref

			if  id == 'facebook-jssdk'
				div = document.createElement 'div'
				div.id = 'fb-root'
				ref.parentNode.insertBefore div, ref
			return

	# Return app
	app

	)->
		### Setup AMD global ###
		### Setup Node.js, Common.js global ###
		### Setup browser global ###
		if typeof define is 'function' and define.amd
			define 'Socialmedia', [], ->
				root.Socialmedia = factory root
				return

		else if typeof exports isnt 'undefined'
			if typeof module isnt 'undefined' and module.exports
				exports = module.exports = factory root
			exports = factory root

		else
			root.Socialmedia = factory root

		return
