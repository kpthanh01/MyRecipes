$(document).ready(function(){
	$('section').hide();
	$('#create-btn').addClass('hideNavLink');
	$('#list-btn').addClass('hideNavLink');
	$('#logout-btn').addClass('hideNavLink');
	$('#landing-page').show();
	// $('#login-page').show();
	// $('#register-page').show();
	// $('#list-page').show();
	// $('#create-page').show();
});

// -----------Triggers----------------

$('#login-trigger').click(function(event){
	event.preventDefault();
	$('section').hide();
	$('#login-btn').addClass('hideNavLink');
	$('#register-btn').addClass('hideNavLink');
	$('#login-page').show();
});

$('#register-trigger').click(function(event){
	event.preventDefault();
	$('section').hide();
	$('#login-btn').addClass('hideNavLink');
	$('#register-btn').addClass('hideNavLink');
	$('#register-page').show();
});

$('#list-trigger').click(function(event){
	event.preventDefault();
	$('section').hide();
	$('#create-btn').removeClass('hideNavLink');
	$('#list-btn').addClass('hideNavLink');
	$('#list-page').show();
});

$('#create-trigger').click(function(event){
	event.preventDefault();
	$('section').hide();
	$('#create-btn').addClass('hideNavLink');
	$('#list-btn').removeClass('hideNavLink');
	$('#create-page').show();
});



// -------------Temp Triggers-----------
$('#logout-trigger').click(function(event){
	event.preventDefault();
	$('section').hide();
	$('#login-btn').removeClass('hideNavLink');
	$('#register-btn').removeClass('hideNavLink');
	$('#create-btn').addClass('hideNavLink');
	$('#list-btn').addClass('hideNavLink');
	$('#logout-btn').addClass('hideNavLink');
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
		$.ajax({
			type: 'POST',
			url: '/users/login',
			dataType: 'json',
			data: JSON.stringify(loginUserObject),
			contentType: 'application/json'
		})
		.done(function(result){
			console.log(result);
			$('section').hide();
			$('#create-btn').removeClass('hideNavLink');
			$('#logout-btn').removeClass('hideNavLink');
			$('#list-page').show();
			$('#loggedUserName').val(result.username);
			displayRecipe(loginUserObject.username);
		})
		.fail(function(jqXHR, error, errorThrown){
			console.log(jqXHR);
			console.log(error);
			console.log(errorThrown);
			alert('Please check Username and Password');
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
		$.ajax({
			type: 'POST',
			url: '/users/register',
			dataType: 'json',
			data: JSON.stringify(newUserObject),
			contentType: 'application/json'
		})
		.done(function(result){
			console.log(result);
			$('section').hide();
			$('#create-btn').removeClass('hideNavLink');
			$('#logout-btn').removeClass('hideNavLink');
			$('#list-page').show();
			$('#loggedUserName').val(result.username);
			displayRecipe(newUserObject.username);



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
	const loggedUser = $('#loggedUserName').val();

	const newRecipeObject = {
		name: recipeName,
		description: recipeDescription,
		ingredients: recipeIngredients,
		directions: recipeDirection,
		user: loggedUser
	};
	console.log(newRecipeObject);

	$.ajax({
		type: 'POST',
		url: '/recipe/create',
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


// --------Logout----------------




// ---------Update Recipe----------





// -----------Delete Recipe---------




// -------------MISC---------------------

// trigger animation to shwo detail info of a recipe
$('.recipe-btn').click(function(){
	$(this).next().slideToggle(500);
});

// --------Display Users Recipes----------
function displayRecipe(loggedUser){
	let results = $.ajax({
		type: 'GET',
		url: `/recipe/get/${loggedUser}`,
		dataType: 'json'
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