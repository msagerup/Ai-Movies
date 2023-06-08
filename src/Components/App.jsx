import React from 'react';
import { CssBaseline } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import routes from '../Router/routes';

import useStyles from './styles.js';

const theme = createTheme();

console.log(theme.spacing(2), 'theme.spacing(2)');

const App = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <RouterProvider router={routes} />
      </div>
    </ThemeProvider>
  );
};

export default App;
