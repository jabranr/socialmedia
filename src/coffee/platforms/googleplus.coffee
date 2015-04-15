!do (root = @, Socialmedia) ->

    ### Google+ object ###
    class Socialmedia.GooglePlus
        constructor: ->
        	@init()
        	return @

        ### Google+ init method ###
        init: ->
            that = @
            Socialmedia.LoadSDK 'gplus-jssdk', Socialmedia.SDK.googleplus

        ### Google+ share method ###
        Share: (options = { }) ->
        	platformUrl = '//plus.google.com/share?'
        	data = options.link? and "url=#{encodeURIComponent options.link}" or "url=#{encodeURIComponent root.location.href}"
        	data += options.lang? and "&hl=#{encodeURIComponent options.lang}" or "&hl=en"
        	Socialmedia.Popup.apply @, [platformUrl + data]
    return