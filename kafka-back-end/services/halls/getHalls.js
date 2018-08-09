var modelHall = require('./../../models/Hall');

function handle_request(msg, callback){
    console.log(`Incoming message: ${JSON.stringify(msg)}`);
    if(JSON.stringify(msg) === '{}'){
        msg = {
            is_archive: 0
        }
    }
    modelHall.Hall.findAll({
        where : [msg]
    }).then((hall) => {
        callback(null, hall)
    })
}

module.exports = {
    handle_request
}