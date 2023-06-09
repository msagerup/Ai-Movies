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

import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useStyles from './styles.js';

const redLogo =
  'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';

const blueLogo =
  'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';

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

const demoGenre = [
  {
    label: 'Comedy',
    value: 'comedy',
  },
  {
    label: 'Drama',
    value: 'drama',
  },
  {
    label: 'Action',
    value: 'action',
  },
  {
    label: 'Romance',
    value: 'romance',
  },
  {
    label: 'Horror',
    value: 'horror',
  },
  {
    label: 'Sci-Fi',
    value: 'sci-fi',
  },
];

const SideBar = ({ setIsMobileOpen }) => {
  const theme = useTheme();
  const classes = useStyles();

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
            <ListItemButton onClick={() => {}}>
              {/* <ListItemIcon>
                <img src={redLogo} alt="Logo" className={classes.genreImages} />
              </ListItemIcon> */}
              <ListItemText primary={label} />
            </ListItemButton>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {demoGenre.map(({ label, value }) => (
          <Link key={value} className={classes.links} to="/">
            <ListItemButton onClick={() => {}}>
              {/* <ListItemIcon>
                <img src={redLogo} alt="Logo" className={classes.genreImages} />
              </ListItemIcon> */}
              <ListItemText primary={label} />
            </ListItemButton>
          </Link>
        ))}
      </List>
    </>
  );
};

export default SideBar;
