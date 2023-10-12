import { useTheme } from '@emotion/react';
import React, { useLayoutEffect, useRef, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useMediaQuery } from '@mui/material';
import anime from 'animejs';
import { getTileColors } from '../../helpers/getTileColors';
import { randomSingleFromArr } from '../../helpers/randomSingleFromArr';
import useStyles from './styles';

const StaggerHeroImage = ({ backdropImage, height, width, backdrops, setBackdropImage }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [columns, setColumns] = useState(null);
  const [rows, setRows] = useState(null);
  const tileColors = getTileColors(theme);
  const wrapperRef = useRef();
  const isMobile = useMediaQuery((themeMode) => themeMode.breakpoints.down('md'));

  useLayoutEffect(() => {
    if (isMobile) {
      setColumns(Math.floor(width / 40));
      setRows(Math.floor(height / 40));
    }
    // Desktop
    setColumns(Math.floor(width / 50));
    setRows(Math.floor(height / 50));
  }, [backdropImage]); 

  const handleOnClick = (e, index) => {
    const tiles = Array.from(document.querySelectorAll('#tiles > *'));
  
    anime({
      targets: tiles,
      backgroundColor: randomSingleFromArr(tileColors),
      scale: [
        { value: 1, easing: 'easeInOutQuad', duration: 280 },
        { value: 0, easing: 'easeOutSine', duration: 90 },
      ],
      delay: anime.stagger(25, {
        grid: [columns, rows],
        from: index,
      }),
      changeBegin: () => {
        setTimeout(() => {
          setBackdropImage(randomSingleFromArr(backdrops).file_path);
        }, 280);
      },
      complete: () => {
        tiles.forEach((tile) => {
          tile.style.backgroundColor = '';
          tile.style.transform = '';
        });
      },
    });
  };

  return (
    <div 
      ref={wrapperRef}
      id="tiles"
      className={classes.tilesWrapper}
      style={{ '--columns': columns, '--rows': rows }}
    >
      {Array.from(Array(columns * rows)).map((tile, index) => (
        <div 
          key={index}
          className={classes.tile}
          onClick={(e) => handleOnClick(e, index)}
        />
      ))}
    </div>
  ); 
};

export default StaggerHeroImage;
