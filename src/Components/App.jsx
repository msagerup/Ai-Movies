import React from 'react';
import { CssBaseline } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import routes from '../Router/routes';

import ToggleColorMode from '../Context/ToggleColorMode';
import useStyles from './styles.js';
import store from '../Redux/Store';

const App = () => {
  const classes = useStyles();
  return (
    <Provider store={store}>
      <ToggleColorMode>
        <div className={classes.root}>
          <CssBaseline />
          <RouterProvider router={routes} />
        </div>
      </ToggleColorMode>
    </Provider>
  );
};

export default App;
