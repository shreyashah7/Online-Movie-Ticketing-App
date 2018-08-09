/* Add a new movie */
var kafka = require('../../kafka/client');

'use strict';

// Import helpers
let resFormat = require("../../helpers/res_format");

function editHallRouterFn(req, res, next){
    console.log('Edit Hall hit');
      kafka.make_request('admin', 'editHall', {
          id: req.body.id,
          hall_name: req.body.hallName,
          street: req.body.street,
          city: req.body.city,
          state: req.body.state,
          zipcode : req.body.zipcode,
          screen_nums: req.body.screen_nums,
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
                    message: 'Movie Details have been updated successfully.'
                  });
          return res.status(resObj.getStatus()).json(resObj.log());
        }
      });
}

module.exports = { editHallRouterFn };
    
 