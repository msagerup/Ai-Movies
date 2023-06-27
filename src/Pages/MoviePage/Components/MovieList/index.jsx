import React from 'react';
import { Grid, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import Movie from '../Movie/index.js';
import { selectMovieDetails } from '../../../../Redux/Features/movieDetails.js';

const MovieList = ({ movies, pageViewOverride, shouldFetchMovieDetails }) => {
  const lg = useMediaQuery((theme) => theme.breakpoints.only('lg'));

  const numberOfMovies = lg ? 12 : 10;

  const activeMovie = useSelector(selectMovieDetails);

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
      {movies.slice(1, pageViewOverride || numberOfMovies).map((movie, i) => (
        <Movie 
          key={movie.id} 
          movie={movie}
          index={i}
          shouldFetchMovieDetails={shouldFetchMovieDetails}
          activeMovieId={activeMovie?.id}
        />
      ))}
    </Grid>
  );
};

export default MovieList;
