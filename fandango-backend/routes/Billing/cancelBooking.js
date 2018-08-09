var kafka = require('../../kafka/client');
'use strict';

let resFormat = require("../../helpers/res_format");

let cancelBookingRouterFn = async function (req,res,next) {
    const body = req.body;
    if(req.user){
        if(!(req.user.role === 1)){
            const err = new Error("You are not authorized to perform this action");
            err.status = 401;
            let resObj = new resFormat(err);
            return res.status(resObj.getStatus()).json(resObj.log());
        }
    }else{
        const err = new Error("Your are not logged in, please log in");
        err.status = 403;
        let resObj = new resFormat(err);
        return res.status(resObj.getStatus()).json(resObj.log());
    }

    if(!body['bill_id']){
        const err = new Error("Please provide a bill_id to cancel");
        err.status = 400;
        let resObj = new resFormat(err);
        return res.status(resObj.getStatus()).json(resObj.log());
    }

    let cancelBooking = async function (bill_id) {
        return new Promise(function (resolve,reject) {
            kafka.make_request('request', 'cancelBooking',
                {
                    "bill_id": body.bill_id
                },
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
        const result = await cancelBooking(body.bill_id);
        let resObj = new resFormat(result);
        return res.status(resObj.getStatus()).json(resObj.log());
    }catch (err) {
        let resObj = new resFormat(err);
        return res.status(resObj.getStatus()).json(resObj.log());
    }
};

module.exports.cancelBookingRouterFn = cancelBookingRouterFn;