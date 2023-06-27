import React from 'react';
import { useDispatch } from 'react-redux';
import { setMovieDetails } from '../Redux/Features/movieDetails';
import { useGetMovieDetailsQuery } from '../Redux/Services/TMDB';

const UseDetailedMovie = (id) => {
  const { data, error, isFetching } = useGetMovieDetailsQuery(id);

  useDispatch(setMovieDetails(data));

  if (error) {
    console.error(error);
    return error;
  }

  return { dispatch, isFetching };
};

export default UseDetailedMovie;
