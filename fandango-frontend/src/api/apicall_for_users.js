const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://myec2.ddns.net:3001';

const headers = {
    'Accept': 'application/json'
};

export const doSignup = (payload) =>
    fetch(`${api}/Signup`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res => {
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });


export const doLogin = (payload) =>
    fetch(`${api}/Signin`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res => {
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });


export const checkLogin = (payload) =>
    fetch(`${api}/checklogin`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res => {
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const doSignOut = (payload) =>
    fetch(`${api}/Signout`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res => {
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const getMovies = (payload) =>
    fetch(`${api}/getMovies`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res => {
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const getRatings = (payload) =>
    fetch(`${api}/getRatings`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res => {
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const addRating = (payload) =>
    fetch(`${api}/addRating`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res => {
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const getmovieschedulebydate = (payload) =>
    fetch(`${api}/getmovieschedulebydate`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res => {
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });


export const bookMovie = (payload) =>
    fetch(`${api}/bookMovie`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res => {
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const getPurchaseHistory = (payload) =>
    fetch(`${api}/getPurchaseHistory`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res => {
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const deleteUser = (payload) =>
        fetch(`${api}/deleteUser`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            credentials:'include',
            body: JSON.stringify(payload)
        }).then(res => res.json())
            .then(res =>{
                return res;
            })
            .catch(error => {
                console.log("This is error");
                return error;
            });

export const getProfile = (payload) =>
    fetch(`${api}/getProfile`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res => {
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });

