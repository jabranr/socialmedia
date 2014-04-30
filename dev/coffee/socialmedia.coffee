### Global object with unique identifier ###
window.Socialmedia = window.Socialmedia || {}

Socialmedia.SDK =
	facebook: '//connect.facebook.net/en_US/all.js'
	facebook_debug: '//connect.facebook.net/en_US/debug/all.js'
	twitter: '//platform.twitter.com/widgets.js'

Socialmedia.Popup = (url = 'about:blank', settings = {}) ->
	options =
		width: settings.width? and settings.width or 600
		height: settings.height? and settings.height or 300
		features: settings.features? and settings.features or [
			'dialog'
			'location'
			'dependent'
		]
		getString: ->
			s = "width=#{this.width},height=#{this.height}"
			s += ",left=#{(window.outerWidth / 2) - (this.width / 2)}"
			s += ",top=#{(window.outerHeight / 2) - (this.height / 2)}"
			s += ",#{this.features.join ','}"
	_popup = window.open url, '_w_' + new Date().getUTCMilliseconds(), options.getString()
	return _popup.focus();