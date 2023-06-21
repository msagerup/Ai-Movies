import React, { useState, useEffect, useContext } from 'react';
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

import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setUser, userSelector } from '../../Redux/Features/auth';
import Sidebar from '../SideBar';
import Search from '../Search';

import useStyles from './styles.js';
import { fetchToken, createSessionId, moviesApi } from '../../utils';
import { ColorModeContext } from '../../Context/ToggleColorMode';

const token = localStorage.getItem('request_token');
const sessionIdFromLocalStorage = localStorage.getItem('session_id');

const NavBar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user, isAuthenticated } = useSelector(userSelector);
  // const { user } = useSelector(userSelector);
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width: 600px)');
  const theme = useTheme();

  const { toggleColorMode } = useContext(ColorModeContext);

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
        console.error((error));
      }
    };

    logInUser();
  }, [token, sessionIdFromLocalStorage, dispatch]);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              style={{ outline: 'none' }}
              onClick={() => setIsMobileOpen((prevIsMobileOpen) => !prevIsMobileOpen)}
              className={classes.menuButton}
            >
              <Menu />
            </IconButton>
          )}
          <IconButton color="inherit" sx={{ ml: 1 }} onClick={toggleColorMode}>
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && <Search />}
          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={fetchToken}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color="inherit"
                component={Link}
                to={`/profile/${user?.id}`}
                className={classes.linkButton}
                onClick={() => {}}
              >
                {!isMobile && <>My Movies &nbsp;</>}
                <Avatar
                  style={classes.avatar}
                  alt="Profile"
                  src={`https://www.themoviedb.org/t/p/w64_and_h64_face${user?.avatar?.tmdb?.avatar_path}`}
                />
              </Button>
            )}
          </div>
          {isMobile && <Search />}
        </Toolbar>
      </AppBar>
      <div>
        <nav className={classes.drawer}>
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="right"
              open={isMobileOpen}
              onClose={() => setIsMobileOpen((prevIsMobileOpen) => !prevIsMobileOpen)}
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{ keepMounted: true }}
            >
              <Sidebar setIsMobileOpen={setIsMobileOpen} />
            </Drawer>
          ) : (
            <Drawer
              classes={{ paper: classes.drawerPaper }}
              variant="permanent"
            >
              <Sidebar setMobileOpen={setIsMobileOpen} />
            </Drawer>
          )}
        </nav>
      </div>
    </>
  );
};

export default NavBar;
