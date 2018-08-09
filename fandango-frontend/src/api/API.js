const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://myec2.ddns.net:3001'

const headers = {
    'Accept': 'application/json'
};

export const getMovies = () =>
    fetch(`${api}/getMovies`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({})
    }).then(res => {
        return successHandler(res);
    }).catch(error => {
        return error;
    });


export const getUsers = () =>
    fetch(`${api}/getUsers`, {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    }).then(res => {
        return successHandler(res);
    }).catch(error => {
        return error;
    });

export const getMovieById = (movieId) =>
    fetch(`${api}/getMovies`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ id: movieId })
    }).then(res => {
        return successHandler(res);
    }).catch(error => {
        return error;
    });

export const getHallById = (hallId) =>
    fetch(`${api}/getHalls`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ id: hallId })
    }).then(res => {
        return successHandler(res);
    }).catch(error => {
        return error;
    });

export const topTenMovies = () =>
    fetch(`${api}/topTenMoviesByRevenue`, {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    }).then(res => {
        return successHandler(res);
    }).catch(error => {
        return error;
    });

export const movieReviewGraphAPI = () =>
    fetch(`${api}/moviereviewgraph`, {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    }).then(res => {
        return successHandler(res);
    }).catch(error => {
        return error;
    });

export const getTraceDiagram = (dataJson) =>
    fetch(`${api}/tracediagram`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(dataJson)
    }).then(res => {
        return successHandler(res);
    }).catch(error => {
        return error;
    });

export const clicksPerPage = () =>
    fetch(`${api}/api/getlogs`, {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    }).then(res => {
        return successHandler(res);
    }).catch(error => {
        return error;
    });


export const topTenHalls = () =>
    fetch(`${api}/topTenHallByTickets`, {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    }).then(res => {
        return successHandler(res);
    }).catch(error => {
        return error;
    });

export const getLimitedMovies = (noOfRecords) =>
    fetch(`${api}/getMovies`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ count: noOfRecords })
    }).then(res => {
        return successHandler(res);
    }).catch(error => {
        return error;
    });

export const getHalls = (hallJson) =>
    fetch(`${api}/getHalls`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(hallJson)
    }).then(res => {
        return successHandler(res);
    }).catch(error => {
        return error;
    });

export const getScreensByHall = (hallJson) =>
    fetch(`${api}/getScreens`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(hallJson)
    }).then(res => {
        return successHandler(res);
    }).catch(error => {
        return error;
    });

export const addMovieSchedule = (movieScheduleJson) =>
    fetch(`${api}/addMovieSchedule`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(movieScheduleJson)
    }).then(res => {
        return successHandler(res);
    }).catch(error => {
        return error;
    });

export const deleteMovieSchedule = (movieScheduleId) =>
    fetch(`${api}/deleteMovieSchedule`, {
        method: 'DELETE',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ id: movieScheduleId })
    }).then(res => {
        return successHandler(res);
    }).catch(error => {
        return error;
    });

export const getMovieSchedules = (movieScheduleJson) =>
    fetch(`${api}/getMovieSchedules`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(movieScheduleJson)
    }).then(res => {
        return successHandler(res);
    }).catch(error => {
        return error;
    });

export const getRevenueByMovie = (dataJson) =>
    fetch(`${api}/getRevenueByMovie`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(dataJson)
    }).then(res => {
        return successHandler(res);
    }).catch(error => {
        return error;
    });

export const getRevenueByMoviePerHall = (dataJson) =>
    fetch(`${api}/movierevenuebyadmin`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(dataJson)
    }).then(res => {
        return successHandler(res);
    }).catch(error => {
        return error;
    });

export const getProfile = (dataJson) =>
    fetch(`${api}/getProfile`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(dataJson)
    }).then(res => {
        return successHandler(res);
    }).catch(error => {
        return error;
    });

export const updateUserDetails = (dataJson) =>
    fetch(`${api}/updateProfile`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(dataJson)
    }).then(res => {
        return successHandler(res);
    }).catch(error => {
        return error;
    });

export const getCityWiseRevenueByMovie = (movie_id) =>
    fetch(`${api}/getCityWiseRevenueByMovie`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ movie_id })
    }).then(res => {
        return successHandler(res);
    }).catch(error => {
        return error;
    });

export const getUserByEmail = (email) =>
    fetch(`${api}/getUserByEmail`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ email })
    }).then(res => {
        return successHandler(res);
    }).catch(error => {
        return error;
    });


export const searchUserBooking = (bookingJson) =>
    fetch(`${api}/searchBooking`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(bookingJson)
    }).then(res => {
        return successHandler(res);
    }).catch(error => {
        return error;
    });

export const cancelUserBooking = (bookingId) =>
    fetch(`${api}/cancelBooking`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ bill_id: bookingId })
    }).then(res => {
        return successHandler(res);
    }).catch(error => {
        return error;
    });

/* Upload a file */
export const uploadFile = function (data, movieName) {
    var url = `${api}/uploadFile`;
    return fetch(url, {
        method: 'POST',
        body: data,
        credentials: 'include'
    })
};


export const addMovie = (movieName, description, trailer, photos, seeItIn, cast, movieLength, releaseDate, genres, is_archive) =>
    fetch(`${api}/addMovie`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ movieName, description, trailer, photos, seeItIn, cast, releaseDate, movieLength, genres, is_archive })
    }).then(res => {
        return successHandler(res);
    }).catch(error => {
        return error;
    });
    

export const editMovie = (movieId, movieName, description, trailer, photos, seeItIn, cast, movieLength, releaseDate, genres, is_archive) =>
    fetch(`${api}/editMovie`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            id: movieId,
            movieName, description, trailer, photos, seeItIn, cast, movieLength, releaseDate, genres, is_archive
        })
    }).then(res => {
        return successHandler(res);
    }).catch(error => {
        return error;
    });

export const editHall = (hallId, hallName, street, city, state, zipcode, totalScreens, is_archive) =>
    fetch(`${api}/editHall`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            id: hallId,
            hallName, street, city, state, zipcode,
            screen_nums: totalScreens, is_archive
        })
    }).then(res => {
        return successHandler(res);
    }).catch(error => {
        return error;
    });

export const addHall = (hallName, street, city, state, zipcode, totalScreens, is_archive) =>
    fetch(`${api}/addHall`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            hallName, street, city, state, zipcode, is_archive,
            screen_nums: totalScreens
        })
    }).then(res => {
        return successHandler(res);
    }).catch(error => {
        return error;
    });

export const addScreen = (hallId, screenNum, screenType, totalSeats, is_archive) =>
    fetch(`${api}/addScreen`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            hallId, screenNum, screenType, totalSeats, is_archive
        })
    }).then(res => {
        return successHandler(res);
    }).catch(error => {
        return error;
    });

export const updateProfile = (userId, email, role, first_name, last_name,
    address, city, state, zipcode, phone_number, hall_id) =>
    fetch(`${api}/updateProfile`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            userId, email, role, first_name, last_name, address, city, state, zipcode, phone_number, hall_id
        })
    }).then(res => {
        return successHandler(res);
    }).catch(error => {
        return error;
    });

export const editScreen = (screenId, screenType, totalSeats, is_archive) =>
    fetch(`${api}/editScreen`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            screenId, screenType, totalSeats, is_archive
        })
    }).then(res => {
        return successHandler(res);
    }).catch(error => {
        return error;
    });

let successHandler = (res) => {
    if (res.status === 401) {
        // UserHelper.redirectToLogin();
    } else {
        return res.json();
    }
}