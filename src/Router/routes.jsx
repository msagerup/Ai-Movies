import * as React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { MainLayout } from '../Layout';
import { Movies, MovieInfo, Actors, Profile } from '../Pages';
import ErrorPage from '../Components/ErrorPage.jsx';
import MoviePage from '../Pages/MoviePage/index.jsx';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <MoviePage />,
      },
      {
        path: 'approved',
        element: <Movies />,
      },
      {
        path: 'movie/:id',
        element: <MovieInfo />,
      },
      {
        path: 'actors/:id',
        element: <Actors />,
      },
      { path: 'profile/:id', element: <Profile /> },
    ],
  },
]);

export default routes;
