const BASE_URL = 'http://localhost:8080/api';

const getAuthToken = () => {
    return localStorage.getItem('token');
};

export const getMovies = () => {
    return fetch(`${BASE_URL}/movies`, {
        headers: {
            'Authorization': `BEARER ${getAuthToken()}`
        }
    }).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    }).catch((error) => {
        throw error;
    });
};

export const getMovie = (args) => {
    console.log(args);
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    return fetch(`${BASE_URL}/movies/${id}`, {
        headers: {
            'Authorization': `BEARER ${getAuthToken()}`
        }
    }).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    }).catch((error) => {
        throw error;
    });
};

export const getMovieDetailsWithCredits = (id) => {
    return fetch(`${BASE_URL}/movies/${id}/credits`, {
        headers: {
            'Authorization': `BEARER ${getAuthToken()}`
        }
    }).then(response => response.json());
};

export const getGenres = async () => {
    return fetch(`${BASE_URL}/movies/genre/list`, {
        headers: {
            'Authorization': `BEARER ${getAuthToken()}`
        }
    }).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    }).catch((error) => {
        throw error;
    });
};

export const getUpcoming = async () => {
    return fetch(`${BASE_URL}/movies/upcoming`, {
        headers: {
            'Authorization': `BEARER ${getAuthToken()}`
        }
    }).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    }).catch((error) => {
        throw error;
    });
};

export const getMovieRecommendations = (id) => {
    return fetch(`${BASE_URL}/movies/${id}/recommendations`, {
        headers: {
            'Authorization': `BEARER ${getAuthToken()}`
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    });
};

export const getTopRatedMovies = () => {
    return fetch(`${BASE_URL}/movies/top_rated`, {
        headers: {
            'Authorization': `BEARER ${getAuthToken()}`
        }
    }).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    });
};

export const getMovieImages = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(`${BASE_URL}/movies/${id}/images`, {
        headers: {
            'Authorization': `BEARER ${getAuthToken()}`
        }
    }).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    }).catch((error) => {
        throw error;
    });
};

export const getMovieReviews = (id) => {
    return fetch(`${BASE_URL}/reviews/movie/${id}`, {
        headers: {
            'Authorization': `BEARER ${getAuthToken()}`
        }
    }).then((res) => res.json())
    .then((json) => {
        return json;  // Using our API's review format
    });
};

export const getTrendingMovies = () => {
    return fetch(`${BASE_URL}/movies/trending`, {
        headers: {
            'Authorization': `BEARER ${getAuthToken()}`
        }
    }).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    }).catch((error) => {
        throw error;
    });
};