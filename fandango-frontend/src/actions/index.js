//create all your actions here..

export const loginUser = (userinfo) => {
    console.log(userinfo);
    return{
        type: 'LOGIN_USER',
        payload: userinfo
    }
};

export const selectedMovie = (movieinfo) => {
    console.log(movieinfo);
    return{
        type: 'SELECTED_MOVIE',
        payload: movieinfo
    }
};

export const selectedSchedule = (movie_schedule_id, price, available_seats ) => {
    //console.log(scheduleinfo);
    return{
        type: 'SELECTED_SCHEDULE',
        payload: {
            "movie_schedule_id": movie_schedule_id,
            "price": price,
            "available_seats": available_seats
        }
    }
};

export const selectedTrace = (traceinfo) => {
    console.log(traceinfo);
    return{
        type: 'SELECTED_TRACE',
        payload: traceinfo
    }
};


export const doneBooking = (bookinginfo) => {
    console.log(bookinginfo);
    return{
        type: 'DONE_BOOKING',
        payload: bookinginfo
    }
};


export const selectedReview = (reviewinfo) => {
    console.log(reviewinfo);
    return{
        type: 'SELECTED_REVIEW',
        payload: reviewinfo
    }
};

export const searchCriteria = (info) => {
    console.log(info);
    return{
        type: 'SEARCH_CRITERIA',
        payload: info
    }
};
