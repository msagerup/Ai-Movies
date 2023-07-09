import React from 'react';
import { Box, Tooltip } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import useStyles from './styles';

import genreIcons from '../../assets/genres';

const GenreRow = ({ genres }) => {
  const classes = useStyles();

  if (!genres) return null;
  return (
    <Grid 
      container
      direction="row"
    >
      {genres.map((genre) => (
        <Grid key={genre.id}>
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
  );
};

export default GenreRow;
