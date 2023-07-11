import React, { useState } from 'react';

import { Card } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setMovieDetails } from '../../../../Redux/Features/movieDetails.js';
import useProgressiveImage from '../../../../hooks/UseProgressiveImage.jsx';
import { useGetMovieDetailsQuery } from '../../../../Redux/Services/TMDB.js';

const Movie = ({ movie }) => {
  const dispatch = useDispatch();
  const [isHovering, setIsHovering] = useState(false);
  const { data: movieDetails } = useGetMovieDetailsQuery(movie.id);
  
  const { currentSrc, loading } = useProgressiveImage({
    filePath: movie?.backdrop_path,
    type: 'backdrops',
    highRes: 'w780',
    lowRes: 'w300',
  });

  console.log(movieDetails);

  const handleOnMouseEnter = () => {
    setIsHovering(true);
  }; 

  const handleOnMouseLeave = () => {
    setIsHovering(false);
  };

  const handleOnClick = () => {
    window.scrollTo(0, 0, 'smooth');
    dispatch(setMovieDetails(movieDetails));
  };

  return (
  
    <Card
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      onClick={handleOnClick}
      sx={{
        borderRadius: '0px',
        cursor: 'pointer',
      }}
    >
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
            width: '100%',
            height: '100%',
            opacity: loading || isHovering ? 0.5 : 1,
            transition: 'opacity .3s linear, filter .3s linear',
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
    </Card>
   
  );
};

export default React.memo(Movie);
