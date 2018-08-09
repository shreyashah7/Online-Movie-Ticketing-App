var kafka = require('../../kafka/client');
'use strict';

let resFormat = require("../../helpers/res_format");
let password_pattern = require('../../helpers/password_pattern');

let signUpRouterFn = async function (req, res, next) {
    let body = req.body;

    let checkPasswordPattern = function (body) {
        return new Promise(function (resolve, reject) {
            if (!password_pattern.test(body.password)) {
                let error = new Error("The password is too weak");
                error.status = 400;
                return reject(error);
            }
            resolve(body);
        });
    };
    let checkUserExist = function (body) {
        return new Promise(function (resolve, reject) {
            kafka.make_request('request', 'getUserByEmail',
                {
                    email: body.email,
                    fname: body.fname,
                    password: body.password
                },
                function (err, results) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    if (results) {
                        let err = new Error("User Already Exist in the system with this email address.");
                        err.status = 400;
                        return reject(err);
                    } else {
                        resolve(body);
                    }
                });
        });
    };
    let saveUserInDb = function (body) {
        return new Promise(function (resolve, reject) {
            kafka.make_request('request', "Signup",
                {
                    email: body.email,
                    password: body.password,
                    fname: body.fname,
                    role: 3
                },
                function (err, results) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(true);
                    }
                });
        });
    };

    console.log('Signup function hit');

    try {
        await
            checkPasswordPattern(body);
        await
            checkUserExist(body);
        await saveUserInDb(body);

        let resObj = new resFormat(body.fname)
        				.customMeta({
        					message: 'Your account has been created successfully.'
        				});
        return res.status(resObj.getStatus()).json(resObj.log());
    } catch (err) {
        let resObj = new resFormat(err);
        return res.status(resObj.getStatus()).json(resObj.log());
    }
};
module.exports.signUpRouterFn = signUpRouterFn;
