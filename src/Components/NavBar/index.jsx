import React from 'react';
import {
  AppBar,
  IconButton,
  Toolbar,
  Drawer,
  Button,
  Avatar,
  useMediaQuery,
  Icon,
} from '@mui/material';
import {
  Menu,
  AccountCircle,
  Brightness4,
  Brightness7,
} from '@mui/icons-material';

import {useTheme} from '@mui/material/styles';

import { Link } from 'react-router-dom';

import useStyles from './styles.js';

const NavBar = () => {
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width: 600px)');

  return (
    <AppBar position="fixed">
      <Toolbar className={classes.toolbar}>
        {isMobile && (
          <IconButton
            className={classes.menuButton}
            color="inherit"
            edge="start"
            style={{ outline: 'none' }}
            onClick={() => {}}
          >
            <Menu />
          </IconButton>
        )}
        <IconButton color="inherit" sx={{ ml: 1 }} onClick={() => {}}>
          <Brightness7 />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
