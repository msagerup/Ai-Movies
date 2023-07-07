import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Tab, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import TabContext from '@mui/lab/TabContext';
import { TabList, TabPanel } from '@mui/lab';
import { useGetMovieDetailsQuery } from '../../../../Redux/Services/TMDB';
import useStyles from './styles';
import useProgressiveImage from '../../../../hooks/UseProgressiveImage';
import { randomSingleFromArr } from '../../../../helpers/randomSingleFromArr';
import GenreRow from '../../../../Components/GenreRow';
import Movie from '../Movie';
import MovieLangAndRelease from '../../../../Components/MovieLangAndRelease';
import VoteAvarage from '../../../../Components/VoteAvarage';
import MovieSlider from '../../../../Components/MovieSlider';

const MovieInfo = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [value, setValue] = useState('1');
  const { data: movieDetails, isLoading, isFetching } = useGetMovieDetailsQuery(id);

  const randomBackdrop = useMemo(() => randomSingleFromArr(movieDetails?.images.backdrops)?.file_path, [movieDetails]);

  //   const logoImage = movieDetails?.images?.logos?.find((logo) => logo.iso_639_1 === 'en')?.file_path;
  const logoImage = movieDetails?.images?.logos[0]?.file_path;
  console.log();

  const { currentSrc, loading } = useProgressiveImage({
    filePath: randomBackdrop,
    type: 'backdrop',
    highRes: 'w1280',
    lowRes: 'w780',
  });
 
  const { currentSrc: logo, loading: logoLoading } = useProgressiveImage({
    filePath: logoImage,
    type: 'backdrop',
    highRes: 'w1280',
    lowRes: 'w780',
  });

  console.log('movieDetails', movieDetails);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //   console.log(movieDetails.genres, '**MOVIEDET*');
  if (isFetching || isLoading || !movieDetails) return <div>Loading...</div>;

  return (
    <Box>
     
      <Box className={classes.backgroundImageContainer}>
        {/* backdrop image */}
        <img 
          className={classes.backgroundImage}
          src={currentSrc}
          alt="Movie backdrop"
          style={{
            opacity: logoLoading ? 0.5 : 1,
            transition: 'opacity .15s linear',
          }}
        />
        <div className={classes.backdropFilter}></div>
      </Box>
      <Container>
        <Grid
          container
          direction="column"
          spacing={2}
        >
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
          >
            <Box marginBottom={4} marginTop={8}>
              {logo ? (
                <img
                  className={classes.logo}
                  src={logo}
                />
              ) : (
                <Typography
                  variant="h3" 
                  className={classes.logo} 
                  style={{ textTransform: 'uppercase' }}
                >{movieDetails.title}
                </Typography>
              )}
            </Box>
            <Box marginBottom={4} marginTop={8}>
              {/* <VoteAvarage voteAvarage={movieDetails.vote_average} /> */}
            </Box>
          </Grid>
          <Grid>
            <Typography
              variant="h5"
              className={classes.tagline}
            >
              {movieDetails.tagline}
            </Typography>
          </Grid>
          <Grid>
            <Typography variant="body1" className={classes.overview}>
              {movieDetails.overview}
            </Typography>
          </Grid>
          <Grid>
            <Typography>
              reviews
            </Typography>
          </Grid>
          <Grid
            container
            direction="row"
            alignItems="center"
            
          >
            <Grid>
              <GenreRow genres={movieDetails.genres} />
            </Grid>
            <Grid>
              <MovieLangAndRelease 
                runtime={movieDetails.runtime} 
                languages={movieDetails.spoken_languages} 
                variant="caption"
              />
            </Grid>
          </Grid>
          
          <Grid>
            
          </Grid>
        </Grid>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="You might also like" value="1" />
              <Tab label="Actors" value="2" />
              <Tab label="Details" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1"><MovieSlider /></TabPanel>
          <TabPanel value="2">Actor comp..</TabPanel>
          <TabPanel value="3">Movie details..</TabPanel>
        </TabContext>
      </Container>
    </Box>
  );
};

export default MovieInfo;
