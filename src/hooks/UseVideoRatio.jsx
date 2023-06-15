import { useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';

const UseVideoRatio = () => {
  const [playerWidth, setPlayerWidth] = useState(0);
  const [playerHeight, setPlayerHeight] = useState(0);
  const isMobile = useMediaQuery('(max-width: 385px)');

  useEffect(() => {
    const calculateWindowSize = () => {
      // const { innerWidth, innerHeight } = window;

      const innerWidth = isMobile ? window.innerWidth : Math.round(window.innerWidth * 0.8);
      const { innerHeight } = window;
      
      // Calulate the window size  , 16/9 ratio
      const height = (innerWidth * 9) / 16;
      const finalHeight = Math.min(height, innerHeight);
      setPlayerWidth(Math.round(innerWidth));
      setPlayerHeight(Math.round(finalHeight));
    };
    calculateWindowSize();
    // Update the dimensions when the window is resized
    window.addEventListener('resize', calculateWindowSize);

    return () => {
      // Clean up the event listener when the component is unmounted
      window.removeEventListener('resize', calculateWindowSize);
    };
  }, []);

  return { playerWidth, playerHeight };
};

export default UseVideoRatio;
