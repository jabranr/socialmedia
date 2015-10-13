! do (root = @, doc = document, factory = (root, doc) ->

	'use strict';

	### Twitter object ###
	class Twitter
		constructor: ->
			@init()
			return @

		### Twitter init method ###
		init: ->
			that = @
			Socialmedia.LoadSDK 'twitter-wjs', Socialmedia.SDK.twitter

		### Twitter share link method ###
		Tweet: (options = { }) ->
			intentShareUrl = '//twitter.com/intent/tweet?'
			data = if options.tweet then "text=#{encodeURIComponent options.tweet}" else "text=#{encodeURIComponent doc.title} "
			data += if options.hashtag then "&hashtags=#{encodeURIComponent options.hashtag.replace '/#/', ''} " else ''
			data += if options.recommend then "&related=#{encodeURIComponent options.recommend.replace '/@/', ''} " else ''
			data += if options.via then "&via=#{encodeURIComponent options.via.replace '/@/', ''} " else ''
			data += if options.link then "&url=#{encodeURIComponent options.link} " else "&url=#{encodeURIComponent root.location.href} "
			Socialmedia.Popup.apply @, [intentShareUrl + data]

		### Twitter Follow method ###
		Follow: (username = 'socialmedia_js') ->
			username.replace /@/, ''
			intentFollowUrl = '//twitter.com/intent/follow?'
			Socialmedia.Popup.apply @, [intentFollowUrl + "screen_name=#{username}",
					width: 700
					height: 485
				]

		###
		# Twitter Mention method
		# Supports multiple recommendations separated by commas
		###
		Mention: (options = { }) ->
			intentMentionUrl = '//twitter.com/intent/tweet?'
			data = options.username and "screen_name=#{encodeURIComponent options.username.replace /@/, ''}" or ''
			data += options.recommend and "&related=#{encodeURIComponent options.recommend.replace /@/, ''}" or ''
			data += options.tweet and "&text=#{encodeURIComponent options.tweet}" or ''
			Socialmedia.Popup.apply @, [intentMentionUrl + data]

		###
		# Twitter Hashtag method
		# Supports multiple recommendations separated by commas
		###
		Hashtag: (options = { }) ->
			intentHashtagUrl = '//twitter.com/intent/tweet?'
			data = options.hashtag and "button_hashtag=#{encodeURIComponent options.hashtag.replace /#/, ''}" or ''
			data += options.recommend and "&related=#{encodeURIComponent options.recommend.replace /@/, ''}" or ''
			data += options.tweet and "&text=#{encodeURIComponent options.tweet}" or ''
			data += options.link and "&url=#{encodeURIComponent options.link}" or ''
			Socialmedia.Popup.apply @, [intentHashtagUrl + data]

	# Return Twitter
	Twitter

	)->
		### Add to global object ###
		root.Socialmedia.Twitter = factory root, doc

		if typeof module isnt 'undefined' and module.exports
			module.exports = factory root, doc

		return

