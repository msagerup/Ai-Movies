import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../../Components/NavBar';

import useStyles from './styles.js';

const MainLayout = () => {
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
