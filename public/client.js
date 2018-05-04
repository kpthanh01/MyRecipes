$(document).ready(function(){
	$('section').hide();
	// $('#landing-page').show();
	// $('#login-page').show();
	// $('#register-page').show();
	// $('#list-page').show();
	$('#create-page').show();
});

// -----------Triggers----------------

$('#login-trigger').click(function(event){
	event.preventDefault();
	$('section').hide();
	$('.nav-link').hide()
	$('#login-page').show();
});

$('#register-trigger').click(function(event){
	event.preventDefault();
	$('section').hide();
	$('.nav-link').hide()
	$('#register-page').show();
});

$('#list-trigger').click(function(event){
	event.preventDefault();
	$('section').hide();
	$('#list-page').show();
});

$('#create-trigger').click(function(event){
	event.preventDefault();
	$('section').hide();
	$('#create-page').show();
});

// $().on('click', , function(event){
// 	event.preventDefault();

// });

// $().on('click', , function(event){
// 	event.preventDefault();

// });

// -------------Temp Triggers-----------
$('#logout-trigger').click(function(event){
	event.preventDefault();
	$('section').hide();
	$('#landing-page').show();
});

// $(document).on('click','#login-submit', function(event){
// 	event.preventDefault();
// 	$('section').hide();
// 	$('#list-page').show();
// });

// $(document).on('click', , function(event){
// 	event.preventDefault();

// });

// ----------Login Submit-----------------------

$('#login-form').submit(function(event){
	event.preventDefault();

	const username = $('#loginInput').val();
	const password = $('#loginPassword').val();

	if(username === '' || password === ''){
		alert("Please enter both Username and Password");
	} else {
		const loginUserObject = {
			username: username,
			password: password
		};
		console.log(loginUserObject);

		$.ajax({
			type: 'POST',
			url: '/users/login',
			dataType: 'json',
			data: JSON.stringify(loginUserObject),
			contentType: 'application/json'
		})
		.done(function(result){
			console.log(result);




		})
		.fail(function(jqXHR, error, errorThrown){
			console.log(jqXHR);
			console.log(error);
			console.log(errorThrown);
		});

	}
});


// --------Register Submit--------------
$('#register-form').submit(function(event){
	event.preventDefault();

	const username = $('#registerUsername').val();
	const password = $('#registerPassword').val();
	const confirmPass = $('#confirmPassword').val();

	if(password != confirmPass){
		alert('Please make sure both password are the same');
	} else {
		const newUserObject = {
			username: username,
			password: password
		}
		console.log(newUserObject);
		$.ajax({
			type: 'POST',
			url: 'users/register',
			dataType: 'json',
			data: JSON.stringify(newUserObject),
			contentType: 'application/json'
		})
		.done(function(result){
			console.log(result);



		})
		.fail(function(jqXHR, error, errorThrown){
			console.log(jqXHR);
			console.log(error);
			console.log(errorThrown);
		});
	}
});

// ------------Create Recipe Submit------------

$('#recipe-form').submit(function(event){
	event.preventDefault();

	const recipeName = $('#create-name').val();
	const recipeDescription = $('#create-description').val();
	const recipeIngredients = $('#create-ingredients').val();
	const recipeDirection = $('#create-directions').val();

	const newRecipeObject = {
		name: recipeName,
		description: recipeDescription,
		ingredients: recipeIngredients,
		directions: recipeDirection
	}
	console.log(newRecipeObject);

	$.ajax({
		type: 'PUT',
		url: '',
		dataType: 'json',
		data: JSON.stringify(newRecipeObject),
		contentType: 'application/json'
	})
	.done(function(result){
		console.log(result);





	})
	.fail(function(jqXHR, error, errorThrown){
		console.log(jqXHR);
		console.log(error);
		console.log(errorThrown);
	});
});

// -------------MISC---------------------

// trigger animation to shwo detail info of a recipe
$('.recipe-btn').click(function(){
	$(this).next().slideToggle(500);
});