import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getUserProfile, updateUserProfile } from '../api/auth-api';
import { Box, Typography, TextField, Button, Paper } from '@mui/material';
import Spinner from '../components/spinner';

const ProfilePage = () => {
    const username = JSON.parse(atob(localStorage.getItem('token').split('.')[1])).username;
    const [isEditing, setIsEditing] = useState(false);
    const [displayName, setDisplayName] = useState('');
    const [bio, setBio] = useState('');

    const { data: profile, isLoading, refetch } = useQuery(
        ['profile', username], 
        () => getUserProfile(username)
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUserProfile(username, { displayName, bio });
            setIsEditing(false);
            refetch();
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    if (isLoading) return <Spinner />;

    return (
        <Box sx={{ p: 3 }}>
            <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
                <Typography variant="h4" gutterBottom>
                    Profile
                </Typography>

                {!isEditing ? (
                    <>
                        <Typography variant="h6">
                            Display Name: {profile?.displayName || username}
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 2 }}>
                            Bio: {profile?.bio || 'No bio yet'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                            Joined: {new Date(profile?.joinDate).toLocaleDateString()}
                        </Typography>
                        <Button 
                            variant="contained" 
                            onClick={() => {
                                setDisplayName(profile?.displayName || '');
                                setBio(profile?.bio || '');
                                setIsEditing(true);
                            }}
                            sx={{ mt: 2 }}
                        >
                            Edit Profile
                        </Button>
                    </>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Display Name"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            fullWidth
                            multiline
                            rows={4}
                            margin="normal"
                        />
                        <Box sx={{ mt: 2 }}>
                            <Button type="submit" variant="contained" sx={{ mr: 1 }}>
                                Save
                            </Button>
                            <Button onClick={() => setIsEditing(false)}>
                                Cancel
                            </Button>
                        </Box>
                    </form>
                )}
            </Paper>
        </Box>
    );
};

export default ProfilePage;