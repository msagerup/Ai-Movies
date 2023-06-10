import React from 'react';
import { Grid } from '@mui/material';

import { useSelector } from 'react-redux';
import useStyles from './styles.js';
import Movie from '../Movie/index.js';

const MovieList = ({ movies }) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.moviesContainer}>
      {movies.results.map((movie, i) => (
        <Movie key={i} movie={movie} index={i} />
      ))}
    </Grid>
  );
};

export default MovieList;
