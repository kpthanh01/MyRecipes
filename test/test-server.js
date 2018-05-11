'use strict'

const chai = require('chai');
const chaiHTTP = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const {TEST_DATABASE_URL} = require('../config');
const Recipes = require('../models/recipe');
const {app, runServer, closeServer} = require('../server');

const expect = chai.expect;

chai.use(chaiHTTP);

function tearDownDb(){
	console.warn('Deleting Database');
	return mongoose.connection.dropDatabase();
}

describe('MyRecipe API resources', function(){
	before(function(){
		return runServer(TEST_DATABASE_URL);
	});
	beforeEach(function(){
		return seedMyrecipeData();
	});
	afterEach(function(){
		return tearDownDb();
	});
	after(function(){
		return closeServer();
	});

	describe('GET Recipe endpoint', function(){

	});

	describe('POST Recipe endpoint', function(){

	});

	describe('PUT Recipe endpoint', function(){

	});

	describe('DELETE Recipe endpoint', function(){

	});

});