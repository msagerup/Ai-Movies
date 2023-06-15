import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
  endpoints: (builder) => ({
    // Get genres
    getGenres: builder.query({
      query: () => `/genre/movie/list?language=en&api_key=${tmdbApiKey}`,
    }),

    // Get Popular movies
    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, searchQuery, page }) => {
        // Get movies by search query
        if (searchQuery) {
          return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`;
        }

        // Get movies by category
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string') {
          return `/movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`;
        }
        // Get movies by genre
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number') {
          return `/discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`;
        }
        // Get popular movies
        return `/movie/popular?page=${page}&api_key=${tmdbApiKey}`;
      },
    }),
    // Get Movie Details
    getMovieDetails: builder.query({
      query: (movieId) => `/movie/${movieId}?append_to_response=videos,reviews,credits,similar&api_key=${tmdbApiKey}`,
    }),
  }),
});

export const { useGetMoviesQuery, useGetGenresQuery, useGetMovieDetailsQuery } = tmdbApi;
