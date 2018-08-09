var moment = require('moment');
var Sequelize = require('sequelize');
const db = require('../../db/mysql');


function handle_request(msg, callback) {
    console.log(`Incoming message: ${JSON.stringify(msg)}`);
    let condition = {};
    let query = "select SUM(billings.total_price) as total_revenue," +
        "halls.hall_name,halls.id as hall_id FROM movie_schedules as ms,movies,halls,billings " +
        "where ms.id = billings.movie_schedule_id AND " +
        "movies.id = ms.movie_id AND " +
        "ms.hall_id = halls.id AND " +
        "billings.status = 'A' ";
    if (msg.movie_id) {
        query = query + "AND ms.movie_id = " + msg.movie_id
    }
    query = query + " group by halls.hall_name,halls.id order by total_revenue desc;";
    console.log(`Incoming Query message:`, query);
    db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT })
        .then((movieRevenueList) => {
            callback(null, movieRevenueList)
        });
}

module.exports = {
    handle_request
}