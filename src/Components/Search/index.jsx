import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setSearchQuery } from '../../Redux/Features/currentGenreIdOrCategory';

// import { useDebounce } from 'use-debounce';
import useStyles from './styles.js';

const Search = () => {
  const classes = useStyles();
  const [query, setQuery] = useState('');

  const location = useLocation();
  const dispatch = useDispatch();
  //   console.log('query', query);

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      console.log('pressed?', e.keyCode);
      dispatch(setSearchQuery(query));
    }
  };

  return (
    <div className={classes.searchContainer}>
      <TextField
        onKeyUp={handleKeyPress}
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
