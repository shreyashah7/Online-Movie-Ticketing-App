var kafka = require('../../kafka/client');
'use strict';

let resFormat = require("../../helpers/res_format");

let deleteUserRouterFn = async function (req, res, next) {
    const deleteUserId = req.body["deleteuserId"];
    const userId = req.session.passport.user.userId;

    let checkAuthUserById = function (userId) {
        return new Promise(function (resolve, reject) {
            kafka.make_request('request', 'getUserById',
                {
                    "userId": userId
                },
                function (err, results) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    console.log("results ------",results);
                    resolve(0);
                });
        });
    };

    let DeleteUserInDb = function (userId) {
        return new Promise(function (resolve, reject) {
            if(userId){
                kafka.make_request('request', "deleteUser",
                    {
                        "userId": userId
                    },
                    function (err, results) {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(results);
                        }
                    });
            }else{
                const err = new Error("No userId passed for deletion");
                err.status = 400;
                reject(err);
            }

        });
    };

    try {
        await checkAuthUserById(userId);
        await DeleteUserInDb(deleteUserId);
        let resObj = new resFormat("User deleted successfully");
        return res.status(resObj.getStatus()).json(resObj.log());

    } catch (err) {
        let resObj = new resFormat(err);
        return res.status(resObj.getStatus()).json(resObj.log());
    }
};

module.exports.deleteUserRouterFn = deleteUserRouterFn;
