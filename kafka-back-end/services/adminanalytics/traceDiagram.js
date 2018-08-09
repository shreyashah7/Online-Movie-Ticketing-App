var moment = require('moment');

// Add MongoDB connections
const MongoClient = require('mongodb').MongoClient;

var mongoURL = 'mongodb://admin:admin@ds263619.mlab.com:63619/fandango';

var traceCollection;
MongoClient.connect(mongoURL, function (err, db) {
    if(err) {
        console.log("Unable to connect to MongoDB");
    } else {
        console.log("Connected to MongoDB");
        traceCollection = db.collection('trace');
    }
});

function handle_request(msg, callback) {
    console.log(`Incoming message: ${JSON.stringify(msg)}`);

    if (!!msg.user_id) {
        traceCollection.findOne({userid:msg.user_id}, {sort: {logged_date: -1}, limit: 1}, function(err, items){
            if (err){
                callback(err,null);
                return;
            }
            callback(null,items);
        });
    }
}

module.exports = {
    handle_request
};