var kafka = require('../../kafka/client');
'use strict';

let resFormat = require("../../helpers/res_format");

let updateProfileRouterFn = async function (req, res, next) {

    // const userId = req.session.passport.user.userId;
    // const body = req.body;
    // body["userId"] = userId;

    let userId = req.session.passport.user.userId;
    let body;
    //body["userId"] = userId;

    try{
        if(req.user){
            if(req.user.role === 1){
                if(req.body.userId){
                     body = req.body;
                }else{
                     userId = req.session.passport.user.userId;
                     body = req.body;
                    body["userId"] = userId;
                }
            }else{
                 userId = req.session.passport.user.userId;
                 body = req.body;
                body["userId"] = userId;
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




    let updateProfileById = function (body) {
        return new Promise(function (resolve, reject) {
            kafka.make_request('request', 'updateProfileById',
               body,
                function (err, results) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    if(results.name === "SequelizeUniqueConstraintError"){
                        const err = new Error("This email is already associated with another user");
                        err.status = 400;
                        reject(err)
                        return;
                    }
                    resolve(results);
                });
        });
    };

    try {
        const profile = await updateProfileById(body);
        let resObj = new resFormat(profile);
        return res.status(resObj.getStatus()).json(resObj.log());

    } catch (err) {
        let resObj = new resFormat(err);
        return res.status(resObj.getStatus()).json(resObj.log());
    }
};

module.exports.updateProfileRouterFn = updateProfileRouterFn;
