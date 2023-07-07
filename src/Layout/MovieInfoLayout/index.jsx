import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';

import NavBar from '../../Components/NavBar';
import UseAlanAi from '../../hooks/UseAlanAi';

const MovieInfoLayout = () => {
  const [state, setState] = React.useState({});
  UseAlanAi();

  return (
    <>
      <NavBar />
      <Container
        disableGutters
        maxWidth="xl"
        sx={{
          paddingTop: '80px',
        }}
      >
        <main>
          <Outlet />
        </main>
      </Container>
    </>
  );
};

export default MovieInfoLayout;
