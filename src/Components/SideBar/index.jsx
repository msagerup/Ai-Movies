import React, { useContext, useEffect } from 'react';
import {
  Divider,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  IconButton,
  Box,
} from '@mui/material';

import { useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { setgenreIdOrCategoryName } from '../../Redux/Features/currentGenreIdOrCategory';
import useStyles from './styles.js';
import { useGetGenresQuery } from '../../Redux/Services/TMDB.js';
import Loader from '../Loader/Loader.jsx';
import genreIcons from '../../assets/genres';
import filmnerdlogo from '../../assets/images/filmnerd2.png';
import { ColorModeContext } from '../../Context/ToggleColorMode';

const logo = filmnerdlogo;

const categories = [
  {
    label: 'Popular',
    value: 'popular',
  },
  {
    label: 'Top Rated',
    value: 'top_rated',
  },
  {
    label: 'Upcoming',
    value: 'upcoming',
  },
];

const SideBar = ({ handleDrawer }) => {
  const classes = useStyles();
  const { data, isLoading, isFetching } = useGetGenresQuery();
  const dispatch = useDispatch();
  const theme = useTheme();

  const { toggleColorMode } = useContext(ColorModeContext);

  useEffect(() => {
    handleDrawer(false);
  }, [isLoading, isFetching]);

  const closeDrawer = () => {
    handleDrawer(false);
  };

  return (
    <>
      <Link to="/" className={classes.imageLink}>
        <img
          className={classes.image}
          src={logo}
          alt="Film Nerd Logo"
          onClick={closeDrawer}
        />
      </Link>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.default',
          color: 'text.primary',
          borderRadius: 1,
          p: 1,
        }}
      >
        {theme.palette.mode} mode
        <IconButton 
          sx={{ ml: 1 }} 
          onClick={toggleColorMode} 
          color="inherit"
        >
          {theme.palette.mode === 'dark' 
            ? <Brightness4 /> 
            : <Brightness7 />}
        </IconButton>
      </Box>
      <Divider />
      <List>
        <ListSubheader>
          Categories
        </ListSubheader>
        {categories.map(({ label, value }) => (
          <Link key={value} className={classes.links} to="/">
            <ListItemButton
              onClick={() => {
                dispatch(setgenreIdOrCategoryName(value));
                closeDrawer();
              }}
            >
              <ListItemIcon>
                <img
                  src={genreIcons[label.toLowerCase()]}
                  alt={genreIcons[label.toLowerCase()]}
                  className={classes.genreImages}
                />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {isLoading 
          ? <Loader size="2rem" display="flex" position="center" />
          : data.genres.map(({ id, name }) => (
            <Link key={id} className={classes.links} to="/">
              <ListItemButton
                onClick={() => {
                  dispatch(setgenreIdOrCategoryName(id));
                  closeDrawer();
                }}
              >
                <ListItemIcon>
                  <img
                    src={genreIcons[name.toLowerCase()]}
                    alt={genreIcons[name.toLowerCase()]}
                    className={classes.genreImages}
                  />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItemButton>
            </Link>
          ))}
      </List>
    </>
  );
};

export default SideBar;
