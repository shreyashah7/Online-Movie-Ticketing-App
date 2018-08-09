var express = require('express');
var router = express.Router();

var addMovie = require('./admin/addMovie');
var getMovie = require('./admin/getMovie');
var addHall = require('./admin/addHall');
var getHall = require('./admin/getHall');
var addScreen = require('./admin/addScreen');
var getScreen = require('./admin/getScreen');
var editMovie = require('./admin/editMovie');
var editHall = require('./admin/editHall');
var editScreen = require('./admin/editScreen');
var getUserByEmail = require('./admin/getUserByEmail');
var getLimitedMovies = require('./admin/getLimitedMovies');
var addMovieSchedule = require('./moviehall/addMovieSchedule');
var getMovieSchedule = require('./moviehall/getMovieSchedule');
var deleteMovieSchedule = require('./moviehall/deleteMovieSchedule');
var getRevenueByMovie = require('./moviehall/getRevenueByMovie');
var uploadFile = require('./admin/uploadFile');
var cancelBooking = require('./moviehall/cancelBooking');
var searchBooking = require('./moviehall/searchBooking');
var topTenMoviesByRevenue = require('./admin/topTenMoviesByRevenue');
var cityWiseMovieRevenue = require('./admin/cityWiseMovieRevenue');
var topTenHallByTickets = require('./admin/topTenHallByTickets');
var MovieRevenueByAdmin = require('./admin/movieRevenueByAdmin');
var movieReviewGraph = require('./admin/movieReviewGraph');
var traceDiagramByAdmin = require('./admin/traceDiagramByAdmin');
var getUsers = require('./admin/getUsers');

//acquiring user logic
const Signup = require('./users/sign_up');
const Signin = require('./users/login');
const logout = require('./users/logout');
const deleteUser = require('./users/deleteuser');
const getProfile = require("./users/getProfile");
const updateProfile = require('./users/updateProfile');
const checkLogin = require('./users/checklogin');
const addRating = require('./ratings/addrating');
const getRatings = require('./ratings/getRatings');
const getmovieschedulebydate = require('./movieschedule/getmovieschedulebydate');
const bookMovie = require('./Billing/bookMovie');
const getPurchaseHistory = require('./users/getPurchaseHistory');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/addMovie', function (req, res, next) {
  addMovie.addMovieRouterFn(req, res, next);
});
router.post('/getMovies', function (req, res, next) {
  getMovie.getMovieRouterFn(req, res, next);
});

router.get('/getUsers', function (req, res, next) {
    console.log('GET All Users API');
    getUsers.getUsersRouterFn(req, res, next);
});


router.post('/addHall', function (req, res, next) {
  addHall.addHallRouterFn(req, res, next);
});
router.post('/getHalls', function (req, res, next) {
  getHall.getHallRouterFn(req, res, next);
});
router.post('/addScreen', function (req, res, next) {
  addScreen.addScreenRouterFn(req, res, next);
});
router.post('/getScreens', function (req, res, next) {
  getScreen.getScreenRouterFn(req, res, next);
});
router.post('/editMovie', function (req, res, next) {
  editMovie.editMovieRouterFn(req, res, next);
});
router.post('/editHall', function (req, res, next) {
  editHall.editHallRouterFn(req, res, next);
});
router.post('/editScreen', function (req, res, next) {
  editScreen.editScreenRouterFn(req, res, next);
});
router.post('/getUserByEmail', function (req, res, next) {
  getUserByEmail.getUserByEmailRouterFn(req, res, next);
});
router.post('/getLimitedMovie', function (req, res, next) {
  getLimitedMovies.getLimitedMovieRouterFn(req, res, next);
});
router.post('/getRevenueByMovie', function (req, res, next) {
  getRevenueByMovie.getRevenueByMovieRouterFn(req, res, next);
});
router.post('/getCityWiseRevenueByMovie', function (req, res, next) {
    cityWiseMovieRevenue.cityWiseMovieRevenueRouterFn(req, res, next);
});
router.get('/topTenMoviesByRevenue', function (req, res, next) {
    topTenMoviesByRevenue.topTenMoviesByRevenueRouterFn(req, res, next);
});
router.get('/topTenHallByTickets', function (req, res, next) {
    topTenHallByTickets.topTenHallByTicketsRouterFn(req, res, next);
});
router.post('/movierevenuebyadmin', function (req, res, next) {
    MovieRevenueByAdmin.MovieRevenueByAdminRouterFn(req, res, next);
});
router.get('/moviereviewgraph', function (req, res, next) {
    movieReviewGraph.movieReviewGraphRouterFn(req, res, next);
});
router.post('/tracediagram', function (req, res, next) {
    console.log('GET trace diagram for a user by fandango admin');
    traceDiagramByAdmin.traceDiagramByAdminRouterFn(req, res, next);
});
router.post('/addMovieSchedule', function (req, res, next) {
  addMovieSchedule.addMovieScheduleRouterFn(req, res, next);
});
router.post('/getMovieSchedules', function (req, res, next) {
  getMovieSchedule.getMovieScheduleRouterFn(req, res, next);
});
router.delete('/deleteMovieSchedule', function (req, res, next) {
  deleteMovieSchedule.deleteMovieScheduleRouterFn(req, res, next);
});
router.post('/cancelBooking', function (req,res,next) {
  cancelBooking.cancelBookingRouterFn(req,res,next);
});
router.post('/searchBooking', function (req,res,next) {
  console.log('CANCEL BOOKING API');
  searchBooking.searchBookingRouterFn(req,res,next);
});

router.post('/Signup', function (req, res, next) {
  console.log('SIGNUP API');
  Signup.signUpRouterFn(req, res, next);
});

router.post('/Signin', function (req, res, next) {
  console.log('SIGN IN API');
  Signin.loginRouterFn(req, res, next);
});

router.post('/Signout', function (req, res, next) {
  console.log('SIGN OUT API');
  logout.logoutRouterFn(req, res, next);
});

router.post('/deleteUser', function (req, res, next) {
  console.log('DELETE USER API');
  deleteUser.deleteUserRouterFn(req, res, next);
});

router.post('/getProfile', function (req,res,next) {
    console.log('GET PROFILE API');
    getProfile.getProfileRouterFn(req,res,next);
});

router.post('/updateProfile', function (req,res,next) {
    console.log('UPDATE PROFILE API');
    updateProfile.updateProfileRouterFn(req,res,next);
});

router.post('/uploadFile', function (req,res,next) {
  console.log('UPLOAD FILE API');
  uploadFile.uploadFileRouterFn(req,res,next);
});

router.post('/checklogin', function (req,res,next) {
    console.log('CHECK SESSION API');
    checkLogin.checkLoginRouterFn(req,res,next);
});

router.post('/addRating', function (req,res,next) {
    console.log('ADD RATING API');
    addRating.addRatingRouterFn(req,res,next)
});

router.post('/getRatings', function (req,res,next) {
    console.log('GET RATING API');
    getRatings.getRatingsRouterFn(req,res,next)
});

router.post('/getmovieschedulebydate', function (req,res,next) {
    console.log('GET MOVIE SCHEDULE BY DATE API');
    getmovieschedulebydate.getmovieschedulebydateRouterFn(req,res,next)
});

router.post('/bookMovie', function (req,res,next) {
    console.log('BOOOK MOVIE API');
    bookMovie.bookMovieRouterFn(req,res,next)
});

router.post('/getPurchaseHistory', function (req,res,next) {
    getPurchaseHistory.getPurchaseHistoryRouterFn(req,res,next)
});

module.exports = router;
