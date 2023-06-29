import React, { useEffect, useMemo, useRef, useState } from 'react';

import { Grid, Grow, Tooltip, Rating, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import useStyles from './styles.js';
import { fetchMovieDetails, setMouseHoverStatus } from '../../../../Redux/Features/movieDetails.js';
import useProgressiveImage from '../../../../hooks/UseProgressiveImage.jsx';
import { randomSingleFromArr } from '../../../../helpers/randomSingleFromArr.js';

const Movie = ({ movie, index, shouldFetchMovieDetails, activeMovieId }) => {
  // console.log('🚀 ~ file: index.js:10 ~ Movie ~ activeMovieId:', activeMovieId);
  const classes = useStyles();
  const dispatch = useDispatch();
  const timeOutRef = useRef(null);
  const [movieImage, setMovieImage] = useState('');

  console.log('setMovieImage', movie);
  // console.log('movieImage', movieImage);

  // console.log('movie', movie);  
  // console.log('movie', movie);

  // console.log('randomImage', randomImage);

  // Load the image with the useProgressiveImage hook

  // console.log('MOVIE*****++', movie);

  useEffect(() => {
    if (!movie.images) return;
    setMovieImage(randomSingleFromArr(movie?.images?.backdrops));

    // console.log('🚀 ~ file: index.js:10 ~ Movie ~ imageResult', imageResult);
  }, [movie?.images]);

  const { currentSrc, loading } = useProgressiveImage({
    filePath: movie?.backdrop_path || movieImage.file_path,
    type: 'backdrops',
    highRes: 'w300',
    lowRes: 'w92',
  });

  // console.log('🚀 ~ file: index.js:10 ~ Movie ~ movie', movie);

  const isActiveMovie = useMemo(() => activeMovieId === movie.id, [activeMovieId, movie.id]);

  useEffect(
    () => {
      if (!isActiveMovie) dispatch(setMouseHoverStatus(false));
      // if user exits before the timeout, clear the timeout. 
      if (timeOutRef.current) clearTimeout(timeOutRef.current);
    },
    [],
  );

  // setMouseHoverStatus controlles the youtube player, when to play.
  // const handleOnMouseEnter = () => {
  //   if (!shouldFetchMovieDetails || !movie?.id || isActiveMovie) return;
  //   // if there is a timeout, clear it
  //   dispatch(fetchMovieDetails(movie.id));
    
  //   if (timeOutRef.current) clearTimeout(timeOutRef.current);
  //   // set a timeout to dispatch the movie details
  //   timeOutRef.current = setTimeout(() => {
  //     dispatch(setMouseHoverStatus(true));
  //   }, 2000);
  // }; 

  // const handleOnMouseLeave = () => {
  //   if (timeOutRef.current) clearTimeout(timeOutRef.current);
  //   if (isActiveMovie) return;
  //   dispatch(setMouseHoverStatus(false));
  // };

  return (
    <Link 
      to={`/movie/${movie.id}`}
      // onMouseEnter={handleOnMouseEnter}
      // onMouseLeave={handleOnMouseLeave}
    >
      <img
        alt={movie.title}
        src={
              movie
                ? currentSrc
                : 'https://picsum.photos/200/300'
            }
        style={{
          opacity: loading ? 0.5 : 1,
          transition: 'opacity .15s linear',
          width: '100%',
        }}
      />
    </Link>
  );
};

export default React.memo(Movie);
