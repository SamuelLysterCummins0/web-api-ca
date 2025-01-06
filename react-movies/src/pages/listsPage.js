import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getUserLists, createList } from '../api/lists-api';
import { Button, TextField, Dialog, Box, Typography, DialogActions, DialogContent, DialogTitle, Paper } from '@mui/material';

const ListsPage = () => {
    const [open, setOpen] = useState(false);
    const [listName, setListName] = useState('');
    const navigate = useNavigate();
    const username = JSON.parse(atob(localStorage.getItem('token').split('.')[1])).username;
    
    const { data: lists, refetch } = useQuery(['lists', username], () => getUserLists(username));

    const handleCreate = async (e) => {
        e.preventDefault();
        if (listName.trim()) {
            try {
                const result = await createList(username, listName.trim());
                if (result.success) {
                    await refetch();
                    setListName('');
                    setOpen(false);
                }
            } catch (error) {
                console.error('Error creating list:', error);
            }
        }
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>My Lists</Typography>
            
            <Button variant="contained" onClick={() => setOpen(true)} sx={{ mb: 3 }}>
                Create List
            </Button>

            {lists?.map(list => (
                <Paper 
                    key={list._id} 
                    sx={{ 
                        margin: 2, 
                        padding: 2, 
                        cursor: 'pointer',
                        '&:hover': {
                            backgroundColor: '#f5f5f5'
                        }
                    }}
                    onClick={() => navigate(`/lists/${username}/${list._id}`)}
                >
                    <Typography variant="h6">{list.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        {list.movies?.length || 0} movies
                    </Typography>
                </Paper>
            ))}

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Create New List</DialogTitle>
                <form onSubmit={handleCreate}>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="List Name"
                            fullWidth
                            value={listName}
                            onChange={(e) => setListName(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                        <Button type="submit">Create</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    );
};

export default ListsPage;