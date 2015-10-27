var expect;

// Setup for browser and node testing
if ( typeof exports !== 'undefined' ) {
	var chai = require('chai');
	expect = chai.expect;
}
else {
	expect = chai.expect;
}

// Global obejct test
describe('Socialmedia', function()	{

	describe('Socialmedia version', function()	{
		it('should return current version', function() {
			expect(Socialmedia.VERSION).to.equal('1.7.8');
		});
	});

	describe('Facebook Graph API version', function()	{
		it('should return latest Facebook Graph API version', function() {
			expect(Socialmedia.GRAPH_API_VERSION).to.equal('v2.5');
		});
	});

	describe('Setup Socialmedia', function()	{
		it('should return an object', function() {
			expect(typeof Socialmedia).to.equal('object');
		});
	});

	// Facebook tests
	describe('Facebook', function()	{
		describe('constructor', function()	{

			it('should load latest Facebook SDK by default', function()	{
				(new Socialmedia.Facebook({
					appid: '1234567890'
				}));
				var fbsdk = document.getElementById('facebook-jssdk');
				expect(fbsdk.src).to.equal(Socialmedia.SDK.facebookv2);
			});

			describe('App ID', function()	{

				it('should throw error if no Facebook app ID', function()	{
					expect(function()	{
						(new Socialmedia.Facebook());
					}).to.throw(TypeError);
				});

				it('should throw error if Facebook app ID is not a string', function()	{
					expect(function()	{
						new Socialmedia.Facebook({
							appid: 1234567890
						});
					}).to.throw(TypeError);
				});

				it('should set Facebook app id if provided', function()	{
					var fb = new Socialmedia.Facebook({
						appid: '1234567890'
					});
					expect(fb.appid).to.equal('1234567890');
				});

			});

			describe('Locale', function()	{

				it('should throw error if locale is not string', function()	{
					expect(function()	{
						(new Socialmedia.Facebook({
							appid: '1234567890',
							locale: 123
						}));
					}).to.throw(TypeError);
				});
			});

			describe('SDK Version', function()	{

				it('should set default Facebook SDK version to latest', function()	{
					var fb = new Socialmedia.Facebook({
						appid: '1234567890'
					});
					expect(fb.version).to.equal(Socialmedia.GRAPH_API_VERSION);
				});

				it('should set Facebook SDK version if provided', function()	{
					var fb = new Socialmedia.Facebook({
						appid: '1234567890',
						version: 'v1.0'
					});
					expect(fb.version).to.equal('v1.0');
				});

			});

			describe('Channel URL', function() {

				it('should set default channel URL', function() {
					var fb = new Socialmedia.Facebook({
						appid: '1234567890'
					});
					expect(fb.channel).to.equal('');
				});

				it('should set to channel URL provided', function() {
					var fb = new Socialmedia.Facebook({
						appid: '1234567890',
						channel: '//example.com'
					});
					expect(fb.channel).to.equal('//example.com');
				});

			});

			describe('Cookie', function()	{

				it('should set default SDK cookie argument to true', function()	{
					var fb = new Socialmedia.Facebook({
						appid: '1234567890'
					});
					expect(fb.cookie).to.equal(true);
				});

				/**
				 * Following test requires Facebook SDKs to be reset and reloaded
				 */

				// it('should set Facebook SDK cookie if provided', function()	{
				// 	var fb = new Socialmedia.Facebook({
				// 		appid: '1234567890',
				// 		cookie: false
				// 	});
				// 	expect(fb.cookie).to.equal(false);
				// });

			});

			describe('XFBML', function()	{

				it('should set default SDK xfbml argument to true', function()	{
					var fb = new Socialmedia.Facebook({
						appid: '1234567890'
					});
					expect(fb.xfbml).to.equal(true);
				});

				/**
				 * Following test requires Facebook SDKs to be reset and reloaded
				 */

				// it('should set Facebook SDK xfbml if provided', function()	{
				// 	var fb = new Socialmedia.Facebook({
				// 		appid: '1234567890',
				// 		xfbml: false
				// 	});
				// 	expect(fb.xfbml).to.equal(false);
				// });

			});

			describe('Status', function()	{
				it('should set default SDK status argument to false', function()	{
					var fb = new Socialmedia.Facebook({
						appid: '1234567890'
					});
					expect(fb.status).to.equal(false);
				});

				it('should set Facebook SDK status if provided', function()	{
					var fb = new Socialmedia.Facebook({
						appid: '1234567890',
						status: true
					});
					expect(fb.status).to.equal(true);
				});
			});

			describe('Frictionless Requests', function()	{
				it('should set default SDK frictionless request argument to false', function()	{
					var fb = new Socialmedia.Facebook({
						appid: '1234567890'
					});
					expect(fb.requests).to.equal(false);
				});

				it('should set Facebook SDK frictionless request if provided', function()	{
					var fb = new Socialmedia.Facebook({
						appid: '1234567890',
						requests: true
					});
					expect(fb.requests).to.equal(true);
				});
			});

			describe('Debug', function()	{
				it('should set default debug argument to false', function()	{
					var fb = new Socialmedia.Facebook({
						appid: '1234567890'
					});
					expect(fb.debug).to.equal(false);
				});

				it('should set debug argument if provided', function()	{
					var fb = new Socialmedia.Facebook({
						appid: '1234567890',
						debug: true
					});
					expect(fb.debug).to.equal(true);
				});
			});

			describe('Autogrow', function()	{
				it('should set default SDK autogrow argument to true', function()	{
					var fb = new Socialmedia.Facebook({
						appid: '1234567890'
					});
					expect(fb.autogrow).to.equal(true);
				});
			});

			describe('Callback', function()	{
				it('should set default callback argument to anonymous function', function()	{
					var fb = new Socialmedia.Facebook({
						appid: '1234567890'
					});
					expect(typeof fb.callback).to.equal('function');
				});

				it('should set a callback function if provided', function()	{
					var fb = new Socialmedia.Facebook({
						appid: '1234567890',
						callback: function(response) {}
					});
					expect(typeof fb.callback).to.equal('function');
				});
			});

			describe('Parse', function() {
				it('should set to default if no Parse app ID given', function()	{
					var fb = new Socialmedia.Facebook({
						appid: '1234567890'
					});
					expect(fb.parse).to.equal(false);
					expect(fb.parseId).to.equal(null);
				});

				it('should set to default if no Parse JavaScript Key given', function()	{
					var fb = new Socialmedia.Facebook({
						appid: '1234567890'
					});
					expect(fb.parse).to.equal(false);
					expect(fb.parseKey).to.equal(null);
				});

				it('should set to default if either Parse app ID or JavaScript Key missing', function()	{
					var fb = new Socialmedia.Facebook({
						appid: '1234567890',
						parseId: '1234567890'
					});
					expect(fb.parse).to.equal(false);
				});

				it('should throw error if Parse app ID and JavaScript Key given but Parse not found', function()	{
					expect(function() {
						(new Socialmedia.Facebook({
							appid: '1234567890',
							parseId: '1234567890',
							parseKey: '1234567890'
						}))
					}).to.throw(Error);
				});
			});
		});

	});


	// Twitter tests
	describe('Twitter', function()	{
		describe('constructor', function()	{
			it('should load Twitter SDK', function()	{
				(new Socialmedia.Twitter());
				var twitterSDK = document.getElementById('twitter-wjs');
				expect(twitterSDK.src).to.equal(Socialmedia.SDK.twitter);
			});
		});
	});


	// GooglePlus tests
	describe('GooglePlus', function()	{
		describe('constructor', function()	{
			it('should load Google+ SDK', function()	{
				(new Socialmedia.GooglePlus());
				var gplusSDK = document.getElementById('gplus-jssdk');
				expect(gplusSDK.src).to.equal(Socialmedia.SDK.googleplus);
			});

			describe('App/Client ID', function()	{
				it('should throw error if not a string', function()	{
					expect(function() {
						new Socialmedia.GooglePlus({
							client_id: 12321312
						})
					}).to.throw(TypeError);
				});
			});
		});

		describe('Sign in with Google API', function()	{
			it('should throw error if no client_id', function()	{
				var gplus = new Socialmedia.GooglePlus();
				expect(function() {
					gplus.SignIn()
				}).to.throw(TypeError);
			});
		});

	});


	// Pinterest tests
	describe('Pinterest', function()	{
		describe('constructor', function()	{
			it('should load Pinterest SDK', function()	{
				(new Socialmedia.Pinterest());
				var pinterestSDK =  document.getElementById('pinterest-jssdk');
				expect(pinterestSDK.src).to.equal(Socialmedia.SDK.pinterest);
			});
		});
	});

});