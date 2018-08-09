var moment = require('moment');

// Add MongoDB connections
const MongoClient = require('mongodb').MongoClient;

var mongoURL = 'mongodb://admin:admin@ds263619.mlab.com:63619/fandango';

var traceCollection;
MongoClient.connect(mongoURL, function (err, db) {
    if (err) {
        console.log("Unable to connect to MongoDB");
    } else {
        console.log("Connected to MongoDB");
        traceCollection = db.collection('trace');
    }
});

function handle_request(msg, callback) {
    console.log(`Incoming message: ${JSON.stringify(msg)}`);

    if (!!msg.userid) {
        console.log("inside if")
        msg.logged_date = new Date(Date.now()).toISOString();
        traceCollection.insert(msg, function (err, item) {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, item);
        });
    }
}

module.exports = {
    handle_request
};
