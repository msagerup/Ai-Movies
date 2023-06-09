import React from 'react';
import { CssBaseline } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Provider } from 'react-redux';
import routes from '../Router/routes';

import useStyles from './styles.js';
import store from '../Redux/Store';

const theme = createTheme();

const App = () => {
  const classes = useStyles();

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          <RouterProvider router={routes} />
        </div>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
