/* Get the List of ALl Users */
var kafka = require('../../kafka/client');

'use strict';

// Import helpers
let resFormat = require("../../helpers/res_format");

function getUsersRouterFn(req, res, next){
    console.log('Get List of All Users');
    kafka.make_request('admin', 'getUsers', {
    }, function(err,results){
        console.log('In Kafka: %o', results);
        if(err){
            let resObj = new resFormat(err);
            return res.status(resObj.getStatus()).json(resObj.log());
        }
        else {
            let resObj = new resFormat(results)
                .customMeta({
                    message: 'All Users retrieved successfully.'
                });
            return res.status(resObj.getStatus()).json(resObj.log());
        }
    });
}

module.exports = { getUsersRouterFn };