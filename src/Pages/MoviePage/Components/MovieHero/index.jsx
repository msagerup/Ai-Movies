import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Container, Skeleton } from '@mui/material';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import useStyles from './styles';
import { selectIsLongMouseHover, selectMovieDetails } from '../../../../Redux/Features/movieDetails';
import { randomSingleFromArr } from '../../../../helpers/randomSingleFromArr';
import YouTubePlayer from '../../../../Components/YouTubePlayer';
import UseElmDimentions from '../../../../hooks/UseElmDimentions';
import useProgressiveImage from '../../../../hooks/UseProgressiveImage';
import PlayerContent from '../../../../Components/YouTubePlayer/PlayerContent';

// TODO:
 
// 1. Add volume controll and mute button to youtube player.
// 2. Fix isses where large image continues to load even if the mouse enters a new card

// 6. Add a button to play trailer. for mobile.
// 7. ON scroll, container should follow scroll. 
// 8. navbar should temporary disaper when scrolling down.
// 9. When not playing a movie trailer, carusell should be able to flipp images

// TODO: SHIT I NEED TO BE ABLE TO HANDLE the MOVIE from props too..

const FeaturedMovie = () => {
  const classes = useStyles();
  const movieDetails = useSelector(selectMovieDetails);
  const isLongMouseHover = useSelector(selectIsLongMouseHover);
  const featuredCardContainer = useRef(null);
  const { width, height } = UseElmDimentions(featuredCardContainer);  
  const [backdropImage, setBackdropImage] = useState('');
  const [trailer, setTrailer] = useState('');
  const playerRef = useRef(null);
  const youTubeContainerRef = useRef(null);
  
  useEffect(() => {
    setBackdropImage(`${randomSingleFromArr(movieDetails?.images?.backdrops)?.file_path}`);
    setTrailer(`${randomSingleFromArr(movieDetails?.videos?.results)?.key}`);
  }, [movieDetails]);

  // console.log('movieDetails', movieDetails);filePath, lowRes, highRes
  
  const { currentSrc, loading } = useProgressiveImage({
    filePath: backdropImage,
    type: 'backdrop',
    highRes: 'original',
    lowRes: 'w300',
  });
  if (!movieDetails) return null;

  const handleButtonClick = () => {
    playerRef.current.play(); // Or playerRef.current.pause() to pause
  };

  return (
    <div style={{ height: '100%' }}>
      <Box
        ref={featuredCardContainer} 
        to={`/movie/${movieDetails.id}`} 
        style={{ position: 'sticky !important', top: '30px' }}
        className={classes.featuredCardContainer}
        
      >
        <Card className={classes.card} classes={{ root: classes.cardRoot }}>
          {isLongMouseHover && trailer && !loading

            ? (
              <div 
                style={{ position: 'relative', width: `${width}`, height: `${height}` }}
              >
              
                <YouTubePlayer
                  ref={playerRef}
                  videoId={trailer} 
                  playerWidth={width}
                  playerHeight={height}
                  playerContentComp={PlayerContent}
                />
                {/* <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                  <PlayerContent player={playerRef.current} width={width} height={height} />
                </div> */}
                
              </div>
            )
            : (
              <> 
                {currentSrc && (
                <CardMedia
                  alt={movieDetails?.title}
                  image={currentSrc}
                  component="img"
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
   
    </div>
  );
};

export default FeaturedMovie;
