var modelUser = require('./../../models/Users');

function handle_request(msg, callback){
    console.log(`Incoming message: ${JSON.stringify(msg)}`);
    modelUser.findAll({where: { role: 3 }}).then((users) => {
        console.log("List of All users is ");
        console.log(JSON.stringify(users));
        callback(null, users)
    });
}

module.exports = {
    handle_request
}