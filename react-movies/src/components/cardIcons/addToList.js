import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useQuery } from 'react-query';
import { getUserLists, addMovieToList } from '../../api/lists-api';

const AddToListIcon = ({ movie }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const username = localStorage.getItem('token') 
        ? JSON.parse(atob(localStorage.getItem('token').split('.')[1])).username 
        : null;
    
    const { data: lists = [], refetch } = useQuery(
        ['lists', username],
        () => getUserLists(username),
        { enabled: !!username }
    );

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAddToList = async (listId) => {
        try {
            await addMovieToList(username, listId, movie.id);
            refetch();
        } catch (error) {
            console.error('Error adding movie to list:', error);
        }
        handleClose();
    };

    return (
        <>
            <IconButton aria-label="add to list" onClick={handleClick}>
                <PlaylistAddIcon color="primary" fontSize="large" />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {lists.map((list) => (
                    <MenuItem key={list._id} onClick={() => handleAddToList(list._id)}>
                        {list.name}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default AddToListIcon;