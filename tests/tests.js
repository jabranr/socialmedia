var expect = chai.expect;

describe('Socialmedia', function()	{
	
	// Facebook tests
	describe('Facebook', function()	{
		describe('constructor', function()	{

			it('should set Facebook app id if provided', function()	{
				var fb = new Socialmedia.Facebook({
					appid: '1234567890'
				});
				expect(fb.appid).to.equal('1234567890');
			});
		});
	});

	
	// Twitter tests
	describe('Twitter', function()	{
		// tests		
	});

	
	// GooglePlus tests
	describe('GooglePlus', function()	{
		// tests		
	});

	
	// Pinterest tests
	describe('Pinterest', function()	{
		// tests		
	});

});