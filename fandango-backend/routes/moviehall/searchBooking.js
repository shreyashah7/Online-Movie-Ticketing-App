/* Add a new movie */
var kafka = require('../../kafka/client');

'use strict';

// Import helpers
let resFormat = require("../../helpers/res_format");

function searchBookingRouterFn(req, res, next) {
    console.log('Search User Booking By ID hit');
    kafka.make_request('admin', 'searchBooking', {
        hall_id: req.body.hall_id,
        bill_id: req.body.bill_id,
        bill_date: req.body.bill_date,
        bill_month: req.body.bill_month
    }, function (err, results) {
        console.log('In Kafka: %o', results);
        if (err) {
            let resObj = new resFormat(err);
            return res.status(resObj.getStatus()).json(resObj.log());
        }
        else {
            let resObj = new resFormat(results)
                .customMeta({
                    message: 'Booking Fetched successfully.'
                });
            return res.status(resObj.getStatus()).json(resObj.log());
        }
    });
}

module.exports = { searchBookingRouterFn };