describe('Socialmedia', function() {
  describe('Socialmedia version', function() {
    xit('should return current version', function() {
      expect(Socialmedia.VERSION).to.equal('2.1.3');
    });
  });

  describe('Facebook Graph API version', function() {
    xit('should return latest Facebook Graph API version', function() {
      expect(Socialmedia.GRAPH_API_VERSION).to.equal('v2.8');
    });
  });

  describe('Minimum Facebook Graph API version', function() {
    xit('should return minimum Facebook Graph API version', function() {
      expect(Socialmedia.MIN_GRAPH_API_VERSION).to.equal(2.5);
    });
  });

  describe('SDKs & Helpers', function() {
    xit('should return an object', function() {
      expect(typeof Socialmedia.SDK).to.equal('object');
    });

    describe('Facebook SDKs', function() {
      xit('should have "facebook" property', function() {
        expect(Socialmedia.SDK).to.have.property('facebook');
      });

      xit('should contain SDK URL', function() {
        expect(Socialmedia.SDK.facebook).to.contain(
          '//connect.facebook.net/en_US/sdk.js'
        );
      });

      xit('should have "facebook_debug" property', function() {
        expect(Socialmedia.SDK).to.have.property('facebook_debug');
      });

      xit('should contain SDK URL', function() {
        expect(Socialmedia.SDK.facebook_debug).to.contain(
          '//connect.facebook.net/en_US/sdk/debug.js'
        );
      });
    });

    describe('Twitter SDKs', function() {
      xit('should have "twitter" property', function() {
        expect(Socialmedia.SDK).to.have.property('twitter');
      });

      xit('should contain SDK URL', function() {
        expect(Socialmedia.SDK.twitter).to.contain(
          '//platform.twitter.com/widgets.js'
        );
      });
    });

    describe('Google Plus SDKs', function() {
      xit('should have "googleplus" property', function() {
        expect(Socialmedia.SDK).to.have.property('googleplus');
      });

      xit('should contain SDK URL', function() {
        expect(Socialmedia.SDK.googleplus).to.contain(
          '//apis.google.com/js/client:platform.js'
        );
      });
    });

    describe('Pinterest SDKs', function() {
      xit('should have "pinterest" property', function() {
        expect(Socialmedia.SDK).to.have.property('pinterest');
      });

      xit('should contain SDK URL', function() {
        expect(Socialmedia.SDK.pinterest).to.contain(
          '//assets.pinterest.com/js/pinit.js'
        );
      });
    });

    describe('LoadSDK method', function() {
      xit('should return a DOM script element', function() {
        Socialmedia.LoadSDK('foo', Socialmedia.SDK.pinterest);
        var sdkNode = document.getElementById('foo');
        expect(sdkNode.toString()).to.equal('[object HTMLScriptElement]');
      });

      xit('should return a DOM element with given ID', function() {
        Socialmedia.LoadSDK('foo', Socialmedia.SDK.pinterest);
        var sdkNode = document.getElementById('foo');
        expect(sdkNode.id).to.equal('foo');
      });

      xit('should return a DOM script element with given URL', function() {
        Socialmedia.LoadSDK('foo', Socialmedia.SDK.pinterest);
        var sdkNode = document.getElementById('foo');
        expect(sdkNode.src).to.contain('pinit.js');
      });
    });

    describe('is(Object) method', function() {
      xit('should return true when tested for Object', function() {
        expect(Socialmedia.is({}, 'object')).to.equal(true);
      });
    });

    describe('is(Array) method', function() {
      xit('should return true when tested for Array', function() {
        expect(Socialmedia.is([], 'array')).to.equal(true);
      });
    });

    describe('is(String) method', function() {
      xit('should return true when tested for String', function() {
        expect(Socialmedia.is('', 'string')).to.equal(true);
      });
    });

    describe('is(Number) method', function() {
      xit('should return true when tested for Number', function() {
        expect(Socialmedia.is(100, 'number')).to.equal(true);
      });
    });

    describe('is(Function) method', function() {
      xit('should return true when tested for Function', function() {
        expect(Socialmedia.is(function() {}, 'function')).to.equal(true);
      });
    });
  });

  describe('Setup Socialmedia', function() {
    xit('should return an object', function() {
      expect(typeof Socialmedia).to.equal('object');
    });
  });

  // Facebook tests
  describe('Facebook', function() {
    describe('constructor', function() {
      xit('should load latest Facebook SDK by default', function() {
        new Socialmedia.Facebook({
          appid: '1234567890'
        });
        var fbsdk = document.getElementById('fb-jssdk');
        expect(fbsdk.src).to.equal(Socialmedia.SDK.facebook);
      });

      xit('should throw error on outdated Facebook SDK version', function() {
        expect(function() {
          new Socialmedia.Facebook({
            appid: '1234567890',
            version: 'v1.0'
          });
        }).to.throw(TypeError);
      });

      describe('App ID', function() {
        xit('should throw error if no Facebook app ID', function() {
          expect(function() {
            new Socialmedia.Facebook();
          }).to.throw(TypeError);
        });

        xit('should throw error if Facebook app ID is not a string', function() {
          expect(function() {
            new Socialmedia.Facebook({
              appid: 1234567890
            });
          }).to.throw(TypeError);
        });

        xit('should set Facebook app id if provided', function() {
          var fb = new Socialmedia.Facebook({
            appid: '1234567890'
          });
          expect(fb.appid).to.equal('1234567890');
        });
      });

      describe('Locale', function() {
        xit('should throw error if locale is not string', function() {
          expect(function() {
            new Socialmedia.Facebook({
              appid: '1234567890',
              locale: 123
            });
          }).to.throw(TypeError);
        });
      });

      describe('SDK Version', function() {
        xit('should set default Facebook SDK version to latest', function() {
          var fb = new Socialmedia.Facebook({
            appid: '1234567890'
          });
          expect(fb.version).to.equal(Socialmedia.GRAPH_API_VERSION);
        });

        xit('should set Facebook SDK version if provided', function() {
          var fb = new Socialmedia.Facebook({
            appid: '1234567890',
            version: 'v2.6'
          });
          expect(fb.version).to.equal('v2.6');
        });
      });

      describe('Channel URL', function() {
        xit('should set default channel URL', function() {
          var fb = new Socialmedia.Facebook({
            appid: '1234567890'
          });
          expect(fb.channel).to.equal('');
        });

        xit('should set to channel URL provided', function() {
          var fb = new Socialmedia.Facebook({
            appid: '1234567890',
            channel: '//example.com'
          });
          expect(fb.channel).to.equal('//example.com');
        });
      });

      describe('Cookie', function() {
        xit('should set default SDK cookie argument to true', function() {
          var fb = new Socialmedia.Facebook({
            appid: '1234567890'
          });
          expect(fb.cookie).to.equal(true);
        });

        xit('should set Facebook SDK cookie if provided', function() {
          var fb = new Socialmedia.Facebook({
            appid: '1234567890',
            cookie: false
          });
          expect(fb.cookie).to.equal(false);
        });
      });

      describe('XFBML', function() {
        xit('should set default SDK xfbml argument to true', function() {
          var fb = new Socialmedia.Facebook({
            appid: '1234567890'
          });
          expect(fb.xfbml).to.equal(true);
        });

        xit('should set Facebook SDK xfbml if provided', function() {
          var fb = new Socialmedia.Facebook({
            appid: '1234567890',
            xfbml: false
          });
          expect(fb.xfbml).to.equal(false);
        });
      });

      describe('Status', function() {
        xit('should set default SDK status argument to false', function() {
          var fb = new Socialmedia.Facebook({
            appid: '1234567890'
          });
          expect(fb.status).to.equal(false);
        });

        xit('should set Facebook SDK status if provided', function() {
          var fb = new Socialmedia.Facebook({
            appid: '1234567890',
            status: true
          });
          expect(fb.status).to.equal(true);
        });
      });

      describe('Frictionless Requests', function() {
        xit('should set default SDK frictionless request argument to false', function() {
          var fb = new Socialmedia.Facebook({
            appid: '1234567890'
          });
          expect(fb.requests).to.equal(false);
        });

        xit('should set Facebook SDK frictionless request if provided', function() {
          var fb = new Socialmedia.Facebook({
            appid: '1234567890',
            requests: true
          });
          expect(fb.requests).to.equal(true);
        });
      });

      describe('Debug', function() {
        xit('should set default debug argument to false', function() {
          var fb = new Socialmedia.Facebook({
            appid: '1234567890'
          });
          expect(fb.debug).to.equal(false);
        });

        xit('should set debug argument if provided', function() {
          var fb = new Socialmedia.Facebook({
            appid: '1234567890',
            debug: true
          });
          expect(fb.debug).to.equal(true);
        });
      });

      describe('Autogrow', function() {
        xit('should set default SDK autogrow argument to true', function() {
          var fb = new Socialmedia.Facebook({
            appid: '1234567890'
          });
          expect(fb.autogrow).to.equal(true);
        });
      });

      describe('Callback', function() {
        xit('should set default callback argument to anonymous function', function() {
          var fb = new Socialmedia.Facebook({
            appid: '1234567890'
          });
          expect(typeof fb.callback).to.equal('function');
        });

        xit('should set a callback function if provided', function() {
          var fb = new Socialmedia.Facebook({
            appid: '1234567890',
            callback: function(response) {}
          });
          expect(typeof fb.callback).to.equal('function');
        });
      });
    });
  });

  // Twitter tests
  describe('Twitter', function() {
    describe('constructor', function() {
      xit('should load Twitter SDK', function() {
        new Socialmedia.Twitter();
        var twitterSDK = document.getElementById('twitter-wjs');
        expect(twitterSDK.src).to.equal(Socialmedia.SDK.twitter);
      });
    });
  });

  // GooglePlus tests
  describe('GooglePlus', function() {
    describe('constructor', function() {
      xit('should load Google+ SDK', function() {
        new Socialmedia.GooglePlus();
        var gplusSDK = document.getElementById('gplus-jssdk');
        expect(gplusSDK.src).to.equal(Socialmedia.SDK.googleplus);
      });

      describe('App/Client ID', function() {
        xit('should throw error if not a string', function() {
          expect(function() {
            new Socialmedia.GooglePlus({
              client_id: 12321312
            });
          }).to.throw(TypeError);
        });
      });
    });

    describe('Sign in with Google API', function() {
      xit('should throw error if no client_id', function() {
        var gplus = new Socialmedia.GooglePlus();
        expect(function() {
          gplus.SignIn();
        }).to.throw(TypeError);
      });
    });
  });

  // Pinterest tests
  describe('Pinterest', function() {
    describe('constructor', function() {
      xit('should load Pinterest SDK', function() {
        new Socialmedia.Pinterest();
        var pinterestSDK = document.getElementById('pinterest-jssdk');
        expect(pinterestSDK.src).to.equal(Socialmedia.SDK.pinterest);
      });
    });
  });
});
