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

import MovieLangAndRelease from '../../../../Components/MovieLangAndRelease';

import Reviews from '../../../../Components/Reviews';
import MovieDetailsTab from './Components/MovieDetailsTab';
import ContentSlider from '../../../../Components/ContentSlider';

const MovieInfo = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [value, setValue] = useState('1');
  const { data: movieDetails, isLoading, isFetching } = useGetMovieDetailsQuery(id);

  const randomBackdrop = useMemo(() => randomSingleFromArr(movieDetails?.images.backdrops)?.file_path, [movieDetails]);
  const logoImage = movieDetails?.images?.logos[0]?.file_path;

  const { currentSrc } = useProgressiveImage({
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (isFetching || isLoading || !movieDetails) return <div>Loading...</div>;

  return (
    <Box>
      <Box className={classes.backgroundImageContainer}>
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
      <Container maxWidth="xl">
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
            <Box marginBottom={1} marginTop={8}>
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
            <Box>
              <Reviews movieDetails={movieDetails} />
            </Box>
          </Grid>
          
          <Grid>
            
          </Grid>
        </Grid>
        <TabContext value={value}>
          <Box 
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <TabList onChange={handleChange} aria-label="movieTabs">
              <Tab label="Details" value="1" />
              <Tab label="Actors" value="2" />
              <Tab label="You might also like" value="3" />
            </TabList>
          </Box>
          <TabPanel
            value="1"
            sx={{ padding: '10px 0' }}
          >
            <MovieDetailsTab movie={movieDetails} />
          </TabPanel>
          <TabPanel
            value="2"
            sx={{ padding: '10px 0' }}
          >
            <ContentSlider content={movieDetails?.credits?.cast} type="actors" />
          </TabPanel>
          <TabPanel
            value="3"
            sx={{ padding: '10px 0' }}
          >
            <ContentSlider content={movieDetails?.similar?.results} type="movies" />
          </TabPanel>
        </TabContext>
      </Container>
      <Box className={classes.footerGradient}></Box>
    </Box>
  );
};

export default MovieInfo;
