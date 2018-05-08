$(document).ready(function(){
	$('section').hide();
	$('#create-btn').addClass('hideNavLink');
	$('#list-btn').addClass('hideNavLink');
	$('#logout-btn').addClass('hideNavLink');
	$('#landing-page').show();
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
			getRecipe(loginUserObject.username);
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
			getRecipe(newUserObject.username);
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
		alert('Recipe has been saved!');
		console.log(result);
		getRecipe(loggedUser);
		$('.recipe-count').html('');
	})
	.fail(function(jqXHR, error, errorThrown){
		console.log(jqXHR);
		console.log(error);
		console.log(errorThrown);
	});
});


// --------Logout----------------




// ---------Update Recipe----------
$('.edit-recipe').click(function(){
	$('section').hide();
	$('#edit-page').show();

});




// -----------Delete Recipe---------
$('.list').on('click', '.delete-recipe', function(event){
	event.preventDefault();
	const loggedUser = $('#loggedUserName').val();
	let recipeId = $(event.target).closest('.recipe').find('.recipe-Id').val();
	$.ajax({
		type: 'DELETE',
		url: `/recipe/delete/${recipeId}`
	})
	.done(function(result){
		alert('Recipe has been deleted!');
		getRecipe(loggedUser);
	})
	.fail(function(jqXHR, error, errorThrown){
		console.log(jqXHR);
		console.log(error);
		console.log(errorThrown);
	});
});



// -------------MISC---------------------

// trigger animation to shwo detail info of a recipe
$('.list').on('click', '.recipe-btn', function(event){
	$(event.target).next().slideToggle(500);
});

// --------Display Users Recipes----------
function displayRecipe(result){
	let buildRecipe = '';
	$.each(result, function(resultKey, resultValue) {
		buildRecipe += '<div class="recipe">';
		buildRecipe += `<input class="recipe-Id" type="hidden" value="${resultValue._id}">`;
		buildRecipe += `<button class="recipe-btn">${resultValue.name}</button>`;
		buildRecipe += '<div class="recipe-info">';
		buildRecipe += `<p>Description: ${resultValue.description}</p>`;
		buildRecipe += `<p>Ingredients: ${resultValue.ingredients}</p>`;
		buildRecipe += `<p>Directions: ${resultValue.directions}</p>`;
		buildRecipe += '<button class="edit-recipe">Edit</button>';
		buildRecipe += '<button class="delete-recipe">Delete</button>';
		buildRecipe += '</div>';
		buildRecipe += '</div>';
	})
	$('.list').html(buildRecipe);	
}


function getRecipe(loggedUser){
	let results = $.ajax({
		type: 'GET',
		url: `/recipe/get/${loggedUser}`,
		dataType: 'json'
	})
	.done(function(result){
		if(result == ''){
			$('.recipe-count').html('You have no recipes saved!');
		} else {
			console.log(result);
			displayRecipe(result);
		}
		
	})
	.fail(function(jqXHR, error, errorThrown){
		console.log(jqXHR);
		console.log(error);
		console.log(errorThrown);
	});
}

// ------Get a single Recipe by Id for edit-----------
function getRecipeById(id){
	let results = $.ajax({
		type: 'GET',
		url: `/recipe/update/:${id}`,
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