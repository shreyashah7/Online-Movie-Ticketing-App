/* Add a new movie */
var kafka = require('../../kafka/client');

'use strict';

// Import helpers
let resFormat = require("../../helpers/res_format");

function editScreenRouterFn(req, res, next){
    console.log('Edit Movie hit');
      kafka.make_request('admin', 'editScreen', {
          id: req.body.screenId,
          hall_id: req.body.hallId,
          screen_type: req.body.screenType,
          total_seats: req.body.totalSeats,
          screen_num: req.body.screenNum,
          is_archive: req.body.is_archive
    }, function(err,results){
      console.log('In Kafka: %o', results);
        if(err){
          let resObj = new resFormat(err);
          return res.status(resObj.getStatus()).json(resObj.log());
        }
        else {
          let resObj = new resFormat(results)
                  .customMeta({
                    message: 'Screen Details have been updated successfully.'
                  });
          return res.status(resObj.getStatus()).json(resObj.log());
        }
      });
}

module.exports = { editScreenRouterFn };
    
 