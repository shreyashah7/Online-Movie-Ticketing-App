var modelHall = require('./../../models/Hall');

function handle_request(msg, callback){
    console.log(`Handle request: ${msg}`);
    // force: true will drop the table if it already exists
    modelHall.Hall.sync({force: false}).then(() => {
        // Table created
        return modelHall.Hall.create({
            hall_name: msg.hall_name,
            street: msg.street,
            city: msg.city,
            state: msg.state,
            zipcode : msg.zipcode,
            screen_nums: msg.screen_nums,
            is_archive: msg.is_archive
        });
    }).then((addedHall) => {
        let result= {};
        result.data = addedHall;
        result.message = 'Theatre added';
        callback(null, result);
    });
}

module.exports = {
    handle_request
}