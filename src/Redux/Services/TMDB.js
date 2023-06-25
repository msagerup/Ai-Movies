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
        return `/trending/movie/day?page=${page}&api_key=${tmdbApiKey}`;
      },
    }),
    // Get Movie Details
    getMovieDetails: builder.query({
      query: (movieId) => `/movie/${movieId}?append_to_response=videos,reviews,credits,images,similar&api_key=${tmdbApiKey}`,
    }),
    getActorById: builder.query({
      query: (actorId) => `/person/${actorId}?append_to_response=movie_credits&api_key=${tmdbApiKey}`,
    }),
    // Get User Specific Lists
    getList: builder.query({
      query: ({ listName, accountId, sessionId, page }) => `/account/${accountId}/${listName}?api_key=${tmdbApiKey}&session_id=${sessionId}&page=${page}`,
    }),
  }),

});

export const {
  useGetMoviesQuery,
  useGetGenresQuery,
  useGetMovieDetailsQuery,
  useGetActorByIdQuery,
  useGetListQuery,
} = tmdbApi;
