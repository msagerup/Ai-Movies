import React from 'react';
import { CssBaseline } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import routes from '../Router/routes';

const App = () => (
  <>
    <CssBaseline />
    <RouterProvider router={routes} />
  </>
);

export default App;
