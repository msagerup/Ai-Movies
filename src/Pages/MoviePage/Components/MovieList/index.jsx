import React, { useEffect } from 'react';
import { useMediaQuery } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { useDispatch, useSelector } from 'react-redux';
import Movie from '../Movie/index.js';
import { fetchMovieDetails, selectMovieDetails } from '../../../../Redux/Features/movieDetails.js';
import useStyles from './styles.js';
import { randomSingleFromArr } from '../../../../helpers/randomSingleFromArr.js';

const MovieList = ({ movies, pageViewOverride, shouldFetchMovieDetails }) => {
  const lg = useMediaQuery((theme) => theme.breakpoints.only('lg'));
  const classes = useStyles();
  const numberOfMovies = lg ? 12 : 10;
  const dispatch = useDispatch();

  const activeMovie = useSelector(selectMovieDetails);

  // useEffect(() => {
  //   if (!movies[0].id) return;

  //   // console.log(movies);
  //   const randomFirstMovieForHeroComp = randomSingleFromArr(movies);
 
  // useEffect(() => {
  //   if (!movies?.[0].id) return;
  //   const randomFirstMovieForHeroComp = randomSingleFromArr(movies);
  //   dispatch(fetchMovieDetails(randomFirstMovieForHeroComp?.id));
  // }, [movies?.[0].id]);

  // TODO:
  // 1. On hover, set state to redux in MovieDetails slice.
  // To show info in MovieHero component.
  // Should also add this feature from the Movie component. (first load)

  // console.log('movies', movies);

  return (
    <Grid
      container
      spacing={1}
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

      {movies.slice(0, 20).map((movie, i) => (
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
