var assert = require('chai').assert;
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);
var email = "test" + Math.random() + '@gmail.com';
var CLIENT_URL = require('./Constant');

describe('Authentication Test Cases', function () {

	before(function () {

	});

	after(function () {

	});

	it('Customer Should be Sign Up Correct Details', function (done) {
		chai.request(CLIENT_URL)
			.post('/Signup')
			.send({
				email: email,
				password: "Testing@123",
				fname: "Admin"
			})
			.end(function (err, res) {
				assert.equal(res.status, 200);
				done();
			});
	});

	it('Error If Customer Already Exist and Signup', function (done) {
		chai.request(CLIENT_URL)
			.post('/Signup')
			.send({
				email: email,
				password: "Testing@123",
				fname: "Admin"
			})
			.end(function (err, res) {
				assert.equal(res.status, 400);
				done();
			});
	});

	it('Login Into the System with correct Details', function (done) {
		chai.request(CLIENT_URL)
			.post('/Signin')
			.send({
				email: email,
				password: "Testing@123",
			})
			.end(function (err, res) {
				assert.equal(res.status, 200);
				done();
			});
	});

	it('Login Into the System with wrong Details', function (done) {
		chai.request(CLIENT_URL)
			.post('/Signin')
			.send({
				email: email,
				password: "Testing",
			})
			.end(function (err, res) {
				assert.equal(res.status, 400);
				done();
			});
	});

});