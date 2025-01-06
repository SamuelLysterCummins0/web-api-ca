export const login = async (username, password) => {
    const response = await fetch('http://localhost:8080/api/users', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    });
    return response.json();
};

export const signup = async (username, password) => {
    const response = await fetch('http://localhost:8080/api/users?action=register', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    });
    return response.json();
};

export const getUserData = async (username) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8080/api/users/${username}`, {
            headers: {
                'Authorization': token
            }
        });
        const data = await response.json();
        console.log('User data retrieved:', {
            username: data.username,
            favorites: data.favorites,
            mustWatch: data.mustWatch
        });
        return data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

export const updateUserFavorites = async (username, favorites) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/api/users/${username}/favorites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify({ favorites }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };
  
  export const updateUserMustWatch = async (username, mustWatch) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/api/users/${username}/mustWatch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify({ mustWatch }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

  export const getUserProfile = async (username) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:8080/api/users/${username}/profile`, {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
    });
    return response.json();
};

export const updateUserProfile = async (username, profileData) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:8080/api/users/${username}/profile`, {
        method: 'PUT',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(profileData)
    });
    return response.json();
};
  