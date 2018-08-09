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
                movie_id: msg.movie_id,
                hall_id: msg.hall_id,
                screen_id: msg.screen_id,
                show_date: msg.show_date,
                show_time: msg.show_time,
                price: msg.price
            }, { where: { id: msg.id } });
        } else {
            return modelMovieSchedule.MovieSchedule.create({
                movie_id: msg.movie_id,
                hall_id: msg.hall_id,
                screen_id: msg.screen_id,
                show_date: msg.show_date,
                show_time: msg.show_time,
                price: msg.price,
                is_archive: false
            });
        }
    }).then((data) => {
        callback(null, data);
    });
}

module.exports = {
    handle_request
}