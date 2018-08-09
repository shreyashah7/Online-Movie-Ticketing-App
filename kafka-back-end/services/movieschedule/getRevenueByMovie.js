var moment = require('moment');
var modelMovieSchedule = require('./../../models/MovieSchedule');
var Sequelize = require('sequelize');
const db = require('../../db/mysql');


function handle_request(msg, callback) {
    console.log(`Incoming message: ${JSON.stringify(msg)}`);
    let condition = {};
    let query = "SELECT " +
        " SUM(billings.total_price) as total_revenue, movies.movie_name, movies.photos, movies.id " +
        " FROM `movie_schedules` as ms JOIN" +
        " billings ON ms.id = billings.movie_schedule_id LEFT JOIN" +
        " movies ON movies.id = ms.movie_id WHERE billings.status = 'A' AND hall_id =" + msg.hall_id;
    if (msg.movie_id) {
        query = query + "AND ms.movie_id = " + msg.movie_id
    }
    query = query + " GROUP BY ms.movie_id ORDER BY total_revenue desc;"
    console.log(`Incoming Query message:`, query);
    db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT })
        .then((movieRevenueList) => {
            callback(null, movieRevenueList)
        });
}

module.exports = {
    handle_request
}