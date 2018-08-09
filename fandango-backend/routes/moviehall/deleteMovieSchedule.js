/* Add a new movie */
var kafka = require('../../kafka/client');

'use strict';

// Import helpers
let resFormat = require("../../helpers/res_format");

function deleteMovieScheduleRouterFn(req, res, next) {
    console.log('Delete Movie Schedule hit');
    kafka.make_request('admin', 'deleteMovieSchedule', {
        id: req.body.id
    }, function (err, results) {
        console.log('In Kafka: %o', results);
        if (err) {
            let resObj = new resFormat(err);
            return res.status(resObj.getStatus()).json(resObj.log());
        }
        else {
            let resObj = new resFormat(results)
                .customMeta({
                    message: 'Movie Schedules Deleted successfully.'
                });
            return res.status(resObj.getStatus()).json(resObj.log());
        }
    });
}

module.exports = { deleteMovieScheduleRouterFn };