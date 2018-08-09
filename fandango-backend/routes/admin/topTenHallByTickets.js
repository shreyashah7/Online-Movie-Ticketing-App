/* Get top 10 movies by Revenue */
var kafka = require('../../kafka/client');

'use strict';

// Import helpers
let resFormat = require("../../helpers/res_format");

function topTenHallByTicketsRouterFn(req, res, next){
    console.log('Get Top Ten Movies By Revenue');
    kafka.make_request('admin', 'topTenHallByTickets', {
    }, function(err,results){
        console.log('In Kafka: %o', results);
        if(err){
            let resObj = new resFormat(err);
            return res.status(resObj.getStatus()).json(resObj.log());
        }
        else {
            let resObj = new resFormat(results)
                .customMeta({
                    message: 'Top Ten Halls By total no of tickets sold last month retrieved successfully.'
                });
            return res.status(resObj.getStatus()).json(resObj.log());
        }
    });
}

module.exports = { topTenHallByTicketsRouterFn };