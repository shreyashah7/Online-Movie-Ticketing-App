var modelMovie = require('./../../models/Movie');

function handle_request(msg, callback){
    console.log(`Handle request: ${msg}`);
    // force: true will drop the table if it already exists
    modelMovie.Movie.sync({force: false}).then(() => {
        return modelMovie.Movie.create({
        movie_name: msg.movie_name,
        description: msg.description,
        see_it_in: msg.seeItIn,
        trailer: msg.trailer,
        photos : msg.photos,
        cast: msg.cast,
        movie_length: msg.movieLength,
        release_date: msg.releaseDate,
        genres: msg.genres,
        is_archive: msg.is_archive
        });
    }).then((addedMovie) => {
        let result= {};
        result.data = addedMovie;
        result.message = 'Movie added';
        callback(null, result);
    });
}

module.exports = {
    handle_request
}