var kafka = require('../../kafka/client');
'use strict';

let resFormat = require("../../helpers/res_format");

let getProfileRouterFn = async function (req, res, next) {
    let userId = req.session.passport.user.userId;
    try{
        if(req.user){
            if(req.user.role === 1){
                if(req.body.userId){
                    userId = req.body.userId;
                }else{
                     userId = req.session.passport.user.userId;
                }
            }else{
                 userId = req.session.passport.user.userId;
            }
        }else{
            const err = new Error("Session not found");
            err.status = 403;
            throw err;
        }
    }catch (e) {
        let resObj = new resFormat(e);
        return res.status(resObj.getStatus()).json(resObj.log());
    }



    let getProfileById = function (userId) {
        return new Promise(function (resolve, reject) {
            kafka.make_request('request', 'getProfileById',
                {
                    "userId": userId
                },
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
        const profile = await getProfileById(userId);

        let resObj = new resFormat(profile);
        return res.status(resObj.getStatus()).json(resObj.log());

    } catch (err) {
        let resObj = new resFormat(err);
        return res.status(resObj.getStatus()).json(resObj.log());
    }
};

module.exports.getProfileRouterFn = getProfileRouterFn;
