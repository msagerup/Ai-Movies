import * as React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { MainLayout } from '../Layout';
import { Movies, MovieInfo, Actors, Profile } from '../Pages';
import ErrorPage from '../Components/ErrorPage.jsx';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Movies />,
      },
      {
        path: 'approved',
        element: <MovieInfo />,
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
