! do (root = this, factory = do ->

	'use strict';

	### Global object with unique identifier ###
	Socialmedia =

		### Setup SDK sources ### 
		SDK:
			facebook: '//connect.facebook.net/en_US/all.js'
			facebook_debug: '//connect.facebook.net/en_US/all/debug.js'
			facebookv2: '//connect.facebook.net/en_US/sdk.js'
			facebook_debugv2: '//connect.facebook.net/en_US/sdk/debug.js'
			twitter: '//platform.twitter.com/widgets.js'
			googleplus: '//apis.google.com/js/platform.js'
			pinterest: '//assets.pinterest.com/js/pinit.js'

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

	Socialmedia

	)->
		### Setup modular support ###
		if typeof define is 'function' and typeof define.amd is 'object' and define.amd
			define ['Socialmedia'], factory
		
		else if typeof module isnt 'undefined' and typeof exports is 'object'
			module.exports = factory

		else
			window.Socialmedia = factory;

		return


### Global init method ###
