let resFormat = require("../../helpers/res_format");

// Main function to logout user route
let checkLoginRouterFn = function (req, res, next) {

    if(req.user){
        let resObj = new resFormat(req.user);
        return res.status(resObj.getStatus()).json(resObj.log());
    }else{
        let resObj = new resFormat('Session does not exist in the backend');
        return res.status(403).json(resObj.log());
    }

};

module.exports.checkLoginRouterFn = checkLoginRouterFn;