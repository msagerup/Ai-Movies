import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useGetMovieDetailsQuery, useGetMoviesQuery } from '../../../../Redux/Services/TMDB';
import MovieList from '../MovieList';
import Loader from '../../../../Components/Loader/Loader';
import Pagination from '../../../../Components/Pagination';
import FeaturedMovie from '../MovieHero';
import { randomSingleFromArr } from '../../../../helpers/randomSingleFromArr';

const Movies = () => {
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.currentGenreIdOrCategory);
  const { data, error, isFetching } = useGetMoviesQuery({ genreIdOrCategoryName, searchQuery, page });
  const { data: selectedMovieDetails, error: detailsError, isFetching: detailsIsFetching } = useGetMovieDetailsQuery(selectedMovie?.id);

  useEffect(() => {
    if (data?.results) {
      setSelectedMovie(randomSingleFromArr(data?.results));
    }
  }, [data]);

  if (isFetching || detailsIsFetching) {
    return <Loader size="4rem" display="flex" position="center" />;
  }

  if (error || detailsError) {
    return (
      <Typography variant="h6">
        Sorry, there has been an error, try to reload the page or try again
        later.
      </Typography>
    );
  }
  
  return (
    <div style={{ paddingBottom: '30px' }}>
      <FeaturedMovie movie={selectedMovieDetails} />
      <MovieList movies={data.results} />
      <Pagination currentPage={page} setPage={setPage} totalPages={data.total_pages} />
    </div>
  );
};

export default Movies;
