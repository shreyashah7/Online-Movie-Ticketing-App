//Create your reducers in reducers directory
//import your reducers and combine them in all Reducers which is provided to the store

import { combineReducers } from 'redux';
import loginReducer from './reducer-login';
import movieReducer from './reducer-movie';
import reviewReducer from './reducer-review';
import scheduleReducer from './reducer-schedule';
import traceReducer from './reducer-trace';
import bookingReducer from './reducer-booking';
import criteriaReducer from './reducer-criteria';

const allReducers =  combineReducers({
    loginUser: loginReducer,
    selectedTrace: traceReducer,
    selectedMovie: movieReducer,
    selectedReview: reviewReducer,
    selectedSchedule: scheduleReducer,
    searchCriteria: criteriaReducer,
    doneBooking: bookingReducer

});

export default allReducers;