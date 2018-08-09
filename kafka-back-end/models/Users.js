const Sequelize = require('sequelize');
const db = require('../db/mysql');

const Users = db.sequelize.define('users', {
    userId: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true
    }, role: {
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: 3
    },
    first_name: {
        type: Sequelize.STRING
    },
    last_name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        unique: true
    },
    password_hash: {
        type: Sequelize.STRING
    },
    address: {
        type: Sequelize.STRING
    },
    city: {
        type: Sequelize.DataTypes.STRING
    },
    state: {
        type: Sequelize.DataTypes.STRING
    },
    zipcode: {
        type: Sequelize.DataTypes.INTEGER
    },
    phone_number: {
        type: Sequelize.DataTypes.STRING
    },
    profile_image: {
        type: Sequelize.DataTypes.STRING
    },
    credit_card_number: {
        type: Sequelize.DataTypes.STRING
    },
    expiration: {
        type: Sequelize.DataTypes.DATE
    },
    hall_id: {
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: null
    },
    is_archive: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false
    }
});

Users.sync();
module.exports = Users;