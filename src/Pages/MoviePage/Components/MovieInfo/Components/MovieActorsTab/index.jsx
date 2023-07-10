import { Box, Card, Typography } from '@mui/material';
import React from 'react';

import useProgressiveImage from '../../../../../../hooks/UseProgressiveImage';
import useStyles from './styles';

const MovieActorsTab = ({ actor }) => {
  const classes = useStyles();
  console.log('MovieActorsTab', actor);

  const { currentSrc, loading } = useProgressiveImage({
    filePath: actor.profile_path,
    type: 'profile',
    highRes: 'original',
    lowRes: 'h632',
  });

  if (!currentSrc) return null;
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
        
        <Box className={classes.content}>
          <Typography textAlign="center">
            {actor.name}
          </Typography>
          <Typography textAlign="center">
            {actor.character}
          </Typography>
        </Box>
      </Box>
      
    </Box>
  );
};

export default MovieActorsTab;
