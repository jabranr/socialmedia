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
# Socialmedia.init = (options) ->

# 	if options? and typeof options isnt 'undefined'
# 		options = 
# 			services: [
# 				'facebook'
# 				'twitter'
# 				'googleplus'
# 				'pinterest'
# 			] 
# 			appid: ''

# 	if options.services.indexOf 'twitter' isnt -1
# 		__sm_twitter = new Socialmedia.Twitter
# 	else if options.services.indexOf 'googleplus' isnt -1
# 		__sm_googleplus = new Socialmedia.GooglePlus
# 	else if options.services.indexOf 'facebook' isnt -1 and options.app_id?
# 		__sm_facebook = new Socialmedia.Facebook appid: options.app_id
# 	else if options.services.indexOf 'pinterest' isnt -1
# 		__sm_pinterest = new Socialmedia.Pinterest
# 	else
# 		return false