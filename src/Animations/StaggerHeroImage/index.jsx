import React, { useLayoutEffect, useRef, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import anime from 'animejs';
import { getDarkThemeColors } from '../../helpers/darkThemeColors';
import { randomSingleFromArr } from '../../helpers/randomSingleFromArr';
import useStyles from './styles';

const StaggerHeroImage = ({ 
  backdropImage,
  height,
  width,
  backdrops,
  setBackdropImage,
  nextImage,
  
}) => {
  const classes = useStyles();
  const [columns, setColumns] = useState(null);
  const [rows, setRows] = useState(null);
  const darkColors = getDarkThemeColors(8);
  const wrapperRef = useRef();

  console.log(nextImage);
  // console.log(backdrops);

  // console.log(`https://image.tmdb.org/t/p/original${backdropImage}`);
  // https://image.tmdb.org/t/p/original${backdropImage}
  useLayoutEffect(() => {
    setColumns(Math.floor(width / 50));
    setRows(Math.floor(height / 50));
  }, [nextImage]); 

  const handleOnClick = (e, index) => {
    const tiles = Array.from(document.querySelectorAll('#tiles > *'));
  
    anime({
      targets: tiles,
      backgroundColor: randomSingleFromArr(darkColors),
      scale: [
        { value: 1, easing: 'easeInOutQuad', duration: 300 },
        { value: 0, easing: 'easeOutSine', duration: 100 },
      ],
      delay: anime.stagger(25, {
        grid: [columns, rows],
        from: index,
      }),
      changeBegin: () => {
        setTimeout(() => {
          // Sets the backdrop image with the preloaded image
          setBackdropImage(nextImage);
        }, 300);
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
  // </div>
    
  ); 
};

export default StaggerHeroImage;
