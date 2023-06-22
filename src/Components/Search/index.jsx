import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

import { useDispatch } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useDebounce } from 'use-debounce';
import { useLocation, useNavigate } from 'react-router-dom';
import { setSearchQuery } from '../../Redux/Features/currentGenreIdOrCategory';
import useStyles from './styles.js';

const Search = () => {
  const classes = useStyles();
  const [query, setQuery] = useState('');
  const [debouncedText] = useDebounce(query, 400);
  const location = useLocation(); 
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (location.pathname !== 'search') {
      navigate('/');
    }

    if (debouncedText) {
      dispatch(setSearchQuery(debouncedText));
    }
  }, [debouncedText, dispatch]);

  return (
    <div className={classes.searchContainer}>
      <TextField
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        variant="standard"
        InputProps={{
          className: classes.input,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default Search;
