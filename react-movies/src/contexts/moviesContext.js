import React, { useState, useEffect} from  "react";
import { getUserData, updateUserFavorites, updateUserMustWatch } from "../api/auth-api";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState( [] )
  const [myReviews, setMyReviews] = useState( {} ) 
  const [mustWatch, setMustWatch] = useState( [] )

  useEffect(() => {
    const loadUserData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const username = JSON.parse(atob(token.split('.')[1])).username;
        try {
          const data = await getUserData(username);
          if (data) {
            setFavorites(data.favorites || []);
            setMustWatch(data.mustWatch || []);
          }
        } catch (error) {
          console.error('Error in retrieving user data:', error);
        }
      } else {
        setFavorites([]);
        setMustWatch([]);
      }
    };
  
    loadUserData();
  }, [localStorage.getItem('token')]);

  const addToFavorites = async (movie) => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const username = JSON.parse(atob(token.split('.')[1])).username;
      let newFavorites = [...favorites];
      if (!favorites.includes(movie.id)) {
        newFavorites = [...favorites, movie.id];
      }
      const response = await updateUserFavorites(username, newFavorites);
      if (response.success) {
        setFavorites(response.favorites);
        getUserData(username)
          .then((data) => {
            if (data) {
              setFavorites(data.favorites || []);
            }
          })
      } else {
        console.error('Error updating favorites:', response);
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  }
};

const addToMustWatch = async (movie) => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const username = JSON.parse(atob(token.split('.')[1])).username;
      let newMustWatch = [...mustWatch];
      if (!mustWatch.includes(movie.id)) {
        newMustWatch.push(movie.id);
        const response = await updateUserMustWatch(username, newMustWatch);
        if (response.success) {
          setMustWatch(response.mustWatch);
        } else {
          console.error('Error updating must-watch list:', response);
        }
      }
    } catch (error) {
      console.error('Error adding to must-watch list:', error);
    }
  }
};
  const addReview = (movie, review) => {
    setMyReviews( {...myReviews, [movie.id]: review } )
  };
  //console.log(myReviews);
  
  const removeFromFavorites = async (movie) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const username = JSON.parse(atob(token.split('.')[1])).username;
        const newFavorites = favorites.filter(id => id !== movie.id);
        const response = await updateUserFavorites(username, newFavorites);
        if (response.success) {
          setFavorites(response.favorites);
        } else {
          console.error('Error updating favorites:', response);
        }
      } catch (error) {
        console.error('Error removing:', error);
      }
    }
  };

  const removeFromMustWatch = async (movie) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const username = JSON.parse(atob(token.split('.')[1])).username;
        const newMustWatch = mustWatch.filter(id => id !== movie.id);
        const response = await updateUserMustWatch(username, newMustWatch);
        if (response.success) {
          setMustWatch(response.mustWatch);
        } else {
          console.error('Error updating must-watch list:', response);
        }
      } catch (error) {
        console.error('Error removing from must-watch:', error);
      }
    }
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        addReview,
        addToMustWatch,
        removeFromMustWatch,
        mustWatch,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;