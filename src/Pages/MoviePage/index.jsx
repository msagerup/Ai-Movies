import React, { useCallback, useState } from 'react';
import { Affix } from 'antd';
import { useMediaQuery } from '@mui/material';
import { useDispatch } from 'react-redux';
import FeaturedMovie from './Components/MovieHero';
import Movies from './Components/Movies';
import Pagination from '../../Components/Pagination';
import { setPlayMovieTrailer } from '../../Redux/Features/movieDetails';
import { setVideoPlayerState } from '../../Redux/Features/videoPlayerState';

const MoviePage = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  const dispatch = useDispatch();

  console.log(isMobile, 'isMOBILES');

  // Is user moves away from main movie components, stop playing the movie. 
  const handleOnMouseLeave = () => {
    dispatch(setPlayMovieTrailer(''));
    dispatch(setVideoPlayerState('notPlaying'));
  };

  return (
    <div
      onMouseLeave={handleOnMouseLeave}
    >

      {/* Dont  know  if i want this */}
      {true ? (
        <FeaturedMovie />
      ) : (
        <Affix offsetTop={80}>
          <FeaturedMovie />
        </Affix>
      )}
     
      <Movies />
      <Pagination />
    </div>
  );
};

export default MoviePage;

