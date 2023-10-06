import InfoIcon from '@mui/icons-material/Info';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import StaggerHeroImage from '../../../../Animations/StaggerHeroImage';
import GenreRow from '../../../../Components/GenreRow';
import MovieLangAndRelease from '../../../../Components/MovieLangAndRelease';
import YouTubeContainer from '../../../../Components/YouTubeContainer';
import {
  selectMovieDetails,
  selectMovieTrailer,
} from '../../../../Redux/Features/movieDetails';
import { randomSingleFromArr } from '../../../../helpers/randomSingleFromArr';
import UseElmDimentions from '../../../../hooks/UseElmDimentions';
import useProgressiveImage from '../../../../hooks/UseProgressiveImage';
import useStyles from './styles';

const FeaturedMovie = () => {
  const classes = useStyles();
  const movieDetails = useSelector(selectMovieDetails);
  const movieTrailerFromRedux = useSelector(selectMovieTrailer);
  const movieTrailerIdFromRedux = movieTrailerFromRedux?.key;
  const featuredCardContainer = useRef(null);
  const { width, height } = UseElmDimentions(featuredCardContainer);
  const [backdropImage, setBackdropImage] = useState(
    `${randomSingleFromArr(movieDetails?.images?.backdrops)?.file_path}`,
  );
  const [trailer, setTrailer] = useState(
    `${randomSingleFromArr(movieDetails?.videos?.results)?.key}`,
  );
  const timeOutRef = useRef(null);
  const [triggerPlayTrailer, setTriggerPlayTrailer] = useState(false);

  const isMobile = useMediaQuery('(max-width: 900px)');

  const backdrops = movieDetails?.images?.backdrops;

  useEffect(
    () => () => {
      if (timeOutRef.current) clearTimeout(timeOutRef.current);
    },
    [],
  );

  useEffect(() => {
    setBackdropImage(
      `${randomSingleFromArr(movieDetails?.images?.backdrops)?.file_path}`,
    );
    setTrailer(`${randomSingleFromArr(movieDetails?.videos?.results)?.key}`);
    setTriggerPlayTrailer(false);
  }, [movieDetails.id]);

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
        <StaggerHeroImage
          backdropImage={backdropImage}
          height={height}
          width={width}
          setBackdropImage={setBackdropImage}
          backdrops={backdrops}
        />
        {triggerPlayTrailer || movieTrailerIdFromRedux ? (
          <div
            style={{
              position: 'relative',
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
        ) : (
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
                <Box
                  style={{
                    zIndex: 200,
                  }}
                >
                  <Box marginBottom={1}>
                    <Typography
                      className={classes.movieTitle}
                      variant={isMobile ? 'h3' : 'h2'}
                    >
                      {movieDetails.title}
                    </Typography>
                  </Box>

                  <Box marginBottom={1}>
                    <MovieLangAndRelease
                      variant="body2"
                      runtime={movieDetails?.runtime}
                      languages={movieDetails.spoken_languages}
                    />
                  </Box>
                  <Box marginBottom={isMobile ? 2 : 4}>
                    <GenreRow genres={movieDetails.genres} />
                  </Box>
                  <Box
                    marginBottom={1}
                    sx={{
                      width: isMobile ? '300px' : '600px',
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: isMobile ? 3 : 6,
                      overflow: 'hidden',
                    }}
                  >
                    {movieDetails.overview ? (
                      <Typography variant="body2" color="textSecondary">
                        {movieDetails.overview}
                      </Typography>
                    ) : (
                      <Typography
                        color="textSecondary"
                        variant={isMobile ? 'h5' : 'h4'}
                      >
                        {movieDetails.tagline}
                      </Typography>
                    )}
                  </Box>
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    marginTop={isMobile ? 2 : 4}
                    gap={2}
                  >
                    <Grid>
                      <Button
                        variant="contained"
                        size="medium"
                        startIcon={<PlayArrowIcon />}
                        onClick={handlePlayTrailerButton}
                      >
                        Play Trailer
                      </Button>
                    </Grid>
                    <Grid>
                      <Tooltip
                        title={`More info about ${movieDetails.title}`}
                        placement="bottom"
                      >
                        <Button
                          variant="outlined"
                          size="medium"
                          component={Link}
                          to={`/movie/${movieDetails.id}`}
                          startIcon={<InfoIcon />}
                          onClick={handlePlayTrailerButton}
                        >
                          More info
                        </Button>
                      </Tooltip>
                    </Grid>
                    <Grid></Grid>
                  </Grid>
                </Box>
              </Box>
            </CardContent>
          </>
        )}
      </Card>
    </Box>
  );
};

export default FeaturedMovie;
