import React, { useEffect } from 'react';
import {
  Divider,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  ListItemIcon,
} from '@mui/material';

import { useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import { setgenreIdOrCategoryName } from '../../Redux/Features/currentGenreIdOrCategory';
import useStyles from './styles.js';
import { useGetGenresQuery } from '../../Redux/Services/TMDB.js';
import Loader from '../Loader/Loader.jsx';
import genreIcons from '../../assets/genres';
import filmnerdlogo from '../../assets/images/filmnerd2.png';

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
  const { data, isLoading } = useGetGenresQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    handleDrawer(false);
  }, [isLoading]);

  return (
    <>
      <Link to="/" className={classes.imageLink}>
        <img
          className={classes.image}
          src={logo}
          alt="Film Nerd Logo"
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
        {isLoading ? <Loader size="2rem" display="flex" position="center" />
          : data.genres.map(({ id, name }) => (
            <Link key={id} className={classes.links} to="/">
              <ListItemButton
                onClick={() => dispatch(setgenreIdOrCategoryName(id))}
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
