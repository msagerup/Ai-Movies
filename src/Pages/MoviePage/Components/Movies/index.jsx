import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, useMediaQuery } from '@mui/icons-material';
import { useSelector } from 'react-redux';

import { Typography } from '@mui/material';
import { useGetMoviesQuery } from '../../../../Redux/Services/TMDB';
import MovieList from '../MovieList';
import Loader from '../../../../Components/Loader/Loader';

const Movies = () => {
  const { data, error, isLoading } = useGetMoviesQuery();

  if (isLoading) {
    return <Loader size="4rem" display="flex" position="center" />;
  }

  if (error) {
    return (
      <Typography variant="h6">
        Sorry, there has been an error, try to reload the page or try again
        later.
      </Typography>
    );
  }

  return (
    <div>
      <MovieList movies={data} />
    </div>
  );
};

export default Movies;
