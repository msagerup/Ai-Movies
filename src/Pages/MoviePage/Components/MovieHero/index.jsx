import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Container, Skeleton } from '@mui/material';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import useStyles from './styles';
import { selectIsLongMouseHover, selectMovieDetails } from '../../../../Redux/Features/movieDetails';
import { randomSingleFromArr } from '../../../../helpers/randomSingleFromArr';
import YouTubePlayer from '../../../../Components/YouTubePlayer';
import UseElmDimentions from '../../../../hooks/UseElmDimentions';

const FeaturedMovie = ({ movie, override }) => {
  // console.log('🚀 ~ file: index.jsx:10 ~ FeaturedMovie ~ movie:', movie);
  const classes = useStyles();
  const movieDetails = useSelector(selectMovieDetails);
  const baseUrl = 'https://image.tmdb.org/t/p/original/';
  const isLongMouseHover = useSelector(selectIsLongMouseHover);
  const featuredCardContainer = useRef(null);
  const { width, height } = UseElmDimentions(featuredCardContainer);
  
  if (!movieDetails) return null;
  // console.log(movie);
  // TODO:
  // 1  Get movie info from redux store. (DONE)
  // 2. Generate random number to get random backdrop image. (DONE)
  // 3. On hover? show movie trailer?  (DONE)
  // 4. When playing a  movie trailer, animate container to 16/ratio (half done..)
  // 5. When not playing a movie trailer, animate container back to orginal size.
  // 6. Add a button to play trailer. for mobile.
  // 7. ON scroll, container should follow scroll. 
  // 8. navbar should temporary disaper when scrolling down.
  // 9. When not playing a movie trailer, carusell should be able to flipp images

  // TODO: SHIT I NEED TO BE ABLE TO HANDLE the MOVIE from props too..

  return (
    <div style={{ height: '100%' }}>
      <Box
        component={Link} 
        ref={featuredCardContainer} 
        to={`/movie/${movie.id}`} 
        style={{ position: 'sticky !important', top: '30px' }}
        className={classes.featuredCardContainer}
        
      >
        <Card className={classes.card} classes={{ root: classes.cardRoot }}>
          {isLongMouseHover 
            ? (
              <YouTubePlayer
                videoId={movieDetails.videos.results[0].key} 
                playerHeight={height}
                playerWidth={width}
              />
            )
            : (
              <> <CardMedia
                alt={movieDetails?.title || movie.title}
                image={movieDetails?.images ? `${baseUrl}${randomSingleFromArr(movieDetails.images.backdrops)?.file_path}` : `${baseUrl}${movie.backdrop_path}`}
                title={movieDetails.title}
                className={classes.cardMedia}
              /> 
           
                <CardContent className={classes.cardContent} classes={{ root: classes.cardContentRoot }}>
                  <Typography variant="h5" gutterBottom>{movieDetails.title}</Typography>
                  <Typography variant="body2">{movieDetails.overview}</Typography>
                </CardContent>
              </>
            ) }
          
        </Card>
      </Box>
      {override && (
      <Container className={classes.override}>
        <div style={{ position: 'relative' }}>
          {override && override}
        </div>
      </Container>
      )}
      
    </div>
  );
};

export default FeaturedMovie;
