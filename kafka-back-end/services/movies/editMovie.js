var modelMovie = require('./../../models/Movie');

function handle_request(msg, callback){
    console.log(`Handle request: ${JSON.stringify(msg)}`);

    modelMovie.Movie.find({ where: { id: msg.id } })
    .then((movie) => {
      // Check if record exists in db
        movie.update(msg)
        .then(function (movie) {
            console.log('Success');
            callback(null, movie);
        })
    })


}

module.exports = {
    handle_request
}