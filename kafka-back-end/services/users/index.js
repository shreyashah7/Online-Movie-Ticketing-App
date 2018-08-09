const usermodel = require('../../models/Users');
const bcrypt = require('bcrypt');


module.exports = {
    getUserByEmail: async function (body, cb) {
        console.log("Inc Login handle request:" + JSON.stringify(body));
        try {
            const user = await usermodel.findAll({
                where: {
                    email: body.email,
                    is_archive: false
                }
            });
            console.log("user[0] :",user[0]);
            cb(null, user[0]);
        } catch (e) {
            cb(e, null);
        }
    },
    Signup: async function (body, cb) {
        try {
            const saltedhash = await bcrypt.hash(body.password, 10);
            const user = await usermodel.create({
                email: body.email,
                password_hash: saltedhash,
                first_name: body.fname,
                role: body.role
            });
            cb(null, user)
        } catch (e) {
            cb(e, null);
        }
    },
    getUserById: async function (body, cb) {
        try {
            const user = await usermodel.findAll({
                where: {
                    userId: body.userId,
                }
            });
            cb(null, user[0]);
        } catch (e) {
            cb(e, null);
        }
    },
    deleteUser: async function (body, cb) {
        const deletionUserId = body.userId;
        console.log("deletionUserId :",deletionUserId);
        try {
            const user = await usermodel.update({
                is_archive: true
            }, {
                    where: {
                        "userId": deletionUserId
                    }
                });
            cb(null, true);
        } catch (e) {
            cb(e, null)
        }

    },
    getProfileById: async function (body, cb) {
        const userId = body["userId"];
        try {
            const profile = await usermodel.findAll({
                where: {
                    userId: userId,
                },
                attributes: { exclude: ['password_hash', 'is_archive', 'createdAt', 'updatedAt'] }
            });
            cb(null, profile[0])
        } catch (e) {
            cb(e, null);
        }
    },
    updateProfileById: async function (body, cb) {
        const checkpassword = async function (oldpassword) {
            const oldpassword_hash = await usermodel.findById(body.userId, {
                attributes: ['password_hash']
            });
            const bool = await bcrypt.compare(oldpassword, oldpassword_hash.password_hash);
            console.log("bool :", bool);
            return bool;
        };

        try {
            delete body.password_hash;
            if (body.oldpassword && body.newpassword) {
                if (!await checkpassword(body.oldpassword)) {
                    cb(null, "Invalid current password");
                    return;
                } else {
                    body.password_hash = await bcrypt.hash(body.newpassword, 10);
                    delete body.oldpassword;
                    delete body.newpassword;
                }
            } else {
                delete body.oldpassword;
                delete body.newpassword;
            }

            const rows = await usermodel.upsert(body);
            cb(null, "User Profile Updated Successfully");
        } catch (e) {
            cb(null, e);
        }
    },
    getPurchaseHistory: function (body, cb) {
        let sql2 = "select no_of_seats,total_price,movie_name,photos,hall_name from billings AS bill " +
            "INNER JOIN movie_schedules as schedule on bill.movie_schedule_id=schedule.id " +
            "INNER JOIN halls on schedule.hall_id=halls.id " +
            "INNER JOIN movies on schedule.movie_id=movies.id where bill.user_id=\'<userId>\'";

        sql2 = sql2.replace('<userId>', body["userId"]);

        try {
            usermodel.sequelize.query(sql2).spread((results, metadata) => {
                cb(null, results);
            });
        } catch (err) {
            cb(err, null);
        }
    }
};