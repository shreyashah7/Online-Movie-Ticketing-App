/* Add a new movie */
var kafka = require('../../kafka/client');

'use strict';

// Import helpers
let resFormat = require("../../helpers/res_format");

function getRevenueByMovieRouterFn(req, res, next) {
  console.log('Get Revenue By Movie hit');
  kafka.make_request('admin', 'getRevenueByMovie', {
    movie_id: req.body.movie_id,
    hall_id: req.body.hall_id
  }, function (err, results) {
    console.log('In Kafka: %o', results);
    if (err) {
      let resObj = new resFormat(err);
      return res.status(resObj.getStatus()).json(resObj.log());
    }
    else {
      let resObj = new resFormat(results)
        .customMeta({
          message: 'Movie Revenue retrieved successfully.'
        });
      return res.status(resObj.getStatus()).json(resObj.log());
    }
  });
}

module.exports = { getRevenueByMovieRouterFn };