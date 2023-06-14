import { configureStore } from '@reduxjs/toolkit';
import { tmdbApi } from '../Services/TMDB';
import genreIdOrCategoryReducer from '../Features/currentGenreIdOrCategory';
import authReducer from '../Features/auth';

export default configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    currentGenreIdOrCategory: genreIdOrCategoryReducer,
    auth: authReducer,

  },
  middleware: (getDefaultMiddleware) =>
    //   eslint-disable-next-line implicit-arrow-linebreak
    getDefaultMiddleware().concat(tmdbApi.middleware),
});
