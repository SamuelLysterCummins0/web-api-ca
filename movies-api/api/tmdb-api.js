import fetch from 'node-fetch';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export const getMovies = async () => {
    try {
        const response = await fetch(
            `${TMDB_BASE_URL}/discover/movie?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
        );
        if (!response.ok) {
            throw new Error('Failed to fetch movies');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getMovie = async (id) => {
    try {
        const response = await fetch(
            `${TMDB_BASE_URL}/movie/${id}?api_key=${process.env.TMDB_KEY}`
        );
        if (!response.ok) {
            throw new Error('Failed to fetch movie details');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getMovieDetailsWithCredits = async (id) => {
    try {
        const response = await fetch(
            `${TMDB_BASE_URL}/movie/${id}?api_key=${process.env.TMDB_KEY}&append_to_response=credits`
        );
        if (!response.ok) {
            throw new Error('Failed to fetch movie details with credits');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getGenres = async () => {
    try {
        const response = await fetch(
            `${TMDB_BASE_URL}/genre/movie/list?api_key=${process.env.TMDB_KEY}&language=en-US`
        );
        if (!response.ok) {
            throw new Error('Failed to fetch genres');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getUpcomingMovies = async () => {
    try {
        const response = await fetch(
            `${TMDB_BASE_URL}/movie/upcoming?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
        );
        if (!response.ok) {
            throw new Error('Failed to fetch upcoming movies');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getMovieRecommendations = async (id) => {
    try {
        const response = await fetch(
            `${TMDB_BASE_URL}/movie/${id}/recommendations?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
        );
        if (!response.ok) {
            throw new Error('Failed to fetch movie recommendations');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getTopRatedMovies = async () => {
    try {
        const response = await fetch(
            `${TMDB_BASE_URL}/movie/top_rated?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
        );
        if (!response.ok) {
            throw new Error('Failed to fetch top rated movies');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getMovieImages = async (id) => {
    try {
        const response = await fetch(
            `${TMDB_BASE_URL}/movie/${id}/images?api_key=${process.env.TMDB_KEY}`
        );
        if (!response.ok) {
            throw new Error('Failed to fetch movie images');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getTrendingMovies = async () => {
    try {
        const response = await fetch(
            `${TMDB_BASE_URL}/trending/movie/day?api_key=${process.env.TMDB_KEY}`
        );
        if (!response.ok) {
            throw new Error('Failed to fetch trending movies');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};