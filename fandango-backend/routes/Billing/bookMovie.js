var kafka = require('../../kafka/client');
'use strict';

let resFormat = require("../../helpers/res_format");

let bookMovieRouterFn = async function (req,res,next) {

    if(!req.user){
        const err = new Error("Session does not exist, please log in");
        err.status = 401;
        let resObj = new resFormat(err);
        return res.status(resObj.getStatus()).json(resObj.log());
    }

    const body = req.body;
    body['user_id'] = req.user.userId;
    delete body['bill_id'];
    delete body['booking_date'];

    let bookMovie = async function (body) {
        return new Promise(function (resolve,reject) {
            kafka.make_request('request', 'bookMovie',
                body,
                function (err, results) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(results);
                });
        })
    };

    try{
        const result = await bookMovie(body);
        if(!result){
            const err = new Error("Transaction failed");
            err.status = 500;
            throw err;
        }
        let resObj = new resFormat(result);
        return res.status(resObj.getStatus()).json(resObj.log());
    }catch (err) {
        let resObj = new resFormat(err);
        return res.status(resObj.getStatus()).json(resObj.log());
    }
};

module.exports.bookMovieRouterFn = bookMovieRouterFn;