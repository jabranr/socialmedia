! do (root = @, doc = document, factory = (root, doc) ->

    'use strict';

    ### Google+ object ###
    class GooglePlus
        constructor: (settings = { })->
            @client_id      = settings.appid or settings.client_id or null
            @cookiepolicy   = settings.cookiepolicy or 'single_host_origin'
            @scope          = settings.scope or 'https://www.googleapis.com/auth/plus.login'
            @callback       = settings.callback or ->

            ### Throw error if client_id / appid is not a string ###
            if @client_id isnt null
                throw new TypeError 'Google client_id/appid must be a string' unless typeof @client_id is 'string'

            @init()
            return @

        ### Google+ init method ###
        init: ->
            that = @

            root.___gcfg =
                lang: 'en-US'
                parsetags: 'onload'

            root.gplusCallback = (authResponse) ->

                ### Throw error if client_id is not provided ###
                throw new TypeError 'Google app/client ID is required' unless that.client_id?

                root.gapi.auth.authorize
                    client_id: that.client_id
                    scope: that.scope
                    immediate: true
                    that.callback

            if that.client_id
                Socialmedia.LoadSDK 'gplus-jssdk', (Socialmedia.SDK.googleplus + '?onload=gplusCallback')
            else
                Socialmedia.LoadSDK 'gplus-jssdk', Socialmedia.SDK.googleplus


        ### Sign in with Google ###
        SignIn: (callback = ->) ->
            throw TypeError('Requires Client/App ID') if !root.gapi or !@client_id
            that = @
            root.gapi.auth.authorize
                client_id: that.client_id
                scope: that.scope
                that.callback
            return

        ### Google+ share method ###
        Share: (options = { }) ->
        	platformUrl = '//plus.google.com/share?'
        	data = options.link? and "url=#{encodeURIComponent options.link}" or "url=#{encodeURIComponent root.location.href}"
        	data += options.lang? and "&hl=#{encodeURIComponent options.lang}" or "&hl=en"
        	Socialmedia.Popup.apply @, [platformUrl + data]

    # Return GooglePlus
    GooglePlus

    )->
        ### Add to global object ###
        root.Socialmedia.GooglePlus = factory root, doc

        if typeof module isnt 'undefined' and module.exports
            module.exports = factory root, doc

        return

