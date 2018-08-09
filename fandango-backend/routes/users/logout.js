'use strict';
// Import helpers
let resFormat = require("../../helpers/res_format");
var kafka = require('../../kafka/client');

// Main function to logout user route
let logoutRouterFn = function (req, res, next) {
    console.log("in logout------------------", req.user.userId);
    let pageNames = req.body.pageNames;
    pageNames.unshift("Log In");
    pageNames.push("Logout");
    kafka.make_request('admin', 'trace', {
        userid: req.user.userId,
        pages: pageNames
    }, function (err, results) {
        console.log('In Kafka: %o', results);
        if (err) {
            let resObj = new resFormat(err);
            return res.status(resObj.getStatus()).json(resObj.log());
        }
        else {
            req.logout();
            req.session.destroy();
            console.log('User Logged Out of the system');
            let resObj = new resFormat('')
                .customMeta({
                    message: 'You are logged Out Successfully.'
                });
            return res.status(resObj.getStatus()).json(resObj.log());
        }
    });
};

module.exports.logoutRouterFn = logoutRouterFn;
