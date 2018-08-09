/* Add a new movie */
var kafka = require('../../kafka/client');

'use strict';

// Import helpers
let resFormat = require("../../helpers/res_format");

function addHallRouterFn(req, res, next){
    console.log('Add Hall Function hit');
      kafka.make_request('admin', 'addHall', {
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
                    message: 'Theatre has been added successfully.'
                  });
          return res.status(resObj.getStatus()).json(resObj.log());
        }
      });
}

module.exports = { addHallRouterFn };
    
 