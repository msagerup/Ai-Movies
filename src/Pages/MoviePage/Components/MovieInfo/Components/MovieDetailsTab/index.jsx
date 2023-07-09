import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';

import { Box, Typography } from '@mui/material';
import { minToHoursAndMin } from '../../../../../../helpers/convert';

// Grid version 2
const MovieDetailsTab = ({ movie }) => (
  <>
    <Box>
      <Typography 
        variant="h5"
        gutterBottom
      >
        {movie.title}
      </Typography>
    </Box>
    <Grid
      container
      spacing={4}
      columns={{
        md: 12,
        xs: 1,
      }}
    >
      <Grid
        xs={1}
        md={12}
        lg={7}
      >
        
        <Box>
          <Typography 
            variant="h6" 
            gutterBottom
            sx={{
              fontWeight: '200',
            }}
          >
            {movie.tagline}
          </Typography>
          <Typography variant="subtitle1">
            {movie.overview}
          </Typography>
        </Box>
     
      </Grid>

      <Grid
        xs={1}
        md={12}
        lg={5}
      >
        <Grid 
          container
          columns={{
            xs: 2,

          }}
        >
          <Grid 
            xs={1}
          >
            <Box marginBottom={1}>
              <Typography variant="body1" color="secondary.dark">
                Duration:
              </Typography>
              <Typography variant="subtitle2">
                {movie?.runtime && minToHoursAndMin(movie.runtime)}
              </Typography>
            </Box>
            <Box marginBottom={1}>
              <Typography variant="body1" color="secondary.dark">
                Release year:
              </Typography>
              <Typography variant="subtitle2">
                {movie?.release_date && movie.release_date.slice(0, 4)}
              </Typography>
            </Box>
            <Box marginBottom={1}>
              <Typography variant="body1" color="secondary.dark">
                Rating:
              </Typography>
              <Typography variant="subtitle2">
                {movie?.vote_average && movie.vote_average.toFixed(1)} / 10 (from {movie?.vote_count && movie.vote_count} votes)
              </Typography>
            </Box>
            <Box marginBottom={1}>
              <Typography variant="body1" color="secondary.dark">
                Genre:
              </Typography>
              <Typography variant="subtitle2">
                {movie?.genres && movie.genres.map((genre) => genre.name).join(', ')}
              </Typography>
            </Box>
            <Box marginBottom={1}>
              <Typography variant="body1" color="secondary.dark">
                Spoken languages:
              </Typography>
              <Typography variant="subtitle2">
                {movie?.spoken_languages && movie.spoken_languages.map((lang) => lang.name).join(', ')}
              </Typography>
            </Box>
          </Grid>
          <Grid
            xs={1}
          >
            <Box marginBottom={1}>
              <Typography variant="body1" color="secondary.dark">
                Production companies:
              </Typography>
              <Typography variant="subtitle2">
                {movie?.production_companies && movie.production_companies.map((company) => company.name).join(', ')}
              </Typography>
            </Box>
            <Box marginBottom={1}>
              <Typography variant="body1" color="secondary.dark">
                Production locations:
              </Typography>
              <Typography variant="subtitle2">
                {movie?.production_countries && movie.production_countries.map((country) => country.name).join(', ')}
              </Typography>
            </Box>
            <Box marginBottom={1}>
              <Typography variant="body1" color="secondary.dark">
                Staring:
              </Typography>
              <Typography variant="subtitle2">
                {movie?.credits?.cast && movie.credits.cast.slice(0, 6).map((actor) => (
                  <Box key={actor.id}>
                    {actor.name}
                  </Box>
                ))}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </>
);

export default MovieDetailsTab;
