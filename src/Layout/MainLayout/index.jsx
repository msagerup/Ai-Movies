import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../../Components/NavBar';
import useStyles from './styles.js';
import UseAlanAi from '../../hooks/UseAlanAi';

const MainLayout = () => {
  UseAlanAi();
  const classes = useStyles();

  return (
    <>
      <NavBar />
      <main className={classes.content}>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
