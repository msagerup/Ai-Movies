import React, { useState, useEffect } from 'react';
import {
  AppBar,
  IconButton,
  Toolbar,
  Drawer,
  Button,
  Avatar,
  useMediaQuery,
  Typography,
  Box,
} from '@mui/material';
import { Menu } from '@mui/icons-material';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setUser, userSelector } from '../../Redux/Features/auth';
import Sidebar from '../SideBar';
import Search from '../Search';
import useStyles from './styles.js';
import { fetchToken, createSessionId, moviesApi } from '../../utils';
import HideOnScroll from '../HideOnScroll';

const token = localStorage.getItem('request_token');
const sessionIdFromLocalStorage = localStorage.getItem('session_id');

const NavBar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user, isAuthenticated } = useSelector(userSelector);
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width: 900px)');
  const [isUnderDev, setIsUnderDev] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    const logInUser = async () => {
      try {
        if (token) {
          if (sessionIdFromLocalStorage) {
            const { data: userData } = await moviesApi.get(`/account?session_id=${sessionIdFromLocalStorage}`);
            dispatch(setUser(userData));
          } else {
            const sessionId = await createSessionId();
            const { data: userData } = await moviesApi.get(`/account?session_id=${sessionId}`);
            dispatch(setUser(userData));
          }
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error((error));
      }
    };

    logInUser();
  }, [token, sessionIdFromLocalStorage, dispatch]);

  const handleDrawer = (isOpen) => {
    setIsMobileOpen(isOpen);
  };

  return (
    <div>
      <HideOnScroll>
        <AppBar
          position="fixed"
          color="transparent"
          sx={{ boxShadow: 'none' }}
        >
          <Toolbar 
            className={classes.toolbar}
          >
            {isUnderDev && (
            <Typography 
              variant="body2" 
              color="red"
              sx={{ cursor: 'pointer' }}
              onClick={() => setIsUnderDev(false)}
            >
              *** NB! : Working on mobile rendering.
              And redesign of movie details Last updated, 9th July 2023. (Click to hide). 
              NB! Project is under development.*** Click to hide
            </Typography>
            )}
            {isMobile && (
              <IconButton
                color="inherit"
                edge="start"
                style={{ outline: 'none' }}
                onClick={() => handleDrawer(!isMobileOpen)}
                className={classes.menuButton}
              >
                <Menu />
              </IconButton>
            )}
            {/* FIX THIS .. re-write flex thingy.. */}
            {!isMobile && <Box></Box>}
            <Search />
            {!isAuthenticated 
              ? (
                <Button color="inherit" onClick={fetchToken}>
                  <Typography variant="body2">Login &nbsp;</Typography> 
                </Button>
              )
              : (
                <Button
                  color="inherit"
                  component={Link}
                  to={`/profile/${user?.id}`}
                  className={classes.linkButton}
                  onClick={() => {}}
                >
                  {!isMobile 
                    ? <Typography variant="body2">My Movies &nbsp;</Typography> 
                    : (
                      <Avatar
                        style={classes.avatar}
                        alt="Profile"
                        src={`https://www.themoviedb.org/t/p/w64_and_h64_face${user?.avatar?.tmdb?.avatar_path}`}
                      />
                    )}
                </Button>
              )}
            
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <div>
        <nav className={classes.drawer}>
          {isMobile 
            ? (
              <Drawer
                variant="temporary"
                anchor="right"
                open={isMobileOpen}
                onClose={() => handleDrawer(false)}
                classes={{ paper: classes.drawerPaper }}
                ModalProps={{ keepMounted: true }}
              >
                <Sidebar handleDrawer={handleDrawer} />
              </Drawer>
            ) 
            : (
              <Drawer
                classes={{ paper: classes.drawerPaper }}
                variant="permanent"
              >
                <Sidebar handleDrawer={handleDrawer} />
              </Drawer>
            )}
        </nav>
      </div>
    </div>
    
  );
};

export default NavBar;
