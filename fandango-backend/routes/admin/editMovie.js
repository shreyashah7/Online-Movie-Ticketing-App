/* Add a new movie */
var kafka = require('../../kafka/client');

'use strict';

// Import helpers
let resFormat = require("../../helpers/res_format");

function editMovieRouterFn(req, res, next){
    console.log('Edit Movie hit');
      kafka.make_request('admin', 'editMovie', {
          id: req.body.id,
          movie_name: req.body.movieName,
          description: req.body.description,
          see_it_in: req.body.seeItIn,
          trailer: req.body.trailer,
          photos : req.body.photos,
          cast: req.body.cast,
          movie_length: req.body.movieLength,
          release_date: req.body.releaseDate,
          genres: req.body.genres,
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

module.exports = { editMovieRouterFn };
    
 