import { Box, Typography } from '@mui/material';
import React from 'react';
import { minToHoursAndMin } from '../../helpers/convert';

const MovieLangAndRelease = ({ runtime, languages, variant = 'body2' }) => (
  <Box display="flex">
    <Typography
      style={{ marginRight: '10px' }}
      variant={variant}
      align="center"
    >
      {runtime && minToHoursAndMin(runtime)}
    </Typography>
    <Typography 
      variant={variant}
      align="center"
    >
      {languages?.length > 0
        ? ` | ${languages.map((lang) => lang.iso_639_1).join(', ')}` : ''} 
    </Typography>
  </Box>
);

export default MovieLangAndRelease;
