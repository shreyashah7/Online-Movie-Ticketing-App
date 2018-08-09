/* Add a new movie */
var kafka = require('../../kafka/client');

'use strict';

// Import helpers
let resFormat = require("../../helpers/res_format");

function getScreenRouterFn(req, res, next){
    console.log('Get Screen hit');
      kafka.make_request('admin', 'getScreen', {
        hall_id: req.body.hallId,
        screen_num: req.body.screenNum
      }, function(err,results){
      console.log('In Kafka: %o', results);
        if(err){
          let resObj = new resFormat(err);
          return res.status(resObj.getStatus()).json(resObj.log());
        }
        else {
          let resObj = new resFormat(results)
                  .customMeta({
                    message: 'Screen Details retrieved successfully.'
                  });
          return res.status(resObj.getStatus()).json(resObj.log());
        }
      });
}

module.exports = { getScreenRouterFn };