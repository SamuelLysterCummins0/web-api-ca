const BASE_URL = 'http://localhost:8080/api';

export const getUserLists = async (username) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/users/${username}/lists`, {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
    });
    return response.json();
};

export const createList = async (username, name) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/users/${username}/lists`, {
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
    const response = await fetch(`${BASE_URL}/users/${username}/lists/${listId}/movies`, {
        method: 'POST',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ movieId })
    });
    return response.json();
};