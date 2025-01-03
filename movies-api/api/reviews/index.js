import express from 'express';
import Review from './reviewModel';
import asyncHandler from 'express-async-handler';
import { isValidObjectId } from 'mongoose';

const router = express.Router();

// Get all reviews for a movie
router.get('/movie/:id', asyncHandler(async (req, res) => {
    const movieId = parseInt(req.params.id);
    const reviews = await Review.findByMovieId(movieId);
    res.status(200).json(reviews);
}));

// Get all reviews by a user
router.get('/user/:userId', asyncHandler(async (req, res) => {
    if (!isValidObjectId(req.params.userId)) {
        return res.status(400).json({ success: false, msg: 'Invalid user ID format' });
    }
    const reviews = await Review.findByUserId(req.params.userId);
    res.status(200).json(reviews);
}));

// Create a new review
router.post('/', asyncHandler(async (req, res) => {
    if (!req.body.movieId || !req.body.review || !req.body.rating || !req.body.author) {
        return res.status(400).json({ success: false, msg: 'All fields are required' });
    }
    const review = await Review.create({
        ...req.body,
        userId: req.user._id // From authenticate middleware
    });
    res.status(201).json(review);
}));

// Update a review
router.put('/:id', asyncHandler(async (req, res) => {
    if (!isValidObjectId(req.params.id)) {
        return res.status(400).json({ success: false, msg: 'Invalid review ID format' });
    }
    const review = await Review.findById(req.params.id);
    if (!review) {
        return res.status(404).json({ success: false, msg: 'Review not found' });
    }
    if (review.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ success: false, msg: 'Unauthorized to update this review' });
    }
    const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedReview);
}));

// Delete a review
router.delete('/:id', asyncHandler(async (req, res) => {
    if (!isValidObjectId(req.params.id)) {
        return res.status(400).json({ success: false, msg: 'Invalid review ID format' });
    }
    const review = await Review.findById(req.params.id);
    if (!review) {
        return res.status(404).json({ success: false, msg: 'Review not found' });
    }
    if (review.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ success: false, msg: 'Unauthorized to delete this review' });
    }
    await Review.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, msg: 'Review deleted successfully' });
}));

export default router;