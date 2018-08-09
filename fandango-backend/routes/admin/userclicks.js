/* Add a new movie */
var kafka = require('../../kafka/client');

'use strict';

// Import helpers
let resFormat = require("../../helpers/res_format");

function ClicksPerPageRouterFn(req, res, next){
    console.log('Get User CLicks per page');
    console.log(req.body.clickData);
    kafka.make_request('admin', 'clicksPerPage', {
        clickData: req.body.clickData
    }, function(err,results){
        console.log('In Kafka: %o', results);
        if(err){
            let resObj = new resFormat(err);
            return res.status(resObj.getStatus()).json(resObj.log());
        }
        else {
            let resObj = new resFormat(results)
                .customMeta({
                    message: 'User Click Data retrieved successfully.'
                });
            return res.status(resObj.getStatus()).json(resObj.log());
        }
    });
}

module.exports = { ClicksPerPageRouterFn };