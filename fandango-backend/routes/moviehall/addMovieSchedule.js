/* Add a new movie */
var kafka = require('../../kafka/client');
var moment = require('moment');
var _ = require('lodash');

'use strict';

// Import helpers
let resFormat = require("../../helpers/res_format");

function addMovieScheduleRouterFn(req, res, next) {
    kafka.make_request('admin', 'getMovieSchedules', {
        hall_id: req.body.hall_id,
        screen_id: req.body.screen_id,
        show_date: req.body.show_date
    }, function (err, results) {
        if (err) {
            let resObj = new resFormat(err);
            return res.status(resObj.getStatus()).json(resObj.log());
        }
        else {
            if (!!results && results.length > 0) {
                let requestDate = moment(req.body.show_date + " " + req.body.show_time, 'YYYY-MM-DD hh:mm:ss');
                let format = 'hh:mm:ss';
                let time = moment(requestDate, format);
                let validTime = true;
                for (let i = 0; i < results.length; i++) {
                    let startDate = moment(results[i].show_date + " " + results[i].show_time, 'YYYY-MM-DD hh:mm:ss');
                    let endDate = _.cloneDeep(startDate);
                    endDate.add(Number(results[i].movie_length), 'm');
                    let beforeTime = moment(startDate, format),
                        afterTime = moment(endDate, format);
                    if (time.isSame(beforeTime) || time.isBetween(beforeTime, afterTime) || time.isSame(afterTime)) {
                        validTime = false;
                        break;
                    }
                }
                if (validTime) {
                    kafka.make_request('admin', 'addMovieSchedule', {
                        id: req.body.id,
                        movie_id: req.body.movie_id,
                        hall_id: req.body.hall_id,
                        screen_id: req.body.screen_id,
                        show_date: req.body.show_date,
                        show_time: req.body.show_time,
                        price: req.body.price
                    }, function (err, results) {
                        console.log('In Kafka: %o', results);
                        if (err) {
                            let resObj = new resFormat(err);
                            return res.status(resObj.getStatus()).json(resObj.log());
                        }
                        else {
                            let resObj = new resFormat(results)
                                .customMeta({
                                    message: 'Movie Scheduled successfully.'
                                });
                            return res.status(resObj.getStatus()).json(resObj.log());
                        }
                    });
                } else {
                    let resObj = new resFormat(null)
                        .customMeta({
                            message: 'Movie Already Exist for this showtime!'
                        });
                    resObj.setStatus(500);
                    return res.status(resObj.getStatus()).json(resObj.log());
                }
            } else {
                kafka.make_request('admin', 'addMovieSchedule', {
                    id: req.body.id,
                    movie_id: req.body.movie_id,
                    hall_id: req.body.hall_id,
                    screen_id: req.body.screen_id,
                    show_date: req.body.show_date,
                    show_time: req.body.show_time,
                    price: req.body.price
                }, function (err, results) {
                    console.log('In Kafka: %o', results);
                    if (err) {
                        let resObj = new resFormat(err);
                        return res.status(resObj.getStatus()).json(resObj.log());
                    }
                    else {
                        let resObj = new resFormat(results)
                            .customMeta({
                                message: 'Movie Scheduled successfully.'
                            });
                        return res.status(resObj.getStatus()).json(resObj.log());
                    }
                });
            }
        }
    });
}

module.exports = { addMovieScheduleRouterFn };

