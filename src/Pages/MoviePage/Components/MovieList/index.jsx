import React from 'react';
import { Grid, useMediaQuery } from '@mui/material';
import Movie from '../Movie/index.js';

const MovieList = ({ movies, pageViewOverride }) => {
  const lg = useMediaQuery((theme) => theme.breakpoints.only('lg'));

  const numberOfMovies = lg ? 12 : 16;

  return (
    <Grid
      spacing={1}
      container
      justifyContent={{ xs: 'center', md: 'space-evenly', lg: 'space-between' }}
      alignItems="center"
    >
      {movies.slice(1, pageViewOverride || numberOfMovies).map((movie, i) => (
        <Movie key={i} movie={movie} index={i} />
      ))}
    </Grid>
  );
};

export default MovieList;
