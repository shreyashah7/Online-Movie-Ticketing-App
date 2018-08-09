const Sequelize = require ('sequelize');
const db = require ('../db/mysql');

const Screen =  db.sequelize.define('screen', {
    hall_id: {
        type: Sequelize.INTEGER
    },
    screen_num: {
        type: Sequelize.INTEGER
    },
    screen_type: {
        type: Sequelize.STRING
    },
    total_seats: {
        type: Sequelize.INTEGER
    },
    is_archive: {
        type: Sequelize.BOOLEAN
    }
});


module.exports = { Screen };
        