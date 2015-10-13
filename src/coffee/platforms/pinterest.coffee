! do (root = @, doc = document, factory = (root, doc) ->

	'use strict';

	### Pinterest object ###
	class Pinterest
		constructor: ->
			@init()
			return @

		### Pinterest init method ###
		init: ->
			that = @
			Socialmedia.LoadSDK 'pinterest-jssdk', Socialmedia.SDK.pinterest

		### Pinterest share method ###
		Pinit: (options = { }) ->
			platformUrl = '//pinterest.com/pin/create/button/?'
			data = options.link? and "url=#{encodeURIComponent options.link }" or "url=#{encodeURIComponent root.location.href}"
			data += options.image? and "&media=#{encodeURIComponent options.image }" or ""
			data += options.description? and "&description=#{encodeURIComponent options.description }" or "&description=#{encodeURIComponent doc.title}"
			Socialmedia.Popup.apply @, [platformUrl + data,
				width: 765
				height: 325
			]

	# Return Pinterest
	Pinterest

	)->
		### Add to global object ###
		root.Socialmedia.Pinterest = factory root, doc

		if typeof module isnt 'undefined' and module.exports
			module.exports = factory root, doc

		return
