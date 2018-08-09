const Sequelize = require('sequelize');
const db = require('../db/mysql');

const Ratings = db.sequelize.define('ratings', {
    userId: {
        type: Sequelize.DataTypes.UUID,
        primaryKey:true
    }, rating: {
        type: Sequelize.DataTypes.FLOAT,
        defaultValue: 0
    },
    movie_id: {
        type: Sequelize.DataTypes.UUID,
        primaryKey:true
    },
    review_title: {
        type: Sequelize.DataTypes.STRING,
        default: "Review title goes here"
    },
    review_body: {
        type: Sequelize.DataTypes.STRING,
        default: "Review description goes here"
    }
});

Ratings.sync();
module.exports = Ratings;