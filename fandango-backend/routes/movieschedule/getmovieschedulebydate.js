var kafka = require('../../kafka/client');
'use strict';

let resFormat = require("../../helpers/res_format");
let getmovieschedulebydateRouterFn = async function (req, res, next) {

    if(!req.body.show_date || !req.body.movie_id){

    }
    const show_date = req.body.show_date;
    const movie_id = req.body.movie_id;

    let getmovieschedulebydate = function(show_date,movie_id){
        return new Promise(function(resolve,reject){
            kafka.make_request('request', 'getmovieschedulebydate',
                {
                    "show_date": show_date,
                    "movie_id": movie_id
                },
                function (err, results) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(results);
                });
        })
    };

    try{
        const result = await getmovieschedulebydate(show_date,movie_id);
        let resObj = new resFormat(result);
        return res.status(resObj.getStatus()).json(resObj.log());
    }catch (err) {
        let resObj = new resFormat(err);
        return res.status(resObj.getStatus()).json(resObj.log());
    }
};

module.exports.getmovieschedulebydateRouterFn = getmovieschedulebydateRouterFn;
