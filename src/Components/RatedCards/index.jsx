import React from 'react';
import { Typography, Box, Grid, Card, CardMedia, CardContent } from '@mui/material';
import useStyles from './styles.js';

const RatedCards = ({ title, data }) => {
  const classes = useStyles();
 
  return (
    <Box marginTop={2}>
      <Typography variant="h5" gutterBottom>{title}</Typography>
      <Grid 
        container
        rowGap={2}
        columns={{
          xs: 1,
          sm: 2,
          md: 3,
          lg: 3,
        }}
        disableEqualOverflow
      >
        {data?.results.map((movie) => (
          <Grid
            key={movie.id}
            xs={1}
            className={classes.cardItem}
          >
            <Card
              sx={{ maxWidth: 345 }}
            >
              <CardMedia
                sx={{ height: 500, width: 345 }}
                image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {movie.title}
                </Typography>
              
              </CardContent>
              
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RatedCards;
