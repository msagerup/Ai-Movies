import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Typography, Card, CardContent, CardMedia, Chip, Tooltip } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DeleteIcon from '@mui/icons-material/Delete';
import { Theaters } from '@mui/icons-material';
import useStyles from './styles';
import { selectMovieDetails, selectMovieTrailer } from '../../../../Redux/Features/movieDetails';
import { randomSingleFromArr } from '../../../../helpers/randomSingleFromArr';
import UseElmDimentions from '../../../../hooks/UseElmDimentions';
import useProgressiveImage from '../../../../hooks/UseProgressiveImage';
import YouTubeContainer from '../../../../Components/YouTubeContainer';
import genreIcons from '../../../../assets/genres';
import { minToHoursAndMin } from '../../../../helpers/convert';

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
  
  const { currentSrc: logoImage } = useProgressiveImage({
    filePath: movieDetails?.images?.logos[0]?.file_path,
    type: 'logo',
    highRes: 'original',
    lowRes: 'w300',
  });

  console.log(logoImage, 'logoImage');

  const { currentSrc, loading } = useProgressiveImage({
    filePath: backdropImage,
    type: 'backdrop',
    highRes: 'original',
    lowRes: 'w300',
  });
  if (!movieDetails) return null;

  console.log(movieDetails, 'movieDetails');

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
      style={{ position: 'sticky !important', top: '30px' }}
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
                {/* DONT KNOW IF I WANT THIS, KEEP FOR NOW */}
                {/* <Box
                  sx={{
                    position: 'absolute',
                    top: '-100%',
                    left: '0',
                    width: '100%',
                    height: '100%',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      width: '100%',
                      height: '100%',
                      alignItems: 'flex-end',
                     
                    }}                  
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        padding: '10px 0',
                        width: '100%',
                      
                        backgroundColor: 'rgba(0,0,0,0.5)',
                      }}
                    >
                      <img src={logoImage} width="60%" /> 
                    </Box>
                  </Box>
                </Box> */}
                <Box>
                  <Typography variant="h2" gutterBottom>{movieDetails.title}</Typography>
                </Box>
                <Box display="flex" marginBottom={2}>
                  <Typography
                    style={{ marginRight: '10px' }}
                    variant="subtitle2"
                    align="center"
             
                  >
                    {movieDetails && minToHoursAndMin(movieDetails?.runtime)}
                  </Typography>
                  <Typography 
                    variant="subtitle2"
                    align="center"
                    
                  >
                    {movieDetails.spoken_languages?.length > 0
                      ? ` | ${movieDetails?.spoken_languages.map((lang) => lang.iso_639_1).join(', ')}` : ''} 
                  </Typography>
                </Box>
             
                <Box marginBottom={4} marginTop={4}> 
                  <Button 
                    variant="contained"
                    size="large"
                    startIcon={<PlayArrowIcon />}
                    onClick={handlePlayTrailerButton}
                  >
                    Play Trailer
                  </Button>
                </Box>
                <Box marginBottom={2}>
                  <Typography>{movieDetails.overview}</Typography>
                </Box>
                <Box marginBottom={2}>
                  <Grid
                    container
                    direction="row"
                  >
                    {movieDetails?.genres?.map((genre) => (
                      <Grid>
                        <Tooltip title={genre.name} placement="bottom">
                          <Box
                            sx={{
                              backgroundColor: '#2d2d2d',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              padding: '5px 15px',
                              margin: '0 1px',
                            }}
                          >
                            <img src={genreIcons[genre.name.toLowerCase()]} className={classes.genreImage} style={{ height: '20px', width: '100%' }} />
                          </Box>
                        </Tooltip>
                      </Grid>
                    ))}
                    
                  </Grid>
                </Box>
              </CardContent>
            </>
          ) }
          
      </Card>
    </Box>
  );
};

export default FeaturedMovie;
