import React, { useEffect, useRef, useState } from 'react';
import { Affix } from 'antd';

import { useDispatch } from 'react-redux';
import FeaturedMovie from './Components/MovieHero';
import Movies from './Components/Movies';
import Pagination from '../../Components/Pagination';
import { setPlayMovieTrailer } from '../../Redux/Features/movieDetails';
import { setVideoPlayerState } from '../../Redux/Features/videoPlayerState';

const MoviePage = () => {
  const dispatch = useDispatch();
  const [isMouseOut, setIsMouseOut] = useState(false);
  const timerRef = useRef(null);

  // Clear the timer when the component unmounts
  useEffect(() => () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  // If the user re-enters before the delay time, clear the timer.
  const handleOnMouseEnter = () => {
    setIsMouseOut(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  // Is user moves away from main movie components, stop playing the movie. Uses a sligt delay to prevent accidental mouse out.
  const handleOnMouseLeave = () => {
    setIsMouseOut(true);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      dispatch(setPlayMovieTrailer(''));
      dispatch(setVideoPlayerState('notPlaying'));
    }, 200); // The delay in milliseconds
  };

  return (
    <div
      onMouseLeave={handleOnMouseLeave}
      onMouseEnter={handleOnMouseEnter}
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

