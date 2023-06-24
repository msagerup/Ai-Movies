import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import NavBar from '../../Components/NavBar';
import useStyles from './styles.js';
import UseAlanAi from '../../hooks/UseAlanAi';

const MainLayout = () => {
  const classes = useStyles();

  UseAlanAi();

  return (
    <>
      <NavBar />
      <Container disableGutters>
        <main className={classes.content}>
          <Outlet />
        </main>
      </Container>
    </>
  );
};

export default MainLayout;
