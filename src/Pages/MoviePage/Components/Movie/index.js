import React, { useEffect, useRef } from 'react';

import { Grid, Grow, Tooltip, Rating, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useStyles from './styles.js';
import { setMouseHoverStatus, setMovieDetails } from '../../../../Redux/Features/movieDetails.js';
import { useGetMovieDetailsQuery } from '../../../../Redux/Services/TMDB.js';

const Movie = ({ movie, index }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { data, error, isFetching } = useGetMovieDetailsQuery(movie.id);
  const timeOutRef = useRef(null);

  // if user exits before the timeout, clear the timeout. 
  useEffect(() => () => {
    if (timeOutRef.current) clearTimeout(timeOutRef.current);
  }, []);

  const handleOnMouseEnter = () => {
    if (error || isFetching || !data) return;
    // if there is a timeout, clear it
    
    dispatch(setMovieDetails(data));
    
    if (timeOutRef.current) clearTimeout(timeOutRef.current);
    // set a timeout to dispatch the movie details
    timeOutRef.current = setTimeout(() => {
      dispatch(setMouseHoverStatus(true));
    }, 3000);
  };

  const handleOnMouseLeave = () => {
    if (timeOutRef.current) clearTimeout(timeOutRef.current);
    dispatch(setMouseHoverStatus(false));
  };
  
  return (
    <Grid item className={classes.movie}>
      <Grow in key={index} timeout={(index + 1) * 100}>
        <Link 
          className={classes.links}
          to={`/movie/${movie.id}`}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
        >
          <img
            alt={movie.title}
            className={classes.image}
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : 'https://picsum.photos/200/300'
            } 
          />
          <Tooltip disableTouchListener title={`${movie.vote_average} / 10`}>
            <Box marginTop={1}>
              <Rating readOnly value={movie.vote_average / 2} precision={0.1} />
            </Box>
          </Tooltip>
        </Link>
      </Grow>
    </Grid>
  );
};

export default Movie;
