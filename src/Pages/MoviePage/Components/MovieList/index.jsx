import React from 'react';
import { useMediaQuery } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { useSelector } from 'react-redux';
import Movie from '../Movie/index.js';
import { selectMovieDetails } from '../../../../Redux/Features/movieDetails.js';
import useStyles from './styles.js';

const MovieList = ({ movies, pageViewOverride, shouldFetchMovieDetails }) => {
  const lg = useMediaQuery((theme) => theme.breakpoints.only('lg'));
  const classes = useStyles();
  const numberOfMovies = lg ? 12 : 10;

  const activeMovie = useSelector(selectMovieDetails);
  
  // TODO:
  // 1. On hover, set state to redux in MovieDetails slice.
  // To show info in MovieHero component.
  // Should also add this feature from the Movie component. (first load)

  // console.log('movies', movies);

  return (
    <Grid
      container
      columnSpacing={1}
      columns={{
        xs: 2,
        sm: 3,
        md: 4,
        lg: 3,
      }}
      disableEqualOverflow
      sx={{
        // flexWrap: 'wrap',
      }}
      
    >
      {/* {movies.slice(1, pageViewOverride || numberOfMovies).map((movie, i) => ( */}

      {movies.slice(0, 9).map((movie, i) => (
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
