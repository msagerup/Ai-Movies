import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
  endpoints: (build) => ({
    // Get genres
    getGenres: build.query({
      query: () => `/genre/movie/list?language=en&api_key=${tmdbApiKey}`,
    }),

    // Get Popular movies
    getMovies: build.query({
      queryFn: async ({ genreIdOrCategoryName, searchQuery, page }, _queryApi, _extraOptions, fetchWithBQ) => {
        // Use for collecting data from 2 endpoints
        const finalResult = {
          data: {
            results: [],
          },
        };
        
        // Get movies by search query
        if (searchQuery) {
          const result = await fetchWithBQ(`/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`);
          if (result.error) return { error: result.error };
          return result;
        }
    
        // Get movies by category
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string') {
          const result = await fetchWithBQ(`/movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`);
          if (result.error) return { error: result.error };
          return result;
        }
    
        // Get movies by genre
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number') {
          const result = await fetchWithBQ(`/discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`);
          if (result.error) return { error: result.error };
          return result;
        }
        
        const trendingMovies = await fetchWithBQ(`/trending/movie/day?page=${page}&api_key=${tmdbApiKey}`);
        if (trendingMovies.error) return { error: trendingMovies.error };
        if (!trendingMovies.data) return { error: 'No data available' };

        const detailedTrendingMovies = await Promise.all(trendingMovies?.data?.results.map(async (movie) => {
          const detailedMovie = await fetchWithBQ(`/movie/${movie.id}?append_to_response=videos,reviews,credits,images,similar&api_key=${tmdbApiKey}`);
          finalResult.data.results.push(detailedMovie.data);
        }));

        if (detailedTrendingMovies.error) return { error: detailedTrendingMovies.error };
        return finalResult;
      },
    }),
    
    // Get Movie Details
    getMovieDetails: build.query({
      query: (movieId) => `/movie/${movieId}?append_to_response=videos,reviews,credits,images,similar&api_key=${tmdbApiKey}`,
      keepUnusedDataFor: 20,
    }),
    getActorById: build.query({
      query: (actorId) => `/person/${actorId}?append_to_response=movie_credits&api_key=${tmdbApiKey}`,
    }),
    // Get User Specific Lists
    getList: build.query({
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
