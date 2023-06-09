import React, { useState, useEffect } from 'react';
import {
  Box,
  CircularProgress,
  useMediaQuery,
  Typography,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';

import { useGetMoviesQuery } from '../../../../Redux/Services/TMDB';

const Movies = () => {
  const { data, error, isLoading } = useGetMoviesQuery();

  console.log(data);
  return (
    <div>
      <h2>MoviePage</h2>
    </div>
  );
};

export default Movies;
