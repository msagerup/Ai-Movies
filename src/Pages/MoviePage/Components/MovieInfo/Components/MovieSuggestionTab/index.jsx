import { Box, Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useProgressiveImage from '../../../../../../hooks/UseProgressiveImage';
import useStyles from './styles';

const MovieSuggestion = ({ movie }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const { currentSrc, loading } = useProgressiveImage({
    filePath: movie.poster_path,
    type: 'poster',
    highRes: 'w780',
    lowRes: 'w342', 
  });

  const handleFetchMovieDetails = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <Box>
      <Box 
        className={classes.container}
        sx={{
          backgroundImage: `url(${currentSrc})`,
          backgroundSize: 'cover',
          opacity: loading ? 0.5 : 1,
          transition: 'opacity .15s linear',
          filter: 'contrast(80%) grayscale(5%) ',
          
        }}
      >
        <img
          src={
            currentSrc || 'https://picsum.photos/200/300'
            }
          style={{
            visibility: 'hidden',
            height: '100%',
            width: '100%',
          }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        <Button onClick={handleFetchMovieDetails}>more info</Button>
      </Box>
    </Box>
  );
};

export default MovieSuggestion;
