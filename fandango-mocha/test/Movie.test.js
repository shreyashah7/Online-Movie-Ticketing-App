var assert = require('chai').assert;
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);
var movieName = "Test-Movie" + Math.random();
var CLIENT_URL = require('./Constant');
var movieId = '';

describe('Movie Module Test Cases', function () {

    before(function () {

    });

    after(function () {

    });

    it('Add Movie in the system', function (done) {
        chai.request(CLIENT_URL)
            .post('/addMovie')
            .send({
                movieName: movieName,
                description: movieName + ' Description',
                movieLength: 120,
                genres: 'Fantasy, Science'
            })
            .end(function (err, res) {
                if (res.body.data !== undefined && res.body.data.data !== undefined) {
                    movieId = res.body.data.data.id;
                }
                assert.equal(res.status, 200);
                done();
            });
    });

    it('Edit Movie in the system', function (done) {
        chai.request(CLIENT_URL)
            .post('/editMovie')
            .send({
                id: movieId,
                movieName: "Updated - " + movieName,
                description: "Updated -" + movieName + ' Description',
                movieLength: 120,
                genres: 'Fantasy, Science'
            })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                done();
            });
    });

    it('Get Movie By ID from the system', function (done) {
        chai.request(CLIENT_URL)
            .post('/getMovies')
            .send({
                id: movieId
            })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                done();
            });
    });

    it('Get All Movies from the system', function (done) {
        chai.request(CLIENT_URL)
            .post('/getMovies')
            .send()
            .end(function (err, res) {
                assert.equal(res.status, 200);
                done();
            });
    });

    it('Get Paginated Movies from the system', function (done) {
        chai.request(CLIENT_URL)
            .post('/getLimitedMovie')
            .send({ count: 12 })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                done();
            });
    });

});