import { Typography } from '@mui/material';
import React from 'react';

const VoteAvarage = ({ voteAvarage }) => {
  console.log('VoteAvarage');
  if (!voteAvarage) return null;
    
  return (
    <Typography variant="h2">
      {voteAvarage} / 10
    </Typography>
  );
};

export default VoteAvarage;
