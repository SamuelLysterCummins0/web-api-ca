import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import express from 'express';
import {
    getUpcomingMovies,
    getGenres,
    getMovie,
    getMovieImages,
    getMovieDetailsWithCredits,
    getMovieRecommendations,
    getTopRatedMovies,
    getTrendingMovies
  } from '../tmdb-api';

const router = express.Router();

// Get movie details
router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    // Parallel execution of counting movies and getting movies using movieModel
    const [total_results, results] = await Promise.all([
        movieModel.estimatedDocumentCount(),
        movieModel.find().limit(limit).skip((page - 1) * limit)
    ]);
    const total_pages = Math.ceil(total_results / limit); //Calculate total number of pages (= total No Docs/Number of docs per page) 

    //construct return Object and insert into response object
    const returnObject = {
        page,
        total_pages,
        total_results,
        results
    };
    res.status(200).json(returnObject);
}));


// Get upcoming movies
router.get('/upcoming', asyncHandler(async (req, res) => {
    const upcomingMovies = await getUpcomingMovies();
    res.status(200).json(upcomingMovies);
}));

// Get top rated movies
router.get('/top_rated', asyncHandler(async (req, res) => {
    const movies = await getTopRatedMovies();
    res.status(200).json(movies);
}));

// Get trending movies
router.get('/trending', asyncHandler(async (req, res) => {
    const movies = await getTrendingMovies();
    res.status(200).json(movies);
}));

// Get movie genres
router.get('/genre/list', asyncHandler(async (req, res) => {
    const genres = await getGenres();
    res.status(200).json(genres);
}));

// Get movie credits
router.get('/:id/credits', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await getMovieDetailsWithCredits(id);
    res.status(200).json(movie);
}));

// Get movie recommendations
router.get('/:id/recommendations', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const recommendations = await getMovieRecommendations(id);
    res.status(200).json(recommendations);
}));

// Get movie images
router.get('/:id/images', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const images = await getMovieImages(id);
    res.status(200).json(images);
}));

// Get movie details by ID (keep this last)
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await getMovie(id);
    res.status(200).json(movie);
}));

export default router;