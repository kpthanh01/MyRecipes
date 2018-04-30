$(document).ready(function(){
	$('section').hide();
	$('.landing-page').show();
	// $('.list-page').show();
	// $('.create-recipe-page').show();
	// $('.login-page').show();
	// $('.register-page').show();
});








// travel to register page
	$(document).on('click','.register-btn', function(event) {
		event.preventDefault();
		$('section').hide();
		$('.register-page').show();
	});

// go to login page
	$(document).click('.login-btn', function(event){
		event.preventDefault();
		$('section').hide();
		$('.login-page').show();
	});


	$(document).click('#login-submit',function(event){
		event.preventDefault();
		$('section').hide();
		$('.list-page').show();
	});

// go to list page
	$(document).click('.list-btn',function(event){
		event.preventDefault();
		$('section').hide();
		$('.list-page').show();
	});

// go to create page
	$(document).click('.create-btn',function(event){
		event.preventDefault();
		$('section').hide();
		$('.create-recipe-page').show();
	});

// go back to list page
	$(document).click('.logout-btn', function(event){
		event.preventDefault();
		$('section').hide();
		$('.landing-page').show();
	});

// trigger to show detail infomation of a recipe
	$(document).on('click', '.recipe-1', function(){
		$(this).next().slideToggle(500);
	});


// ------------------------------------------------------------------

function registerAccount(){

}
function loginAccount(){

}

