import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
  endpoints: (builder) => ({
    // Get token
    getToken: builder.query({
      query: (apiKey) => ({
        url: '/authentication/token/new',
        params: {
          api_key: apiKey,
        },
      }),
    }),
  }),
});

export const { useGetTokenQuery } = authApi;
