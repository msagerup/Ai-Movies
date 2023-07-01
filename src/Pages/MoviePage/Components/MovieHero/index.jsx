import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Card, CardContent, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import useStyles from './styles';
import { selectMovieDetails, selectMovieTrailer } from '../../../../Redux/Features/movieDetails';
import { randomSingleFromArr } from '../../../../helpers/randomSingleFromArr';
import UseElmDimentions from '../../../../hooks/UseElmDimentions';
import useProgressiveImage from '../../../../hooks/UseProgressiveImage';
import YouTubeContainer from '../../../../Components/YouTubeContainer';

// TODO:
 
// 1. Add volume controll and mute button to youtube player.
// 2. Fix isses where large image continues to load even if the mouse enters a new card

// 6. Add a button to play trailer. for mobile.
// 7. ON scroll, container should follow scroll. 
// 8. navbar should temporary disaper when scrolling down.
// 9. When not playing a movie trailer, carusell should be able to flipp images

const FeaturedMovie = () => {
  const classes = useStyles();
  const movieDetails = useSelector(selectMovieDetails);
  const { key: movieTrailerIdFromRedux } = useSelector(selectMovieTrailer);
  const featuredCardContainer = useRef(null);
  const { width, height } = UseElmDimentions(featuredCardContainer);  
  const [backdropImage, setBackdropImage] = useState(`${randomSingleFromArr(movieDetails?.images?.backdrops)?.file_path}`);
  const [trailer, setTrailer] = useState(`${randomSingleFromArr(movieDetails?.videos?.results)?.key}`);
  const playerRef = useRef(null);
  const youTubeContainerRef = useRef(null);
  const timeOutRef = useRef(null);
  const [isMouseHover, setIsMouseHover] = useState(false);

  console.log(trailer, 'trailer');

  // console.log('movieTrailer', movieTrailerIdFromRedux);

  // If no youtube script load it

  useEffect(
    () => 
    // Clenup timout of when components demounts, if it's running
      () => {
        if (timeOutRef.current) clearTimeout(timeOutRef.current);
      },
    [],
  );
  
  // Use Memo here? 
  useEffect(() => {
    setBackdropImage(`${randomSingleFromArr(movieDetails?.images?.backdrops)?.file_path}`);
    setTrailer(`${randomSingleFromArr(movieDetails?.videos?.results)?.key}`);
  }, [movieDetails]);
  
  const { currentSrc, loading } = useProgressiveImage({
    filePath: backdropImage,
    type: 'backdrop',
    highRes: 'original',
    lowRes: 'w300',
  });
  if (!movieDetails) return null;

  // const handleButtonClick = () => {
  //   playerRef.current.play(); // Or playerRef.current.pause() to pause
  // };

  const handleOnMouseEnter = () => {
    // If timeout is already set, clear it
    clearTimeout(timeOutRef.current);
    
    // If the user hovers for more than 1 second, then show the trailer
    timeOutRef.current = setTimeout(() => {
      setIsMouseHover(true);
    }, 1000);
  };

  const handleOnMouseLeave = () => {
    // If timeout is already set, clear it
    clearTimeout(timeOutRef.current);
    setIsMouseHover(false);
  };

  return (
    <Box
      ref={featuredCardContainer} 
      to={`/movie/${movieDetails.id}`} 
      style={{ position: 'sticky !important', top: '30px' }}
      className={classes.featuredCardContainer}
      onMouseEnter={handleOnMouseEnter} 
      onMouseLeave={handleOnMouseLeave}
    >
      
      <Card className={classes.card} classes={{ root: classes.cardRoot }}>
        {isMouseHover || movieTrailerIdFromRedux
          ? (
            <div 
              style={{ position: 'relative',
                width: `${width}`,
                height: `${height}`,
              }}
            >
              <YouTubeContainer 
                playVideo={isMouseHover}
                width={width}
                height={height}
                trailer={trailer || movieTrailerIdFromRedux}
              />
            </div>
          )
          : (
            <> 
              {currentSrc && (
                <CardMedia
                  alt={movieDetails?.title}
                  image={currentSrc}
                  // component="img"
                  title={movieDetails.title}
                  className={classes.cardMedia}
                  style={{
                    opacity: loading ? 0.5 : 1,
                    transition: 'opacity .15s linear',
                  }}
                />
              )}
           
              <CardContent className={classes.cardContent} classes={{ root: classes.cardContentRoot }}>
                <Typography variant="h5" gutterBottom>{movieDetails.title}</Typography>
                <Typography variant="body2">{movieDetails.overview}</Typography>
              </CardContent>
            </>
          ) }
          
      </Card>
    </Box>
  );
};

export default FeaturedMovie;
