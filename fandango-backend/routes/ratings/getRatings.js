let resFormat = require("../../helpers/res_format");
var kafka = require('../../kafka/client');

// Main function to
let getRatingsRouterFn = async function (req, res, next) {

    const body = req.body;

    const getRatings = function (body) {
        return new Promise(function (resolve,reject) {
            kafka.make_request('request', 'getRatings',
                body,
                function (err, results) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    if(results) {
                        resolve(results);
                    }else{
                        let err = new Error("Internal Error");
                        err.status = 400;
                        reject(err);
                    }
                });
        });
    };

    try{
        const result = await getRatings(body);
        let resObj = new resFormat(result);
        return res.status(resObj.getStatus()).json(resObj.log());
    }catch (err) {
        let resObj = new resFormat(err);
        return res.status(resObj.getStatus()).json(resObj.log());
    }
};

module.exports.getRatingsRouterFn = getRatingsRouterFn;