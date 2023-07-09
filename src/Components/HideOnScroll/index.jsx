import React from 'react';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { Slide } from '@mui/material';

import { useSelector } from 'react-redux';
import { selectVideoPlayerState } from '../../Redux/Features/videoPlayerState';

const HideOnScroll = ({ children, window }) => {
  const trigger = useScrollTrigger({ target: window ? window() : undefined });
  const { video } = useSelector(selectVideoPlayerState);

  const isVideoIsPlaying = video === 'playing';

  return (
    <Slide 
      appear={false}
      direction="down"
      in={
        isVideoIsPlaying 
          ? !isVideoIsPlaying 
          : !trigger
      }

    >
      {children}
    </Slide>
  );
};

export default HideOnScroll;
