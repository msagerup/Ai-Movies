import React from 'react';
import { Grid, useMediaQuery } from '@mui/material';
import Movie from '../Movie/index.js';

const MovieList = ({ movies, pageViewOverride, shouldFetchMovieDetails }) => {
  const lg = useMediaQuery((theme) => theme.breakpoints.only('lg'));

  const numberOfMovies = lg ? 12 : 16;

  console.log('RENDERCOUNT from MOVIELIST');

  // TODO:
  // 1. On hover, set state to redux in MovieDetails slice.
  // To show info in MovieHero component.
  // Should also add this feature from the Movie component. (first load)

  return (
    <Grid
      spacing={1}
      container
      justifyContent={{ xs: 'center', md: 'space-evenly', lg: 'space-between' }}
      alignItems="center"
    >
      {movies.slice(0, pageViewOverride || numberOfMovies).map((movie, i) => (
        <Movie 
          key={movie.id} 
          movie={movie}
          index={i}
          shouldFetchMovieDetails={shouldFetchMovieDetails}
        />
      ))}
    </Grid>
  );
};

export default MovieList;
