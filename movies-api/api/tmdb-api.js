import fetch from 'node-fetch';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

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

export const getMovie = async (id) => {
    try {
        const response = await fetch(
            `${TMDB_BASE_URL}/movie/${id}?api_key=${process.env.TMDB_KEY}&language=en-US`
        );
        if (!response.ok) {
            throw new Error('Failed to fetch movie details');
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