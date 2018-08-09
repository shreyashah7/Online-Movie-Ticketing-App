var kafka = require('../../kafka/client');
'use strict';

let resFormat = require("../../helpers/res_format");

let getPurchaseHistoryRouterFn = async function (req, res, next) {

    try{
        if(req.user){
            req.body["userId"] = req.user.userId;
        }else{
            const err = new Error("Session not found");
            err.status = 403;
            throw err;
        }
    }catch (e) {
        let resObj = new resFormat(e);
        return res.status(resObj.getStatus()).json(resObj.log());
    }



    let getPurchaseHistory = function (body) {
        return new Promise(function (resolve, reject) {
            kafka.make_request('request', 'getPurchaseHistory',
                body,
                function (err, results) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    if(results) {
                        resolve(results);
                    }else{
                        let err = new Error("Invalid user session");
                        err.status = 400;
                        reject(err);
                    }
                });
        });
    };


    try {
        const history = await getPurchaseHistory(req.body);

        let resObj = new resFormat(history);
        return res.status(resObj.getStatus()).json(resObj.log());

    } catch (err) {
        let resObj = new resFormat(err);
        return res.status(resObj.getStatus()).json(resObj.log());
    }
};

module.exports.getPurchaseHistoryRouterFn = getPurchaseHistoryRouterFn;
