/*

// Facebook add to page tab function
Socialmedia.Facebook.prototype.AddToPage = function() {
	return FB.ui({
	  method: 'pagetab'
	}, function(response){ });
};

// Facebook add friend function
Socialmedia.Facebook.prototype.AddFriend = function( options ) {
	return FB.ui({
	  method: 'friends',
	  id: options && (typeof(options.id) !== 'undefined') && options.id || 'jabranr'
	}, function(response){
		return (options && options.callback && typeof(options.callback) === 'function') ? 
			options.callback.call(this, typeof(response) !== 'undefined' && response.action && response.action === true) : 
				false; 
	});
};

// Facebook send function
Socialmedia.Facebook.prototype.Send = function( options ) {
	return FB.ui({
	  method: 'send',
	  link: options && typeof(options.link) !== 'undefined' && options.link || window.location.href
	});
};

// Facebook pay function
Socialmedia.Facebook.prototype.Pay = function( options ) {
	return FB.ui({
	  method: 'pay',
	  action: 'purchaseitem',
	  product: options && typeof(options.link) !== 'undefined' && options.link || window.location.href
	}, function(data)	{
		return (data && options && typeof(options.callback) === 'function') ? options.callback.call(this, data) : false;
	});
};

*/