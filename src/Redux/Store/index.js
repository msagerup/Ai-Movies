import { configureStore } from '@reduxjs/toolkit';
import { tmdbApi } from '../Services/TMDB';
import genreIdOrCategoryReducer from '../Features/currentGenreIdOrCategory';
import authReducer from '../Features/auth';
import movieDetailsReducer from '../Features/movieDetails';
import paginationReducer from '../Features/pagination';
import videoPlayerReducer from '../Features/videoPlayerState';

export default configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    currentGenreIdOrCategory: genreIdOrCategoryReducer,
    auth: authReducer,
    movieDetails: movieDetailsReducer,
    pagination: paginationReducer,
    videoPlayer: videoPlayerReducer,

  },
  middleware: (getDefaultMiddleware) =>
    //   eslint-disable-next-line implicit-arrow-linebreak
    getDefaultMiddleware().concat(tmdbApi.middleware),
});
