var moment = require('moment');
var Sequelize = require('sequelize');
const db = require('../../db/mysql');


function handle_request(msg, callback) {
    console.log(`Incoming message: ${JSON.stringify(msg)}`);
    let condition = {};
    let query = "select halls.hall_name,sum(total_price) as revenue,SUM(billings.no_of_seats) as total_no_of_tickets from billings,movie_schedules,movies,halls where " +
        "movies.id = movie_schedules.movie_id AND " +
        "billings.movie_schedule_id = movie_schedules.id AND " +
        "movie_schedules.hall_id = halls.id AND " +
        "DATE_FORMAT(billings.booking_date, '%Y-%m') = date_format(DATE_SUB(curdate(), INTERVAL 1 month),'%Y-%m') " +
        "group by movie_schedules.hall_id order by total_no_of_tickets desc limit 10;";

    console.log(`Incoming Query message:`, query);
    db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT })
        .then((topTenMoviesByRevenueList) => {
            callback(null, topTenMoviesByRevenueList)
        });
}

module.exports = {
    handle_request
};