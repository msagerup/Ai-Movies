import React, { useEffect } from 'react';
import {
  Divider,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  ListItiemIcon,
  Box,
  CircularProgress,
  ListItemIcon,
} from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { setgenreIdOrCategoryName } from '../../Redux/Features/currentGenreIdOrCategory';
import useStyles from './styles.js';
import { useGetGenresQuery } from '../../Redux/Services/TMDB.js';
import Loader from '../Loader/Loader.jsx';
import genreIcons from '../../assets/genres';

const redLogo = 'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';

const blueLogo = 'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';

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

const SideBar = ({ setIsMobileOpen }) => {
  const theme = useTheme();
  const classes = useStyles();
  const { data, isLoading } = useGetGenresQuery();
  const dispatch = useDispatch();

  return (
    <>
      <Link to="/" className={classes.imageLink}>
        <img
          className={classes.image}
          src={theme.palette.mode === 'light' ? redLogo : blueLogo}
          alt="logo"
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link key={value} className={classes.links} to="/">
            <ListItemButton
              onClick={() => dispatch(setgenreIdOrCategoryName(value))}
            >
              <ListItemIcon>
                <img
                  src={genreIcons[label.toLowerCase()]}
                  alt="Logo"
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
        {isLoading ? <Loader size="2rem" display="flex" position="center" />
          : data.genres.map(({ id, name }) => (
            <Link key={id} className={classes.links} to="/">
              <ListItemButton
                onClick={() => dispatch(setgenreIdOrCategoryName(id))}
              >
                <ListItemIcon>
                  <img
                    src={genreIcons[name.toLowerCase()]}
                    alt="Logo"
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
