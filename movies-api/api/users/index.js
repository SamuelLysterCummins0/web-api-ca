import express from 'express';
import User from './userModel';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

const router = express.Router(); // eslint-disable-line

router.get('/:userName', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'No token' });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECRET);
    
        if (decoded.username !== req.params.userName) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const user = await User.findByUserName(req.params.userName);
        if (user) {
            res.status(200).json({
                username: user.username,
                favorites: user.favorites || [],
                mustWatch: user.mustWatch || [],
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error retrieving user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update favorites
router.post('/:userName/favorites', asyncHandler(async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ success: false, message: 'No token' });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECRET);
        
        if (decoded.username !== req.params.userName) {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }

        const user = await User.findByUserName(req.params.userName);
        if (user) {
            user.favorites = req.body.favorites;
            await user.save();
            res.status(200).json({ 
                success: true,
                message: 'Favorites updated', 
                favorites: user.favorites 
            });
        } else {
            res.status(404).json({ success: false, message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}));

// Update must-watch
router.post('/:userName/mustWatch', asyncHandler(async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECRET);
        
        if (decoded.username !== req.params.userName) {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }

        const user = await User.findByUserName(req.params.userName);
        if (user) {
            user.mustWatch = req.body.mustWatch;
            await user.save();
            res.status(200).json({ 
                success: true, 
                message: 'Must Watch list updated', 
                mustWatch: user.mustWatch 
            });
        } else {
            res.status(404).json({ success: false, message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}));

// register(Create)/Authenticate User
router.post('/', asyncHandler(async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({ success: false, msg: 'Username and password are required.' });
        }
        if (req.query.action === 'register') {
            await registerUser(req, res);
        } else {
            await authenticateUser(req, res);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: 'Internal server error.' });
    }
}));

// Update a user
router.put('/:id', async (req, res) => {
    if (req.body._id) delete req.body._id;
    const result = await User.updateOne({
        _id: req.params.id,
    }, req.body);
    if (result.matchedCount) {
        res.status(200).json({ code:200, msg: 'User Updated Sucessfully' });
    } else {
        res.status(404).json({ code: 404, msg: 'Unable to Update User' });
    }
});

async function registerUser(req, res) {
    // Create new user with empty arrays
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        favorites: [],
        mustWatch: []
    });
    await user.save();
    res.status(201).json({ success: true, msg: 'User successfully created.' });
}

async function authenticateUser(req, res) {
    const user = await User.findByUserName(req.body.username);
    if (!user) {
        return res.status(401).json({ success: false, msg: 'Authentication failed. User not found.' });
    }

    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
        const token = jwt.sign({ username: user.username }, process.env.SECRET);
        res.status(200).json({ success: true, token: 'BEARER ' + token });
    } else {
        res.status(401).json({ success: false, msg: 'Wrong password.' });
    }
}

// Get user profile
router.get('/:username/profile', async (req, res) => {
    try {
        const user = await User.findByUserName(req.params.username);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            displayName: user.profile.displayName || user.username,
            bio: user.profile.bio,
            joinDate: user.profile.joinDate
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update user profile
router.put('/:username/profile', async (req, res) => {
    try {
        const user = await User.findByUserName(req.params.username);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update profile fields
        if (req.body.displayName) user.profile.displayName = req.body.displayName;
        if (req.body.bio) user.profile.bio = req.body.bio;

        await user.save();
        res.status(200).json({
            success: true,
            profile: user.profile
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile' });
    }
});

export default router;