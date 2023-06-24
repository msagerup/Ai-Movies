import React from 'react';
import { Typography, Box, Grid } from '@mui/material';

import Movie from '../../Pages/MoviePage/Components/Movie';

const RatedCards = ({ title, data }) => (
  <Box marginTop={2}>
    <Typography variant="h5" gutterBottom>{title}</Typography>
    <Grid container direction="row" spacing={1} justifyContent={{ sm: 'flex-start' }}>
      {data?.results.map((movie, i) => (
        <Movie key={movie.id} movie={movie} i={i} />
      ))}
    </Grid>
  </Box>
);

export default RatedCards;
