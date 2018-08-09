var modelScreen = require('./../../models/Screen');

function handle_request(msg, callback){
    console.log(`Handle request: ${JSON.stringify(msg)}`);

    modelScreen.Screen.find({ where: { id: msg.id } })
    .then((screen) => {
      screen.update(msg)
        .then(function (screen) {
            callback(null, screen);
        })
    })
}

module.exports = {
    handle_request
}