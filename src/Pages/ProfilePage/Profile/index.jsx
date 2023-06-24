import React, { useEffect } from 'react';

import { Typography, Button, Box, Container } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../Redux/Features/auth';
import { useGetListQuery } from '../../../Redux/Services/TMDB';
import RatedCards from '../../../Components/RatedCards';

const Profile = () => {
  const { user } = useSelector(userSelector);
  const { data: favoriteMovies, refetch: refetchFavorites } = useGetListQuery({ listName: 'favorite/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 });
  const { data: watchlistMovies, refetch: refetchWatchlisted } = useGetListQuery({ listName: 'watchlist/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 });

  useEffect(() => {
    refetchFavorites();
    refetchWatchlisted();
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <Container>
      <Box marginTop={2} display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>My Profile</Typography>
        <Button color="inherit" onClick={logout}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      {!favoriteMovies?.results?.length && !watchlistMovies?.results?.length
        ? <Typography variant="h5">Add favorites or watchlist some movies to see them here!</Typography>
        : (
          <Box display="flex" flexDirection="column">
            <RatedCards title="Favorite Movies" data={favoriteMovies} />
            <RatedCards title="Watchlist" data={watchlistMovies} />
          </Box>
        )}
    </Container>
  );
};

export default Profile;
