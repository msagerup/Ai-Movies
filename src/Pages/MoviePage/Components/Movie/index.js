import React, { useEffect, useMemo, useRef, useState } from 'react';

import { Grid, Grow, Tooltip, Rating, Box, Card, Skeleton } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useTheme } from '@emotion/react';

import useStyles from './styles.js';
import { fetchMovieDetails, setMouseHoverStatus, setMovieDetails , setPlayMovieTrailer} from '../../../../Redux/Features/movieDetails.js';
import useProgressiveImage from '../../../../hooks/UseProgressiveImage.jsx';
import { randomSingleFromArr } from '../../../../helpers/randomSingleFromArr.js';
import { useGetMovieDetailsQuery } from '../../../../Redux/Services/TMDB.js';

const Movie = ({ movie, index, shouldFetchMovieDetails, activeMovieId }) => {
  const theme = useTheme();
  // console.log('🚀 ~ file: index.js:10 ~ Movie ~ activeMovieId:', activeMovieId);
  const classes = useStyles();
  const dispatch = useDispatch();
  const timeOutRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const { data: movieDetails, isLoading, isError, refetch } = useGetMovieDetailsQuery(movie.id);

  // console.log(movieDetails, 'movieDetails');
  // WORK ON THIS
  // useEffect(() => {
  //   if (shouldFetchMovieDetails) {
  //     refetch();
  //   }
  // }, [shouldFetchMovieDetails, refetch]);

  const { currentSrc, loading } = useProgressiveImage({
    filePath: movie?.backdrop_path,
    type: 'backdrops',
    highRes: 'w780',
    lowRes: 'w300',
  });

  // console.log('🚀 ~ file: index.js:10 ~ Movie ~ movie', movie);

  const logoImage = useMemo(() => randomSingleFromArr(movieDetails?.images?.logos), [movieDetails?.images?.logos]);

  const isActiveMovie = useMemo(() => activeMovieId === movie.id, [activeMovieId, movie.id]);

  // useEffect(
  //   () => {
  //     if (!isActiveMovie) dispatch(setMouseHoverStatus(false));
  //     // if user exits before the timeout, clear the timeout. 
  //     if (timeOutRef.current) clearTimeout(timeOutRef.current);
  //   },
  //   [],
  // );

  // setMouseHoverStatus controlles the youtube player, when to play.
  const handleOnMouseEnter = () => {
    // if (!shouldFetchMovieDetails || !movie?.id || isActiveMovie) return;
    // if there is a timeout, clear it
    dispatch(setMovieDetails(movieDetails));
    setIsHovering(true);
    // if (timeOutRef.current) clearTimeout(timeOutRef.current);
    // set a timeout to dispatch the movie details
    // timeOutRef.current = setTimeout(() => {
    //   dispatch(setMouseHoverStatus(true));
    // }, 2000);
  }; 

  const handleOnMouseLeave = () => {
    setIsHovering(false);
    // if (timeOutRef.current) clearTimeout(timeOutRef.current);
    // if (isActiveMovie) return;
    // dispatch(setMouseHoverStatus(false));
  };
  const handleOnClick= () => {

    // console.log(movieDetails, 'movieDetails.id')
    dispatch(setPlayMovieTrailer(randomSingleFromArr(movieDetails?.videos?.results)));
  }

  return (
    <Card
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      onClick={handleOnClick}
      sx={{
        borderRadius: '0px',
      }}
    >
      
      {/* <Link 
        to={`/movie/${movie.id}`}
      >  */}
          
      <div
        style={{
          position: 'relative',           
        }}
      >
        <img
          alt={movie.title}
          src={
              movie
                ? currentSrc
                : 'https://picsum.photos/200/300'
            }
          style={{
            visibility: 'hidden',
            
            width: '100%',
          }}
        />
        <div
          style={{ position: 'absolute',
           
            top: 0,
            left: 0,
            // zIndex: 100,
            width: '100%',
            height: '100%',
            // opacity: isHovering ? 0.5 : 1,
            transition: 'opacity .15s linear, filter .3s linear',
            backgroundImage: `url(${currentSrc})`,
            backgroundSize: 'cover',
            overflow: 'hidden',
            backgroundBlendMode: 'luminosity',
            backgroundColor: 'rgba(0,0,0,0.15)',
            filter: isHovering ? 'contrast(80%) grayscale(10%) blur(5px)' : 'none',
          
          }}
        >
            
        </div>
        {movieDetails?.images?.logos[0]?.file_path && (
        <img
          style={{
            opacity: isHovering ? 1 : 0,
            transition: 'opacity .15s linear',
            maxWidth: '95%',
            maxHeight: '95%',
            objectFit: 'contain',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          alt={movie.title}
          src={movieDetails?.images?.logos[0]?.file_path && `https://image.tmdb.org/t/p/w300${movieDetails?.images?.logos[0]?.file_path}`}
        />
    
        )}
      </div>
      
      {/* </Link> */}
    </Card>
  );
};

export default React.memo(Movie);
