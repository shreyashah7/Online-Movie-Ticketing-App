let resFormat = require("../../helpers/res_format");
var kafka = require('../../kafka/client');

// Main function to
let addRatingRouterFn = async function (req, res, next) {
    let userId;
    const body = req.body;
    if(req.user){
        body['userId'] = req.user.userId;
    }else{
        let resObj = new resFormat('Session does not exist in the backend');
        return res.status(403).json(resObj.log());
    }

    const addRating = function (body) {
        return new Promise(function (resolve,reject) {
            kafka.make_request('request', 'addRating',
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
        const result = await addRating(body);
        let resObj = new resFormat(result);
        return res.status(resObj.getStatus()).json(resObj.log());
    }catch (err) {
        let resObj = new resFormat(err);
        return res.status(resObj.getStatus()).json(resObj.log());
    }
};

module.exports.addRatingRouterFn = addRatingRouterFn;