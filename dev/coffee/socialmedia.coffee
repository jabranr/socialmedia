### Global object with unique identifier ###
window.Socialmedia = window.Socialmedia || {}

### Setup SDK sources ### 
Socialmedia.SDK =
	facebook: '//connect.facebook.net/en_US/all.js'
	facebook_debug: '//connect.facebook.net/en_US/debug/all.js'
	twitter: '//platform.twitter.com/widgets.js'
	googleplus: '//apis.google.com/js/platform.js'

### Default popup method ###
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

### Global init method ###
Socialmedia.init = (services = [], id = '') ->

	defaultServices =
		'facebook': 'Facebook'
		'twitter': 'Twitter'
		'googleplus': 'GooglePlus'
		'pinterest': 'Pinterest'

	# if services.length
	# 	for i in services
	# 		if services[i] of defaultServices
	# 			new Socialmedia.defaultServices[services[i]]
	# else
	# 	for x of defaultServices
	# 		new Socialmedia.defaultServices[x]
	# return

	# for i in defaultServices
	# 	if services.indexOf defaultServices[i] isnt -1
	# 		if defaultServices[i] === 'facebook'

	# if services.indexOf 'twitter' isnt -1
	# 	__twitter = new Socialmedia.Twitter
	# else if services.indexOf 'googleplus' isnt -1
	# 	__googleplus = new Socialmedia.GooglePlus

	# else if services.indexOf 'facebook' isnt -1
	# 	__facebook = new Socialmedia.Facebook id
