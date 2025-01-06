import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getUserLists, createList } from '../api/lists-api';
import { Button, TextField, Dialog, Box, Typography, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const ListsPage = () => {
    const [open, setOpen] = useState(false);
    const [listName, setListName] = useState('');
    const username = JSON.parse(atob(localStorage.getItem('token').split('.')[1])).username;
    
    const { data: lists, refetch } = useQuery(['lists', username], () => getUserLists(username));

    const handleCreate = async (e) => {
        e.preventDefault(); // Add this to prevent default form submission
        if (listName.trim()) {  // Check for non-empty trimmed name
            try {
                const result = await createList(username, listName.trim());
                if (result.success) {
                    await refetch();  // Refetch lists after successful creation
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
            <Button variant="contained" onClick={() => setOpen(true)}>
                Create List
            </Button>

            {lists?.map(list => (
                <Box key={list._id} sx={{ margin: 2, padding: 2, border: '1px solid grey' }}>
                    <Typography>{list.name}</Typography>
                    <Typography>{list.movies?.length || 0} movies</Typography>
                </Box>
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