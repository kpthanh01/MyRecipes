"use strict"

const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {DATABASE_URL, PORT} = require('./config');


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











// --------MISC------------
// catch all endpoint if client makes request to non-existing endpoints
app.use('*', function(req, res){
	res.status(404).json({
		message: 'Not Found'
	});
});



module.exports = {app, runServer, closeServer};