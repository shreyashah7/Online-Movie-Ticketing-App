var modelScreen = require('./../../models/Screen');

function handle_request(msg, callback){
    let condition = {};
    if(!msg.screenNum) {
        condition = {
            hall_id : msg.hall_id,
            is_archive: false
        }
    } else {
        condition = {
            hall_id: msg.hall_id,
            screen_num: msg.screenNum,
            is_archive: false
        }
    }
    console.log(`Incoming Query message: ${JSON.stringify(condition)}`);
    modelScreen.Screen.findAll({
        where : [condition],
        order: [
            ['screen_num', 'ASC']
        ]
    }).then((movie) => {
        callback(null, movie)
    });
}

module.exports = {
    handle_request
}