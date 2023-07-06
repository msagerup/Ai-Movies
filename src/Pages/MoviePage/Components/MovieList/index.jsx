import React, { } from 'react';
import { useMediaQuery } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { useSelector } from 'react-redux';
import Movie from '../Movie/index.js';
import { selectMovieDetails } from '../../../../Redux/Features/movieDetails.js';
import useStyles from './styles.js';

const MovieList = ({ movies, shouldFetchMovieDetails }) => {
  const isMdorLarger = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const classes = useStyles();
  const numberOfMovies = isMdorLarger ? 15 : 12;

  const activeMovie = useSelector(selectMovieDetails);

  return (
    <Grid
      container
      spacing={1}
      columns={{
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
      }}
      disableEqualOverflow   
    >
      {movies.slice(0, numberOfMovies).map((movie, i) => (
        <Grid 
          key={movie.id} 
          xs={1}
          className={classes.cardItem}
        >
          <Movie 
            movie={movie}
            index={i}
            shouldFetchMovieDetails={shouldFetchMovieDetails}
            activeMovieId={activeMovie?.id}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieList;
