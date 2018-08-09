/* Get top 10 movies by Review */
var kafka = require('../../kafka/client');

'use strict';

// Import helpers
let resFormat = require("../../helpers/res_format");

function movieReviewGraphRouterFn(req, res, next){
    kafka.make_request('admin', 'moviereviewgraph', {
    }, function(err,results){
        console.log('In Kafka: %o', results);
        if(err){
            let resObj = new resFormat(err);
            return res.status(resObj.getStatus()).json(resObj.log());
        }
        else {
            let resObj = new resFormat(results)
                .customMeta({
                    message: 'Top Ten Movies By Review retrieved successfully.'
                });
            return res.status(resObj.getStatus()).json(resObj.log());
        }
    });
}

module.exports = { movieReviewGraphRouterFn };