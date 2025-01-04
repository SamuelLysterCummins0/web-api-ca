const BASE_URL = 'http://localhost:8080/api';

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Authorization': token,  // token from login already includes "BEARER"
        'Content-Type': 'application/json'
    };
};

export const getMovies = () => {
    return fetch(`${BASE_URL}/movies`, {
        headers: getHeaders()
    }).then(async (response) => {
        if (!response.ok) {
            const text = await response.text();
            console.log("Error response:", text);
            throw new Error(text);
        }
        return response.json();
    }).catch((error) => {
        console.error("Full error:", error);
        throw error;
    });
};

export const getMovie = (args) => {
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    return fetch(`${BASE_URL}/movies/${id}`, {
        headers: getHeaders()
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
        headers: getHeaders()
    }).then(response => response.json());
};

export const getGenres = async () => {
    return fetch(`${BASE_URL}/movies/genre/list`, {
        headers: getHeaders()
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
        headers: getHeaders()
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
        headers: getHeaders()
    }).then(response => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    });
};

export const getTopRatedMovies = () => {
    return fetch(`${BASE_URL}/movies/top_rated`, {
        headers: getHeaders()
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
        headers: getHeaders()
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
        headers: getHeaders()
    }).then((res) => res.json())
    .then((json) => {
        return json;
    });
};

export const getTrendingMovies = () => {
    return fetch(`${BASE_URL}/movies/trending`, {
        headers: getHeaders()
    }).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    }).catch((error) => {
        throw error;
    });
};