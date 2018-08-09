var modelMovie = require('./../../models/Movie');

function handle_request(msg, callback){
    console.log(`Incoming message: ${JSON.stringify(msg)}`);

    if(Object.keys(msg).length !== 0){
        modelMovie.Movie.findAll({
            where : [msg]
        }).then((movie) => {
            callback(null, movie)
        });
    }else{
        let sql = "select t1.id,movie_name,description,see_it_in,trailer,photos,cast,movie_length,release_date,genres,t1.createdAt,t1.updatedAt,AVG(ratings.rating) AS avgrating " +
            "FROM movies as t1 " +
            "LEFT OUTER JOIN ratings on ratings.movie_id=t1.id " +
            "GROUP BY t1.id";

        try{
            modelMovie.Movie.sequelize.query(sql).spread((results, metadata) => {
                callback(null,results);
            });
        }catch (err) {
            callback(err,null);
        }
    }
}

module.exports = {
    handle_request
}