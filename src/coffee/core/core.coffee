! do (root = this, factory = do ->

	'use strict';

	### Setup current or default protocol ###
	defaultProtocol = if window.location.protocol is 'file:' then 'http:' else window.location.protocol

	### Global object with unique identifier ###
	Socialmedia =

		### Version ###
		version: "1.8.6",

		### Setup SDK sources ###
		SDK:
			facebook: defaultProtocol + '//connect.facebook.net/en_US/all.js'
			facebook_debug: defaultProtocol + '//connect.facebook.net/en_US/all/debug.js'
			facebookv2: defaultProtocol + '//connect.facebook.net/en_US/sdk.js'
			facebook_debugv2: defaultProtocol + '//connect.facebook.net/en_US/sdk/debug.js'
			twitter: defaultProtocol + '//platform.twitter.com/widgets.js'
			googleplus: defaultProtocol + '//apis.google.com/js/platform.js'
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
					s += ",left=#{(window.outerWidth / 2) - (this.width / 2)}"
					s += ",top=#{(window.outerHeight / 2) - (this.height / 2)}"
					s += ",#{this.features.join ','}"
			_popup = window.open url, '_w_' + new Date().getUTCMilliseconds(), options.getFeatures()
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

	Socialmedia

	)->
		### Setup modular support ###
		if typeof define is 'function' and typeof define.amd is 'object' and define.amd
			define ['Socialmedia'], factory

		else if typeof module isnt 'undefined' and typeof exports is 'object'
			module.exports = factory

		else
			window.Socialmedia ?= factory

		return


### Global init method ###
