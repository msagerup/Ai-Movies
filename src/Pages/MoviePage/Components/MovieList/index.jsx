import React from 'react';
import { Grid, useMediaQuery } from '@mui/material';
import useStyles from './styles.js';
import Movie from '../Movie/index.js';

const MovieList = ({ movies, pageViewOverride }) => {
  const classes = useStyles();
  const lg = useMediaQuery((theme) => theme.breakpoints.only('lg'));

  const numberOfMovies = lg ? 16 : 18;

  return (
    <Grid container className={classes.moviesContainer}>
      {movies.slice(0, pageViewOverride || numberOfMovies).map((movie, i) => (
        <Movie key={i} movie={movie} index={i} />
      ))}
    </Grid>
  );
};

export default MovieList;
