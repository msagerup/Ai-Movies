import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Typography, Card, CardContent, CardMedia, Tooltip, IconButton, useMediaQuery } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InfoIcon from '@mui/icons-material/Info';
import useStyles from './styles';
import { selectMovieDetails, selectMovieTrailer } from '../../../../Redux/Features/movieDetails';
import { randomSingleFromArr } from '../../../../helpers/randomSingleFromArr';
import UseElmDimentions from '../../../../hooks/UseElmDimentions';
import useProgressiveImage from '../../../../hooks/UseProgressiveImage';
import YouTubeContainer from '../../../../Components/YouTubeContainer';
import UseAddToFavorite from '../../../../hooks/UseAddToFavorite';
import GenreRow from '../../../../Components/GenreRow';
import MovieLangAndRelease from '../../../../Components/MovieLangAndRelease';
import { userSelector } from '../../../../Redux/Features/auth';
// TODO:
 
// 1. Add volume controll and mute button to youtube player.
// 2. Fix isses where large image continues to load even if the mouse enters a new card
// 3. Move css rules in styles.js 
// 6. Add a button to play trailer. for mobile.
// 7. ON scroll, container should follow scroll. 
// 8. navbar should temporary disaper when scrolling down.
// 9. When not playing a movie trailer, carusell should be able to flipp images

const FeaturedMovie = () => {
  const { user } = useSelector(userSelector);
  const classes = useStyles();
  const movieDetails = useSelector(selectMovieDetails);
  const movieTrailerFromRedux = useSelector(selectMovieTrailer);
  const movieTrailerIdFromRedux = movieTrailerFromRedux?.key;
  const featuredCardContainer = useRef(null);
  const { width, height } = UseElmDimentions(featuredCardContainer);  
  const [backdropImage, setBackdropImage] = useState(`${randomSingleFromArr(movieDetails?.images?.backdrops)?.file_path}`);
  const [trailer, setTrailer] = useState(`${randomSingleFromArr(movieDetails?.videos?.results)?.key}`);
  const playerRef = useRef(null);
  const youTubeContainerRef = useRef(null);
  const timeOutRef = useRef(null);
  const [triggerPlayTrailer, setTriggerPlayTrailer] = useState(false);

  const isMobile = useMediaQuery('(max-width: 900px)');

  const { addToFavorites, isMovieFavorited } = UseAddToFavorite({ id: movieDetails?.id });

  useEffect(
    () => 
    // Clenup timout of when components demounts, if it's running
      () => {
        if (timeOutRef.current) clearTimeout(timeOutRef.current);
      },
    [],
  );

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

  const handleOnMouseLeave = () => {
    // If timeout is already set, clear it
    clearTimeout(timeOutRef.current);
    setTriggerPlayTrailer(false);
  };

  const handlePlayTrailerButton = () => {
    setTriggerPlayTrailer(true);
  };

  return (
    <Box
      ref={featuredCardContainer} 
      to={`/movie/${movieDetails.id}`} 
      className={classes.featuredCardContainer}
      onMouseLeave={handleOnMouseLeave}
    >
      
      <Card className={classes.card} classes={{ root: classes.cardRoot }}>
        {triggerPlayTrailer || movieTrailerIdFromRedux
          ? (
            <div 
              style={{ position: 'relative',
                width: `${width}`,
                height: `${height}`,
              }}
            >
              <YouTubeContainer 
                playVideo={triggerPlayTrailer}
                width={width}
                height={height}
                trailer={triggerPlayTrailer ? trailer : movieTrailerIdFromRedux}
              />
            </div>
          )
          : (
            <> 
              {currentSrc && (
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
              )}
            
              <CardContent 
                className={classes.cardContent} 
                classes={{ root: classes.cardContentRoot }}
              > 
                <Box 
                  sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'flex-end',
                  }}
                >
                  <Box>
                    <Box>
                      <Typography
                        className={classes.movieTitle} 
                        variant={isMobile ? 'h3' : 'h2'} 
                        gutterBottom
                      >{movieDetails.title}
                      </Typography>
                    </Box>
                    <MovieLangAndRelease 
                      variant="body2"
                      runtime={movieDetails?.runtime} 
                      languages={movieDetails.spoken_languages} 
                    />
             
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      marginBottom={4} 
                      marginTop={4}
                      gap={2}
                    > 
                      <Grid>
                        <Button 
                          variant="contained"
                          size="large"
                          startIcon={<PlayArrowIcon />}
                          onClick={handlePlayTrailerButton}
                        >
                          Play Trailer
                        </Button>
                      </Grid>
                      <Grid>
                        <Tooltip title={`More info about ${movieDetails.title}`} placement="bottom">
                          <Button 
                            variant="outlined"
                            size="large"
                            component={Link}
                            to={`/movie/${movieDetails.id}`}
                            startIcon={<InfoIcon />}
                            onClick={handlePlayTrailerButton}
                          >
                            More info
                          </Button>
                        
                        </Tooltip>
                      </Grid>
                      <Grid>

                        {isMovieFavorited ? (
                          <Tooltip title="Remove from favorites" placement="bottom">
                            <IconButton
                              onClick={() => addToFavorites(movieDetails.id)}
                              size="large"
                            >
                              <FavoriteIcon fontSize="large" />
                            </IconButton>
                          </Tooltip>
                        ) : (
                          <Tooltip title="Add to favorites" placement="bottom">
                            <IconButton
                              disabled={!user?.id}
                              onClick={() => addToFavorites(movieDetails.id)}
                              size="large"
                            >
                              <ControlPointIcon fontSize="large" />
                            </IconButton>
                          </Tooltip>
                        ) }
                  
                      </Grid>
                     
                    </Grid>
                    <Box
                      marginBottom={2}
                  // TODO:  Implement this 
                  // https://css-tricks.com/line-clampin/
                      sx={{
                        width: '300px',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 5,
                        overflow: 'hidden',
                      }}
                    >
                      <Typography>{movieDetails.overview}</Typography>
                    </Box>
                    <Box marginBottom={2}>
                      <GenreRow genres={movieDetails.genres} />
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </>
          ) }
          
      </Card>
    </Box>
  );
};

export default FeaturedMovie;
