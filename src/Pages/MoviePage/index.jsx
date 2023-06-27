import React, { useCallback, useState } from 'react';
import FeaturedMovie from './Components/MovieHero';
import Movies from './Components/Movies';
import Pagination from '../../Components/Pagination';

const MoviePage = () => (
  <>
    <FeaturedMovie />
    <Movies />
    <Pagination />
  </>
);

export default MoviePage;

