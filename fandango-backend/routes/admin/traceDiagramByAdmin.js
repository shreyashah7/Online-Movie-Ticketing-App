/* Fetching trace Diagram for a specific user */
var kafka = require('../../kafka/client');

'use strict';

// Import helpers
let resFormat = require("../../helpers/res_format");

function traceDiagramByAdminRouterFn(req, res, next) {
    console.log('Get Revenue By Movie hit');
    kafka.make_request('admin', 'tracediagram', {
        user_id: req.body.user_id
    }, function (err, results) {
        console.log('In Kafka: %o', results);
        if (err) {
            let resObj = new resFormat(err);
            return res.status(resObj.getStatus()).json(resObj.log());
        }
        else {
            let resObj = new resFormat(results)
                .customMeta({
                    message: 'Trace Diagram for a user retrieved successfully.'
                });
            return res.status(resObj.getStatus()).json(resObj.log());
        }
    });
}

module.exports = { traceDiagramByAdminRouterFn };