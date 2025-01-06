import express from 'express';
import List from './listModel';
import asyncHandler from 'express-async-handler';

const router = express.Router();

// Get all lists for a user
router.get('/:username/lists', asyncHandler(async (req, res) => {
    const lists = await List.find({ username: req.params.username });
    res.status(200).json(lists);
}));

// Get specific list details
router.get('/:username/lists/:listId', asyncHandler(async (req, res) => {
    const list = await List.findById(req.params.listId);
    if (!list) {
        return res.status(404).json({ success: false, msg: 'List not found' });
    }
    res.status(200).json(list);
}));

// Create a new list
router.post('/:username/lists', asyncHandler(async (req, res) => {
    if (!req.body.name) {
        return res.status(400).json({ success: false, msg: 'List name is required' });
    }
    const list = await List.create({
        name: req.body.name,
        username: req.params.username,
        movies: []
    });
    res.status(201).json({ success: true, list });
}));


router.post('/:username/lists/:listId/movies', asyncHandler(async (req, res) => {
    const list = await List.findById(req.params.listId);
    if (!list) {
        return res.status(404).json({ success: false, msg: 'List not found' });
    }
    if (!list.movies.includes(req.body.movieId)) {
        list.movies.push(req.body.movieId);
        await list.save();
    }
    
    res.status(200).json({ success: true, list });
}));

router.delete('/:username/lists/:listId/movies/:movieId', asyncHandler(async (req, res) => {
    const list = await List.findById(req.params.listId);
    if (!list) {
        return res.status(404).json({ success: false, msg: 'List not found' });
    }
    
    list.movies = list.movies.filter(id => id !== parseInt(req.params.movieId));
    await list.save();
    
    res.status(200).json({ success: true, list });
}));

export default router;