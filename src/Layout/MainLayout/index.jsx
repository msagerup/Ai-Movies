import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container, useMediaQuery } from '@mui/material';

import NavBar from '../../Components/NavBar';

const MainLayout = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <>
      <NavBar />
      <Container
        disableGutters={isMobile}
        maxWidth="xl"
      >
        <main>
          <Outlet />
        </main>
      </Container>
    </>
  );
};

export default MainLayout;
