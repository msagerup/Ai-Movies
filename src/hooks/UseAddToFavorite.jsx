import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { userSelector } from '../Redux/Features/auth';
import { useGetListQuery } from '../Redux/Services/TMDB';

const UseAddToFavorite = ({ id: movieId }) => {
  const { user } = useSelector(userSelector);
  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const { data: favoriteMovies, isLoading, refetch: refetchFavorites } = useGetListQuery({ listName: 'favorite/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 });

  useEffect(() => {
    // check for movie in favorite list
    if (favoriteMovies) {
      const isMovieInFavoriteList = !!favoriteMovies?.results?.find((movie) => movie.id === movieId);
      setIsMovieFavorited(isMovieInFavoriteList);
    }
  }, [movieId, favoriteMovies]);

  const addToFavorites = useCallback(
    async (id) => {
      if (id) {
        try {
          await axios.post(`https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`, {
            media_type: 'movie',
            media_id: id,
            favorite: !isMovieFavorited,
          });
          setIsMovieFavorited((prev) => !prev);
          refetchFavorites(); // Refetch favorites after adding to favorites
        } catch (error) {
          console.error('Failed to add to favorites:', error);
        }
      }
    },
    [isMovieFavorited, user.id, refetchFavorites],
  );

  return { isMovieFavorited, isLoading, addToFavorites };
};

export default UseAddToFavorite;
