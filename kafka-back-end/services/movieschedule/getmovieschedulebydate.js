const movie_schedules = require('../../models/MovieSchedule').MovieSchedule;

module.exports = {
    getmovieschedulebydate: function (body,cb) {
        const movie_id = body.movie_id;
        const show_date = body.show_date;

        // let sql = "select T1.id,hall_name,street,city,state,zipcode,hall_id,price,show_time,screen_id " +
        //     "from movie_schedules AS T1 INNER JOIN halls AS T2 ON T1.hall_id = T2.id " +
        //     "where show_date = '<date>' and movie_id = <movieid> ORDER BY hall_id ASC";
        // sql = sql.replace('<date>', show_date).replace('<movieid>', movie_id);


        let sql2 = "select hall_name,street,city,state,zipcode,hall_id,GROUP_CONCAT(show_time ORDER BY hall_id ASC) AS show_time,GROUP_CONCAT(price ORDER BY hall_id ASC) AS price," +
            "GROUP_CONCAT(t1.id order by t1.hall_id asc) as id,GROUP_CONCAT(BAAP.total_seats-BAAP.bookings ORDER BY hall_id ASC) AS available_seats" +
            " from movie_schedules as t1 " +
            "inner join halls as t2 on t2.id=t1.hall_id " +
            "INNER JOIN (select U2.id,total_seats,bookings from screens AS U1 " +
            "INNER JOIN (select id,screen_id,bookings from movie_schedules as T1 " +
            "INNER JOIN (select movie_schedule_id,SUM(no_of_seats) as bookings from billings group by movie_schedule_id) as T2 " +
            "ON T1.id=T2.movie_schedule_id) AS U2 " +
            "ON U2.screen_id=U1.id) AS BAAP " +
            "ON t1.id=BAAP.id " +
            "where movie_id=\'<movieid>\' AND show_date=\'<date>\' group by t1.hall_id";
        sql2 = sql2.replace('<date>', show_date).replace('<movieid>', movie_id);

        try{
            movie_schedules.sequelize.query(sql2).spread((results, metadata) => {
                    cb(null,results);
            });
        }catch (err) {
            cb(err,null);
        }
    }
};