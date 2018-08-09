const ratingmodel = require('../../models/Ratings');

module.exports = {
    addRating: async function(body,cb) {
        try {
            const rating = await ratingmodel.upsert(body);
            cb(null, true)
        } catch (err) {
            cb(err, null)
        }
    },
    getRatings: function(body,cb){
        let sql = "SELECT T2.userId,T2.first_name, rating, review_title, review_body FROM ratings AS T1 INNER JOIN users AS T2 ON T1.userId = T2.userId WHERE T1.movie_id = \'<placeholder>\'";
        sql = sql.replace("<placeholder>",body["movie_id"]);

        let sqlagg = "SELECT AVG(rating) AS avgrating, COUNT(rating) AS totalrating FROM ratings AS T1 WHERE T1.movie_id = 'placeholder'";
        sqlagg = sqlagg.replace("placeholder",body["movie_id"]);

        try{
            // const ratings = await ratingmodel.findAll({
            //     where:body
            // });
            ratingmodel.sequelize.query(sql).spread((results, metadata) => {
                ratingmodel.sequelize.query(sqlagg).spread((aggresults, metadata) => {
                    const obj = {
                        aggregates: aggresults[0],
                        ratings: results
                    };
                    cb(null,obj);
                });
            });
        }catch (err) {
            cb(err,nul);
        }
    }
};