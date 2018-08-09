var moment = require('moment');
var modelMovieSchedule = require('./../../models/MovieSchedule');
var Sequelize = require('sequelize');
const db = require('../../db/mysql');


function handle_request(msg, callback) {
    console.log(`Incoming message For Getting Movie Schedule: ${JSON.stringify(msg)}`);
    let condition = {};
    let query = "SELECT " +
        " ms.*, halls.hall_name, screens.screen_num,movies.movie_name,movies.movie_length " +
        " FROM `movie_schedules` as ms LEFT JOIN" +
        " movies ON movies.id = ms.movie_id JOIN" +
        " halls ON halls.id = ms.hall_id" +
        " JOIN" +
        " screens ON screens.id = ms.screen_id where ms.is_archive=0 AND ";
    if (msg.movie_id && msg.hall_id) {
        query = query + "ms.movie_id = " + msg.movie_id + " AND ms.hall_id = " + msg.hall_id;
    } else if (msg.movie_id) {
        query = query + "ms.movie_id = " + msg.movie_id;
    } else {
        query = query + "ms.hall_id = " + msg.hall_id + " AND ms.screen_id = " + msg.screen_id + " AND ms.show_date = '" + moment(msg.show_date).format('YYYY-MM-DD') + "'";
    }
    console.log(`Incoming Query message:`, query);
    db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT })
        .then((movieScheduleList) => {
            callback(null, movieScheduleList)
        });
}

module.exports = {
    handle_request
}