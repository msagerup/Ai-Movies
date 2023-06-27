import React, { useEffect } from 'react';

import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useGetMoviesQuery } from '../../../../Redux/Services/TMDB';
import MovieList from '../MovieList';
import Loader from '../../../../Components/Loader/Loader';
import { selectPage } from '../../../../Redux/Features/pagination';
import { fetchMovieDetails } from '../../../../Redux/Features/movieDetails';
import { randomSingleFromArr } from '../../../../helpers/randomSingleFromArr';

const Movies = () => {
  const page = useSelector(selectPage);
  const dispatch = useDispatch();
  const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.currentGenreIdOrCategory);
  const { data, error, isFetching } = useGetMoviesQuery({
    genreIdOrCategoryName,
    searchQuery,
    page,
  });

  const firstMovieForHeroComp = randomSingleFromArr(data?.results);

  useEffect(() => {
    if (firstMovieForHeroComp) {
      dispatch(fetchMovieDetails(firstMovieForHeroComp.id));
    }
  }, [data]);

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
    <div style={{ paddingBottom: '30px' }}>
      <MovieList movies={data.results} shouldFetchMovieDetails />
    </div>
  );
};
export default Movies;
