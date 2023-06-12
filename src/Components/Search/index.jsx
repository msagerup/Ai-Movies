import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import { setSearchQuery } from '../../Redux/Features/currentGenreIdOrCategory';
// import { useDebounce } from 'use-debounce';
import useStyles from './styles.js';

const Search = () => {
  const classes = useStyles();
  const [query, setQuery] = useState('');
  const [debouncedText] = useDebounce(query, 400);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
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
