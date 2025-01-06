const BASE_URL = 'http://localhost:8080/api';

export const getUserLists = async (username) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/lists/${username}/lists`, {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
    });
    return response.json();
};

export const createList = async (username, name) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/lists/${username}/lists`, {
        method: 'POST',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name })
    });
    return response.json();
};

export const addMovieToList = async (username, listId, movieId) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/lists/${username}/lists/${listId}/movies`, {
        method: 'POST',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ movieId }) 
    });
    if (!response.ok) {
        throw new Error('Failed to add movie to list');
    }
    return response.json();
};

export const getListDetails = async (username, listId) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/lists/${username}/lists/${listId}`, {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
    });
    return response.json();
};