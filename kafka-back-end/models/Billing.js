const Sequelize = require('sequelize');
const db = require('../db/mysql');

const Billing = db.sequelize.define('billing', {
    bill_id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.DataTypes.UUID,
        required: true
    },
    movie_schedule_id: {
        type: Sequelize.DataTypes.STRING,
        required: true
    },
    total_price: {
        type: Sequelize.DataTypes.FLOAT,
        required: true
    },
    tax: {
        type: Sequelize.DataTypes.FLOAT,
        required: true
    },
    no_of_seats: {
        type: Sequelize.DataTypes.INTEGER,
        required: true
    },
    booking_date: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.DataTypes.NOW
    },
    status: {
        type: Sequelize.DataTypes.STRING,
        required: true
    }
});

Billing.sync();
module.exports = Billing;