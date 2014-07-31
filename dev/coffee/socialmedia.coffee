### Global object with unique identifier ###
window.Socialmedia = window.Socialmedia || {}

### Setup SDK sources ### 
Socialmedia.SDK =
	facebook: '//connect.facebook.net/en_US/all.js'
	facebook_debug: '//connect.facebook.net/en_US/all/debug.js'
	facebookv2: '//connect.facebook.net/en_US/sdk.js'
	facebook_debugv2: '//connect.facebook.net/en_US/sdk/debug.js'
	twitter: '//platform.twitter.com/widgets.js'
	googleplus: '//apis.google.com/js/platform.js'
	pinterest: '//assets.pinterest.com/js/pinit.js'

### Default popup method ###
Socialmedia.Popup = (url = 'about:blank', settings = {}) ->
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

### Global init method ###