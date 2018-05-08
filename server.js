const User = require('./models/user');
const Recipe = require('./models/recipe');
const {DATABASE_URL, PORT} = require('./config');

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;

const app = express();

app.use(morgan('common'));
app.use(bodyParser.json());
app.use(express.static('public'));

mongoose.Promise = global.Promise;

// ------------Run/Close Sever-------------

let server;

function runServer(databaseUrl, port = PORT) {
	return new Promise((resolve, reject) => {
		mongoose.connect(databaseUrl, err => {
			if(err){
				return reject(err);
			}
			server = app.listen(port, () => {
				console.log(`Your app is listening on port ${port}`);
				resolve();
			})
			.on('error', err => {
				mongoose.disconnect();
				reject(err);
			});
		});
	});
}

function closeServer(){
	return mongoose.disconnect().then(() => {
		return new Promise((resolve, reject) => {
			console.log('Closing server');
			server.close(err => {
				if(err){
					return reject(err);
				}
				resolve();
			});
		});
	});
}

if(require.main === module){
	runServer(DATABASE_URL).catch(err => console.error(err));
}


// -------------USER ENDPOINTS---------------------------

// create a new user
app.post('/users/register', (req, res) => {

	// takes the username and password from the newUserObject in client.js
	let username = req.body.username;
	let password = req.body.password;

	// create a new encryption key (salt)
	bcrypt.genSalt(10, (err, salt) =>{
		if(err){
			return res.status(500).json({
				message: 'Internal server error'
			});
		}

		// with the new key, encrypt the current password
		bcrypt.hash(password, salt, (err, hash) => {
			if(err){
				return res.status(500).json({
					message: 'Internal server error'
				});
			}

			User.create({
				username,
				password: hash
			}, (err, item) => {

				// if the database connection is NOT succesfull
				if(err){
					return res.status(500).json({
						message: 'Internal server error'
					});
				}

				// if the database connection is succesfull
				if(item){
					console.log(`User \`${username}\` created.`);
					return res.json(item);
				}
			});
		});
	});
});


// login users
app.post('/users/login', (req, res) => {

	// takes the username and password from the loginUserObject in client.js
	const username = req.body.username;
	const password = req.body.password;

	// find if user is in the database
	User.findOne({
			username: req.body.username
		}, function(err, items) {
			// if no connection
			if(err){
				return res.status(500).json({
					message: 'Internal server error'
				});
			}

			// if no user found
			if(!items){
				return res.status(401).json({
					message: 'Not Found'
				});
			}

			// if user is found
			else {
				items.validatePassword(req.body.password, function(err, isValid){
					// if password validation is not working
					if(err){
						return res.status(500).json({
							message: 'Internal server error'
						});
					}

					// if password is not valid
					if(!isValid){
						return res.status(401).json({
							message: 'Not Found'
						});
					}

					// if password is valid
					else {
						return res.json(items);
					}
				});
			}
		});
});

// get all user's recipe
app.get('/recipe/user/:userId', (req, res) => {
	Recipe.find({
		user: req.params.userId
	}, function(err, recipes){
		if(err){
			res.send(err);
		} 
		return res.json(recipes);
	});
});

// get recipe by id
app.get('/recipe/:id', (req, res) => {
	Recipe.findById(req.params.id).exec().then(function(recipe){
		return res.json(recipe);
	})
	.catch(err => {
		return res.status(500).json({
			message: 'Internal server error'
		});
	})
});


// create new recipe
app.post('/recipe/create', (req, res) => {

	let name = req.body.name;
	let description = req.body.description;
	let ingredients = req.body.ingredients;
	let directions = req.body.directions;
	let user = req.body.user;

	Recipe.create({
		name,
		description,
		ingredients,
		directions,
		user
	}, (err, item) => {
		if(err){
			return res.status(500).json({
				message: 'Internal server error'
			});
		}
		if(item){
			console.log(`The recipe \'${name}\' is created`)
			return res.json(item);
		}
	})

});

// update recipe
app.put('/recipe/update/:id', (req, res) => {

	let toUpdate = {};
	let updateableFields = ['description', 'ingredients', 'directions'];
	updateableFields.forEach(function(field){
		if(field in req.body){
			toUpdate[field] = req.body[field];
		}
	});

	Recipe.findByIdAndUpdate(req.params.id, {
		$set: toUpdate
	})
	.exec()
	.then(function(recipe){
		return res.status(204).end();
	})
	.catch(function(err){
		return res.status(500).json({
			message: 'Internal sever error'
		});
	});
});
// delete recipe
app.delete('/recipe/delete/:id', (req, res) => {
	Recipe.findByIdAndRemove(req.params.id).exec().then(function(recipe){
		console.log(`Deleted recipe item ${req.params.id}`);
		return res.status(204).end();
	})
	.catch(function(err){
		return res.status(500).json({
			message: 'Internal server error'
		});
	});
});





// --------MISC------------
// catch all endpoint if client makes request to non-existing endpoints
app.use('*', function(req, res){
	res.status(404).json({
		message: 'Not Found'
	});
});



module.exports = {app, runServer, closeServer};