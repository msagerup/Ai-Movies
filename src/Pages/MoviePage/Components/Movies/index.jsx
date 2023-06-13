import React, { useState, useEffect } from 'react';

import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useGetMoviesQuery } from '../../../../Redux/Services/TMDB';
import MovieList from '../MovieList';
import Loader from '../../../../Components/Loader/Loader';

const Movies = () => {
  const [page, setPage] = useState(1);
  const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.currentGenreIdOrCategory);
  const { data, error, isFetching } = useGetMoviesQuery({
    genreIdOrCategoryName,
    searchQuery,
    page,
  });

  if (isFetching) {
    return <Loader size="4rem" display="flex" position="center" />;
  }

  if (error) {
    return (
      <Typography variant="h6">
        Sorry, there has been an error, try to reload the page or try again
        later.
      </Typography>
    );
  }

  return (
    <div>
      <MovieList movies={data} />
    </div>
  );
};

export default Movies;
