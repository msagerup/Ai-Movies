import { configureStore } from '@reduxjs/toolkit';
import { tmdbApi } from '../Services/TMDB';
import { authApi } from '../Services/Auth';
import genreIdOrCategoryReducer from '../Features/currentGenreIdOrCategory';

export default configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    currentGenreIdOrCategory: genreIdOrCategoryReducer,

  },
  middleware: (getDefaultMiddleware) =>
    //   eslint-disable-next-line implicit-arrow-linebreak
    getDefaultMiddleware().concat(tmdbApi.middleware, authApi.middleware),
});
