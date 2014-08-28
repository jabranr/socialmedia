var expect = chai.expect;

describe('Socialmedia', function()	{

	describe('constructor', function()	{
		it('should return an object', function() {
			var socialmedia = window.Socialmedia;
			expect(typeof socialmedia).to.equal('object');
		});
	});
	
	// Facebook tests
	describe('Facebook', function()	{
		describe('constructor', function()	{

			it('should load latest Facebook SDK', function()	{
				(new Socialmedia.Facebook({
					appid: '322056601296318'
				}));
				var fbsdk = document.getElementById('facebook-jssdk');
				expect(fbsdk.src.replace(/((http[s]?)|(file)):/, '')).to.equal(Socialmedia.SDK.facebookv2);
			});

			describe('App ID', function()	{
			
				it('should throw error if no Facebook app ID', function()	{
					expect(function()	{
						(new Socialmedia.Facebook());
					}).to.throw(Error);
				});

				it('should throw error if Facebook app ID is not a string', function()	{
					expect(function()	{
						new Socialmedia.Facebook({
							appid: 322056601296318 
						});
					}).to.throw(Error);
				});

				it('should set Facebook app id if provided', function()	{
					var fb = new Socialmedia.Facebook({
						appid: '322056601296318'
					});
					expect(fb.appid).to.equal('322056601296318');
				});

			});

			describe('SDK Version', function()	{

				it('should set default Facebook SDK version to latest', function()	{
					var fb = new Socialmedia.Facebook({
						appid: '322056601296318'
					});
					expect(fb.version).to.equal('v2.1');
				});

				it('should set Facebook SDK version if provided', function()	{
					var fb = new Socialmedia.Facebook({
						appid: '322056601296318',
						version: 'v1.0'
					});
					expect(fb.version).to.equal('v1.0');
				});

			});

			describe('Status', function()	{
				it('should set default SDK status argument to false', function()	{
					var fb = new Socialmedia.Facebook({
						appid: '322056601296318'
					});
					expect(fb.status).to.equal(false);
				});
			});

			describe('Cookie', function()	{
				it('should set default SDK cookie argument to true', function()	{
					var fb = new Socialmedia.Facebook({
						appid: '322056601296318'
					});
					expect(fb.cookie).to.equal(true);
				});
			});

			describe('Requests', function()	{
				it('should set default SDK requests argument to false', function()	{
					var fb = new Socialmedia.Facebook({
						appid: '322056601296318'
					});
					expect(fb.requests).to.equal(false);
				});
			});

			describe('Debug', function()	{
				it('should set default SDK debug argument to false', function()	{
					var fb = new Socialmedia.Facebook({
						appid: '322056601296318'
					});
					expect(fb.debug).to.equal(false);
				});
			});

			describe('Autogrow', function()	{
				it('should set default SDK autogrow argument to true', function()	{
					var fb = new Socialmedia.Facebook({
						appid: '322056601296318'
					});
					expect(fb.autogrow).to.equal(true);
				});
			});

			describe('Callback', function()	{
				it('should set default SDK callback argument to anonymous function', function()	{
					var fb = new Socialmedia.Facebook({
						appid: '322056601296318'
					});
					expect(typeof fb.callback).to.equal('function');
				});
			});

			// describe('Share Method', function()	{
			// 	describe('constructor', function()	{
			// 		it('should throw error if no link is provided', function()	{
			// 			var fb = new Socialmedia.Facebook({
			// 				appid: '322056601296318',
			// 				callback: tryShare
			// 			});

			// 			function tryShare(response) {
			// 				return expect(fb.Share({link: 'http://jabran.me'})).to.throw(Error);
			// 			}

			// 		});
			// 	});
			// });

		});

	});

	
	// Twitter tests
	describe('Twitter', function()	{
		describe('constructor', function()	{
			it('should load Twitter SDK', function()	{
				(new Socialmedia.Twitter());
				var twitterSDK = document.getElementById('twitter-wjs');
				expect(twitterSDK.src.replace(/((http[s]?)|(file)):/, '')).to.equal(Socialmedia.SDK.twitter);
			});
		});
	});

	
	// GooglePlus tests
	describe('GooglePlus', function()	{
		describe('constructor', function()	{
			it('should load Google+ SDK', function()	{
				(new Socialmedia.GooglePlus());
				var gplusSDK = document.getElementById('gplus-jssdk');
				expect(gplusSDK.src.replace(/((http[s]?)|(file)):/, '')).to.equal(Socialmedia.SDK.googleplus);
			});
		});
	});

	
	// Pinterest tests
	describe('Pinterest', function()	{
		describe('constructor', function()	{
			it('should load Pinterest SDK', function()	{
				(new Socialmedia.Pinterest());
				var pinterestSDK =  document.getElementById('pinterest-jssdk');
				expect(pinterestSDK.src.replace(/((http[s]?)|(file)):/, '')).to.equal(Socialmedia.SDK.pinterest);
			});
		});
	});

});