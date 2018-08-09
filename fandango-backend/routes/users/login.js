'use strict';
var kafka = require('../../kafka/client');
// Import helpers
let resFormat = require("../../helpers/res_format");
var passport = require('./passport');

// Main function to login user route
let loginRouterFn = function (req, res, next) {

	passport.authenticate('local', function (err, user, info) {
		// Code for authenticating user and returning response
        if(err){
            let resObj = new resFormat(err);
            return res.status(resObj.getStatus()).json(resObj.log());
        }
        if(user){
            req.login(user,function (err) {
                if(err){
                    let resObj = new resFormat(err);
                    return res.status(resObj.getStatus()).json(resObj.log());
                }
                let resObj = new resFormat(user)
                    .customMeta({
                        message: 'login successful'
                    });
                return res.status(resObj.getStatus()).json(resObj.log());
            });
        }else{
            let resObj = new resFormat(info).customMeta({
                message: 'login failed'
            });
            resObj.setStatus(400);
            return res.status(resObj.getStatus()).json(resObj.log());
        }


	})(req, res);
};


module.exports.loginRouterFn = loginRouterFn;