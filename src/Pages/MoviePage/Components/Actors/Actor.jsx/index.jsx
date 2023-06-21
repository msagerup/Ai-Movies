import React from 'react';

import { Box, Button, Grid, Typography, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import useStyles from './styles';
import MovieList from '../../MovieList';

const ActorInfo = ({ data }) => {
  const classes = useStyles();
  const lg = useMediaQuery((theme) => theme.breakpoints.only('lg'));

  return (
    <Grid
      container
      className={classes.container}
      alignItems="center"
      
    >
      <Grid
        item
        lg={4}
        sm={12}
        style={{
          display: 'flex',
          marginBottom: '30px',

        }}
      >
        <img
          className={classes.poster}
          src={`https://image.tmdb.org/t/p/w500${data?.profile_path}`}
          alt={data?.title}
        /> 
      </Grid>
      <Grid item container direction="column" lg={7}>
        <Grid item>
          <Typography variant="h3" gutterBottom textAlign={lg ? 'inherit' : 'center'}>{data?.name}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h5" gutterBottom>Biography</Typography>
        </Grid>
        <Grid item style={{ marginBottom: '20px' }}>
          <Typography variant="body2" gutterBottom>
            {data?.biography}
          </Typography>
        </Grid>
        <Grid item container className={classes.container}>
          <Box>
            <Button
              variant="contained"
              target="_blank"
              rel="noopner noreferrer"
              href={`https://www.imdb.com/name/${data?.imdb_id}`}
            >IMDB
            </Button>
          </Box>
          <Box>
            <Button 
              startIcon={(
                <ArrowBack />
                )} 
            >
              <Typography 
                style={{ textDecoration: 'none' }} 
                component={Link}
                to="/" 
                color="inherit"
                variant="subtitle2"
              >
                Back
              </Typography>
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box marginTop="5rem" width="100%">
        <Typography variant="h4" gutterBottom align="center">
          Movies where {data?.name} was an actor
        </Typography>
        <MovieList movies={data?.movie_credits.cast} pageViewOverride={12} />
      </Box>
      {data?.movie_credits.crew.length > 0 && (
      <Box marginTop="5rem" width="100%">
        <Typography variant="h4" gutterBottom align="center">
          Movies where {data?.name} was a crew member / director / producer
        </Typography>
        <MovieList movies={data?.movie_credits.crew} pageViewOverride={data?.movie_credits.crew.length < 12 ? data?.movie_credits.crew.length : 12} />
      </Box>
      )}
    </Grid>

  );
};

export default ActorInfo;
