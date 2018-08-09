var kafka = require('../../kafka/client');
'use strict';

let resFormat = require("../../helpers/res_format");

let getUserByEmailRouterFn = async function (req, res, next) {
    const email = req.body.email;

    let getUserByEmail = function (email) {
        return new Promise(function (resolve, reject) {
            kafka.make_request('request', 'getUserByEmail',
                {
                    "email": email
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
        const profile = await getUserByEmail(email);

        let resObj = new resFormat(profile);
        return res.status(resObj.getStatus()).json(resObj.log());

    } catch (err) {
        let resObj = new resFormat(err);
        return res.status(resObj.getStatus()).json(resObj.log());
    }
};

module.exports.getUserByEmailRouterFn = getUserByEmailRouterFn;
