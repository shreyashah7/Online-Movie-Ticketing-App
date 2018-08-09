var connection = new require('./kafka/Connection');

var registrationTopicName = 'registration_topic';


var producer = connection.getProducer();

var consumer = connection.getConsumer('admin');

// Add additional topic handlers
var loginHandler = require('./services/users/index');
var addMovieHandler = require('./services/movies/addMovie');
var getMoviesHandler = require('./services/movies/getMovies');
var editMovieHandler = require('./services/movies/editMovie');
var addHallHandler = require('./services/halls/addHall');
var getHallsHandler = require('./services/halls/getHalls');
var editHallHandler = require('./services/halls/editHall');
var addScreenHandler = require('./services/screens/addScreen');
var getScreensHandler = require('./services/screens/getScreens');
var editScreenHandler = require('./services/screens/editScreen');
var getLimitedMoviesHandler = require('./services/movies/getLimitedMovies');
var addMovieScheduleHandler = require('./services/movieschedule/addMovieSchedule');
var deleteMovieScheduleHandler = require('./services/movieschedule/deleteMovieSchedule');
var getAllMovieScheduleByHallScreenDateHandler = require('./services/movieschedule/getAllMovieScheduleByHallScreenDate');
var getRevenueByMovieHandler = require('./services/movieschedule/getRevenueByMovie');
var cancelBookingHandler = require('./services/movieschedule/cancelBooking');
var searchBookingHandler = require('./services/movieschedule/searchBooking');
var topTenMoviesByRevenue = require('./services/adminanalytics/topTenMoviesByRevenue');
var cityWiseMovieRevenue = require('./services/adminanalytics/cityWiseMovieRevenue');
var topTenHallByTickets = require('./services/adminanalytics/topTenHallByTickets');
var clicksPerPage = require('./services/adminanalytics/clicksPerPage');
var movieRevenueByAdmin = require('./services/adminanalytics/movieRevenueByAdmin');
var movieReviewGraph = require('./services/adminanalytics/movieReviewGraph');
var traceDiagram = require('./services/adminanalytics/traceDiagram');
var getAllUsers = require('./services/adminanalytics/getAllUsers');
var insertTrace = require('./services/adminanalytics/insertTrace');

const userService = Object.assign(require('./services/users'), require('./services/ratings'),
    require('./services/movieschedule/getmovieschedulebydate'), require('./services/Billing'));

consumer.addTopics(['request'], function (err, added) {
    if (err) {
        console.log(`AddTopics Error: ${err}`);
    } else if (added) {
        console.log(`Topics added: ${added}`);
    }
});


/*****************************/

// Handle OffsetOutOfRange Error

var kafka = require('kafka-node');
var Client = kafka.Client;
var Offset = kafka.Offset;
var client = new Client('localhost:2181');
var offset = new Offset(client);

let topic = 'admin' || 'request';

consumer.on('error', function (err) {
    console.log(`Error: ${err}`);
})
consumer.on('offsetOutOfRange', function (topic) {
    console.log('offsetOutOfRange Error')
    topic.maxNum = 2;
    offset.fetch([topic], function (err, offsets) {
        if (err) {
            return console.error(err);
        }
        var min = Math.min.apply(null, offsets[topic.topic][topic.partition]);
        consumer.setOffset(topic.topic, topic.partition, min);
    });
});

/*****************************/


consumer.on('message', (message) => {
    console.log('Received message on Topic ');
    console.log(`Total Msg: ${JSON.stringify(message)}`);
    console.log(`data: ${message.value}`)
    var data = JSON.parse(message.value);
    let handler;
    console.log(data.data.key);
    switch (data.data.key) {
        case 'addMovie':
            handler = addMovieHandler;
            break;
        case 'getMovie':
            handler = getMoviesHandler;
            break;
        case 'addHall':
            handler = addHallHandler;
            break;
        case 'getHall':
            handler = getHallsHandler;
            break;
        case 'addScreen':
            handler = addScreenHandler;
            break;
        case 'getScreen':
            handler = getScreensHandler;
            break;
        case 'editMovie':
            handler = editMovieHandler;
            break;
        case 'editHall':
            handler = editHallHandler;
            break;
        case 'deleteHall':
            console.log('DELETE HALL HANDLER');
            handler = deleteHallHandler;
            break;
        case 'editScreen':
            handler = editScreenHandler;
            break;
        case 'getLimitedMovie':
            handler = getLimitedMoviesHandler;
            break;
        case 'addMovieSchedule':
            handler = addMovieScheduleHandler;
            break;
        case 'getMovieSchedules':
            handler = getAllMovieScheduleByHallScreenDateHandler;
            break;
        case 'deleteMovieSchedule':
            handler = deleteMovieScheduleHandler;
            break;
        case 'getRevenueByMovie':
            handler = getRevenueByMovieHandler;
            break;
        case 'cancelBooking':
            handler = cancelBookingHandler;
            break;
        case 'searchBooking':
            handler = searchBookingHandler;
            break;
        case 'topTenMoviesByRevenue':
            handler = topTenMoviesByRevenue;
            break;
        case 'cityWiseMovieRevenue':
            handler = cityWiseMovieRevenue;
            break;
        case 'topTenHallByTickets':
            handler = topTenHallByTickets;
            break;
        case 'clicksPerPage':
            handler = clicksPerPage;
            break;
        case 'movierevenuebyadmin':
            handler = movieRevenueByAdmin;
            break;
        case 'moviereviewgraph':
            handler = movieReviewGraph;
            break;
        case 'tracediagram':
            handler = traceDiagram;
            break;
        case 'getUsers':
            handler = getAllUsers;
            break;
        case 'trace':
            handler = insertTrace;
            break;
        default:
            console.log('DEFAULT HANDLER');
            userService[data.data.key](data.data.value, function (err, res) {
                if (err) {
                    res = err;
                }
                console.log('after handle: %o', res);
                var payloads = [
                    {
                        topic: data.replyTo,
                        messages: JSON.stringify({
                            correlationId: data.correlationId,
                            data: res
                        }),
                        partition: 0
                    }
                ];

                producer.send(payloads, function (err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Data sent by Producer: ');
                        console.log(data);
                    }
                });
                return;
            });
            return;
            break;
    }

    handler.handle_request(data.data.value, function (err, res) {
        // console.log('after handle: %o', res);
        var payloads = [{
            topic: data.replyTo,
            messages: JSON.stringify({
                correlationId: data.correlationId,
                data: res
            }),
            partition: 0
        }];

        producer.send(payloads, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                console.log('Data sent by Producer: ');
                console.log(data);
            }
        });
        return;
    });
});