/* Add a new movie */
var kafka = require('../../kafka/client');

'use strict';

// Import helpers
let resFormat = require("../../helpers/res_format");

function getMovieScheduleRouterFn(req, res, next){
    console.log('Get Movie Schedule hit');
      kafka.make_request('admin', 'getMovieSchedules', {
        movie_id:req.body.movie_id,
        hall_id: req.body.hall_id,
        screen_id:req.body.screen_id,
        show_date:req.body.show_date
      }, function(err,results){
      console.log('In Kafka: %o', results);
        if(err){
          let resObj = new resFormat(err);
          return res.status(resObj.getStatus()).json(resObj.log());
        }
        else {
          let resObj = new resFormat(results)
                  .customMeta({
                    message: 'Movie Schedules retrieved successfully.'
                  });
          return res.status(resObj.getStatus()).json(resObj.log());
        }
      });
}

module.exports = { getMovieScheduleRouterFn };