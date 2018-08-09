/* Add a new movie */
var kafka = require('../../kafka/client');

'use strict';

// Import helpers
let resFormat = require("../../helpers/res_format");

function getHallRouterFn(req, res, next){
    console.log('Get Hall hit');
      kafka.make_request('admin', 'getHall', {
        id: req.body.id,
        hall_name: req.body.hallName
      }, function(err,results){
      console.log('In Kafka: %o', results);
        if(err){
          let resObj = new resFormat(err);
          return res.status(resObj.getStatus()).json(resObj.log());
        }
        else {
          let resObj = new resFormat(results)
                  .customMeta({
                    message: 'Movie retrieved successfully.'
                  });
          return res.status(resObj.getStatus()).json(resObj.log());
        }
      });
}

module.exports = { getHallRouterFn };