/* Add a new movie */
var kafka = require('../../kafka/client');

'use strict';

// Import helpers
let resFormat = require("../../helpers/res_format");

function MovieRevenueByAdminRouterFn(req, res, next) {
    console.log('Get Revenue By Movie hit for fandango admin');
    kafka.make_request('admin', 'movierevenuebyadmin', {
        movie_id: req.body.movie_id
    }, function (err, results) {
        console.log('In Kafka: %o', results);
        if (err) {
            let resObj = new resFormat(err);
            return res.status(resObj.getStatus()).json(resObj.log());
        }
        else {
            let resObj = new resFormat(results)
                .customMeta({
                    message: 'Movie Revenue by fandango admin retrieved successfully.'
                });
            return res.status(resObj.getStatus()).json(resObj.log());
        }
    });
}

module.exports = { MovieRevenueByAdminRouterFn };