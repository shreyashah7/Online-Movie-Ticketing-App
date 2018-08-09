const Sequelize = require ('sequelize');
const db = require ('../db/mysql');

const Movie =  db.sequelize.define('movie', {
    movie_name: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    see_it_in: {
        type: Sequelize.STRING
    },
    trailer: {
        type: Sequelize.STRING
    },
    photos: {
        type: Sequelize.STRING
    },
    cast: {
        type: Sequelize.STRING
    },
    movie_length: {
        type: Sequelize.INTEGER
    },
    release_date: {
        type: Sequelize.DATEONLY
    },
    genres: {
        type: Sequelize.STRING
    },
    is_archive: {
        type: Sequelize.BOOLEAN
    }
});


module.exports = { Movie };
        