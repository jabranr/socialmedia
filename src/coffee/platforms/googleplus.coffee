!do (root = @, Socialmedia) ->

    ### Google+ object ###
    class Socialmedia.GooglePlus
        constructor: (settings = { })->
            @clientid       = settings.appid or null
            @cookiepolicy   = settings.cookiepolicy or 'single_host_origin'
            @callback       = settings.callback     or ->

            @init()
            return @

        ### Google+ init method ###
        init: ->
            that = @

            root.___gcfg =
                lang: 'en-US'
                parsetags: 'onload'

            root.gplusCallback = ->
                # that.callback gapi
                root.gapi.auth.checkSessionState
                    clientid: that.clientid
                    session_state: null
                    that.callback

            if that.clientid
                Socialmedia.LoadSDK 'gplus-jssdk', (Socialmedia.SDK.googleplus + '?onload=gplusCallback')
            else
                Socialmedia.LoadSDK 'gplus-jssdk', Socialmedia.SDK.googleplus


        ### Sign in with Google ###
        SignIn: (callback = ->) ->
            return false unless root.gapi?
            that = @
            root.gapi.auth.signIn
                clientid: that.clientid
                cookiepolicy: that.cookiepolicy
                callback: callback

        ### Google+ share method ###
        Share: (options = { }) ->
        	platformUrl = '//plus.google.com/share?'
        	data = options.link? and "url=#{encodeURIComponent options.link}" or "url=#{encodeURIComponent root.location.href}"
        	data += options.lang? and "&hl=#{encodeURIComponent options.lang}" or "&hl=en"
        	Socialmedia.Popup.apply @, [platformUrl + data]
    return