import React, { useState, useLayoutEffect, useRef } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import anime from 'animejs';
import { randomSingleFromArr } from '../../helpers/randomSingleFromArr';
import useStyles from './styles';
import { getImageColors } from '../../helpers/getColorsFromImage';
import { getDarkThemeColors } from '../../helpers/darkThemeColors';

const StaggerHeroImage = ({ backdropImage, height, width }) => {
  const classes = useStyles();
  const [columns, setColumns] = useState(null);
  const [rows, setRows] = useState(null);
  const darkColors = getDarkThemeColors(8);
  const tile = useRef();

  useLayoutEffect(() => {
    setColumns(Math.floor(width / 50));
    setRows(Math.floor(height / 50));
  }, [backdropImage]); 

  const handleOnClick = (e, index) => {
    const tiles = Array.from(document.querySelectorAll('#tiles > *'));
    console.log(tiles);

    // Get the element at the clicked position

    console.log(e.currentTarget);
    anime({
      targets: tiles,
      backgroundColor: randomSingleFromArr(darkColors),

      delay: anime.stagger(50, {
        grid: [columns, rows],
        from: index,
      }),
     
    });
  };

  return (
    <div 
      id="tiles"
      className={classes.tilesWrapper}
      style={{ '--columns': columns, '--rows': rows }}
    >
      {Array.from(Array(columns * rows)).map((tile, index) => (
        <div 
          ref={tile}
          key={index}
          className={classes.tile}
          onClick={(e) => handleOnClick(e, index)}
        />
      ))}
    </div>
    
  ); 
};

export default StaggerHeroImage;
