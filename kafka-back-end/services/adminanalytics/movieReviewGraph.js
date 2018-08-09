var moment = require('moment');
var Sequelize = require('sequelize');
const db = require('../../db/mysql');


function handle_request(msg, callback) {
    console.log(`Incoming message: ${JSON.stringify(msg)}`);
    let condition = {};
    let query = "select r.movie_id,m.movie_name,avg(r.rating) as average_rating " +
        "from movies as m,ratings r where " +
        "m.id = r.movie_id group by r.movie_id desc limit 10;";

    console.log(`Incoming Query message:`, query);
    db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT })
        .then((movieReviewGraph) => {
            callback(null, movieReviewGraph)
        });
}

module.exports = {
    handle_request
};