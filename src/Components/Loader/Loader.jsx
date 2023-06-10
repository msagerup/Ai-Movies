import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const Loader = ({ size, display, position }) => (
  <Box display={display} justifyContent={position}>
    <CircularProgress size={size} />
  </Box>
);

export default Loader;
