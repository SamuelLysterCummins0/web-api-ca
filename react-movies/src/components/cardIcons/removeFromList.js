import React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { removeMovieFromList } from "../../api/lists-api";

const RemoveFromListIcon = ({ movie, listId }) => {
    const username = JSON.parse(atob(localStorage.getItem('token').split('.')[1])).username;

    const handleRemove = async (e) => {
        e.preventDefault();
        try {
            await removeMovieFromList(username, listId, movie.id);
            window.location.reload(); // Refresh to show updated list
        } catch (error) {
            console.error('Error removing movie from list:', error);
        }
    };

    return (
        <IconButton 
            aria-label="remove from list" 
            onClick={handleRemove}
        >
            <DeleteIcon color="error" fontSize="large" />
        </IconButton>
    );
};

export default RemoveFromListIcon;