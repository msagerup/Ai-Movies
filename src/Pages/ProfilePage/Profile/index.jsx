import React from 'react';

import { Typography, Button, Box } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../Redux/Features/auth';

const favoriteMovies = [];

const Profile = () => {
  const { user } = useSelector(userSelector);

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>My Profile</Typography>
        <Button color="inherit" onClick={logout}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      {
      !favoriteMovies.length 
        ? (
          <Typography variant="h5">
            Add movies to your favorites list, to see them here
          </Typography>
        ) : <Box>Fav movies</Box>
      }
    </Box>
  );
};

export default Profile;
