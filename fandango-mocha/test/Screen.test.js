var assert = require('chai').assert;
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);
var screenNum = Math.random() * 6 + 1;
var CLIENT_URL = require('./Constant');
var screenId = '';
var hallId = '';
var hallList = [];

describe('Screen Module Test Cases', function () {

    before(function () {

    });

    after(function () {

    });

    it('Before Add Screen in the system', function (done) {
        chai.request(CLIENT_URL)
            .post('/getHalls')
            .send({})
            .end(function (err, res) {
                if (res.body.data != undefined && res.body.data.length > 0) {
                    hallId = res.body.data[0].id;
                    done();
                }
            });
    });

    it('Add Screen in the system', function (done) {
        chai.request(CLIENT_URL)
            .post('/addScreen')
            .send({
                hallId: Number(hallId),
                screenType: "IMAX",
                totalSeats: 25,
                screenNum: screenNum
            })
            .end(function (err, res) {
                if (res.body.data !== undefined && res.body.data.data !== undefined) {
                    screenId = res.body.data.data.id;
                }
                assert.equal(res.status, 200);
                done();
            });
    });

    it('Edit Screen in the system', function (done) {
        chai.request(CLIENT_URL)
            .post('/editScreen')
            .send({
                screenId: Number(screenId),
                hallId: Number(hallId),
                screenType: "Digital 3D",
                totalSeats: 25,
                screenNum: screenNum
            })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                done();
            });
    });

    it('Get Screen By ID from the system', function (done) {
        chai.request(CLIENT_URL)
            .post('/getScreens')
            .send({
                hallId: Number(hallId),
                screenNum: screenNum
            })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                done();
            });
    });

    it('Get All Screens By Hall from the system', function (done) {
        chai.request(CLIENT_URL)
            .post('/getScreens')
            .send({ hallId: Number(hallId) })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                done();
            });
    });

});