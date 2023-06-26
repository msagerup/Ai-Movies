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

const FeaturedMovie = ({ override }) => {
  // console.log('🚀 ~ file: index.jsx:10 ~ FeaturedMovie ~ movie:', movie);
  const classes = useStyles();
  const movieDetails = useSelector(selectMovieDetails);
  const isLongMouseHover = useSelector(selectIsLongMouseHover);
  const featuredCardContainer = useRef(null);
  const { width, height } = UseElmDimentions(featuredCardContainer);

  // console.log('🚀 ~ file: index.jsx:24 ~ FeaturedMovie ~ currentSrc:', { currentSrc });
  
  const [backdropImage, setBackdropImage] = useState('');
  const [trailer, setTrailer] = useState('');
  // console.log('🚀 ~ file: index.jsx:25 ~ FeaturedMovie ~ trailer:', trailer);
  
  useEffect(() => {
    setBackdropImage(`${randomSingleFromArr(movieDetails?.images?.backdrops)?.file_path}`);
    setTrailer(`${randomSingleFromArr(movieDetails?.videos?.results)?.key}`);
  }, [movieDetails]);
  
  const { currentSrc, loading } = useProgressiveImage(backdropImage, 'backdrop');
  if (!movieDetails) return null;
  // console.log(movie);
  // TODO:
  // 1  Get movie info from redux store. (DONE)
  // 2. Generate random number to get random backdrop image. (DONE)
  // 3. On hover? show movie trailer?  (DONE)

  // 6. Add a button to play trailer. for mobile.
  // 7. ON scroll, container should follow scroll. 
  // 8. navbar should temporary disaper when scrolling down.
  // 9. When not playing a movie trailer, carusell should be able to flipp images

  // TODO: SHIT I NEED TO BE ABLE TO HANDLE the MOVIE from props too..
  console.log('HOW MANY TIME IS THIS LOADING?');

  return (
    <div style={{ height: '100%' }}>
      <Box
        component={Link} 
        ref={featuredCardContainer} 
        to={`/movie/${movieDetails.id}`} 
        style={{ position: 'sticky !important', top: '30px' }}
        className={classes.featuredCardContainer}
        
      >
        <Card className={classes.card} classes={{ root: classes.cardRoot }}>
          {isLongMouseHover && trailer && !loading
            ? (
              <YouTubePlayer
                videoId={trailer} 
                playerHeight={height}
                playerWidth={width}
              />
            )
            : (
              <> 
                
                <CardMedia
                  alt={movieDetails?.title}
                  image={currentSrc}
                  title={movieDetails.title}
                  className={classes.cardMedia}
                  style={{
                    opacity: loading ? 0.5 : 1,
                    transition: 'opacity .15s linear',
                  }}
                />
           
                <CardContent className={classes.cardContent} classes={{ root: classes.cardContentRoot }}>
                  <Typography variant="h5" gutterBottom>{movieDetails.title}</Typography>
                  <Typography variant="body2">{movieDetails.overview}</Typography>
                </CardContent>
              </>
            ) }
          
        </Card>
      </Box>
      { override && (
      <Container className={classes.override}>
        <div style={{ position: 'relative' }}>
          {override && override}
        </div>
      </Container>
      )}
      
    </div>
  );
};

export default React.memo(FeaturedMovie);
