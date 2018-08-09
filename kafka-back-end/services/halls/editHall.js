var modelHall = require('./../../models/Hall');

function handle_request(msg, callback){
    console.log(`Handle request: ${JSON.stringify(msg)}`);

    modelHall.Hall.find({ where: { id: msg.id } })
    .then((hall) => {
      hall.update(msg)
        .then(function (hall) {
            callback(null, hall);
        })
    })


}

module.exports = {
    handle_request
}