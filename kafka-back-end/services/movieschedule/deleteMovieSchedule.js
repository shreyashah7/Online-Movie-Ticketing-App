var modelMovieSchedule = require('./../../models/MovieSchedule');

function handle_request(msg, callback) {
    console.log(`Handle request: ${msg}`);
    // force: true will drop the table if it already exists
    modelMovieSchedule.MovieSchedule.sync({
        force: false
    }).then(() => {
        // Table created
        if (msg.id && msg.id !== 0) {
            return modelMovieSchedule.MovieSchedule.update({
                is_archive: true
            }, { where: { id: msg.id } });
        }
    }).then((data) => {
        callback(null, data);
    });
}

module.exports = {
    handle_request
}