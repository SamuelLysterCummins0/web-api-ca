import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getUserLists } from '../api/lists-api';
import { Button, TextField, Dialog, DialogTitle, DialogContent, 
         DialogActions, List, ListItem, ListItemText } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const ListsPage = () => {
    const [open, setOpen] = useState(false);
    const [newListName, setNewListName] = useState('');
    const username = JSON.parse(atob(localStorage.getItem('token').split('.')[1])).username;
    
    const { data: lists, refetch } = useQuery(['lists', username], () => getUserLists(username));

    const handleCreateList = async () => {
        if (newListName.trim()) {
            try {
                await createList(username, newListName);
                refetch();
                setOpen(false);
                setNewListName('');
            } catch (error) {
                console.error('Error creating list:', error);
            }
        }
    };

    return (
        <div>
            <Button 
                variant="contained" 
                startIcon={<AddIcon />}
                onClick={() => setOpen(true)}
                sx={{ margin: 2 }}
            >
                Create New List
            </Button>

            <List>
                {lists?.map((list) => (
                    <ListItem key={list._id}>
                        <ListItemText 
                            primary={list.name}
                            secondary={`${list.movies.length} movies`}
                        />
                    </ListItem>
                ))}
            </List>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Create New List</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="List Name"
                        fullWidth
                        value={newListName}
                        onChange={(e) => setNewListName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleCreateList}>Create</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ListsPage;