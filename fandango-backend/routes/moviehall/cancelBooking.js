/* Add a new movie */
var kafka = require('../../kafka/client');

'use strict';

// Import helpers
let resFormat = require("../../helpers/res_format");

function cancelBookingRouterFn(req, res, next) {
    console.log('Cancel Booking hit');
    kafka.make_request('admin', 'cancelBooking', {
        bill_id: req.body.bill_id
    }, function (err, results) {
        console.log('In Kafka: %o', results);
        if (err) {
            let resObj = new resFormat(err);
            return res.status(resObj.getStatus()).json(resObj.log());
        }
        else {
            let resObj = new resFormat(results)
                .customMeta({
                    message: 'Booking Deleted successfully.'
                });
            return res.status(resObj.getStatus()).json(resObj.log());
        }
    });
}

module.exports = { cancelBookingRouterFn };