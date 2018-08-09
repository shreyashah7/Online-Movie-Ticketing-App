var assert = require('chai').assert;
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);
var movieHallName = "Test-Movie-Hall" + Math.random();
var CLIENT_URL = require('./Constant');
var movieHallId = '';

describe('Movie Hall Module Test Cases', function () {

    before(function () {

    });

    after(function () {

    });

    it('Add Movie Hall in the system', function (done) {
        chai.request(CLIENT_URL)
            .post('/addHall')
            .send({
                hallName: movieHallName,
                street: "201 South 4th Street",
                city: "San Jose",
                state: "California",
                zipcode: "95112",
                screen_nums: 5
            })
            .end(function (err, res) {
                if (res.body.data !== undefined && res.body.data.data !== undefined) {
                    movieHallId = res.body.data.data.id;
                }
                assert.equal(res.status, 200);
                done();
            });
    });

    it('Edit Movie Hall in the system', function (done) {
        chai.request(CLIENT_URL)
            .post('/editHall')
            .send({
                id: movieHallId,
                hallName: "Updated - " + movieHallName,
                street: "201 South 4th Street",
                city: "San Jose",
                state: "California",
                zipcode: "95112",
                screen_nums: 5
            })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                done();
            });
    });

    it('Get Movie Hall By ID from the system', function (done) {
        chai.request(CLIENT_URL)
            .post('/getHalls')
            .send({
                id: movieHallId
            })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                done();
            });
    });

    it('Get All Movie Halls from the system', function (done) {
        chai.request(CLIENT_URL)
            .post('/getHalls')
            .send({})
            .end(function (err, res) {
                assert.equal(res.status, 200);
                done();
            });
    });

});