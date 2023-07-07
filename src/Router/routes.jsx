import * as React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { MainLayout } from '../Layout';
import { Movies, MovieInfo, Actors, Profile } from '../Pages';
import ErrorPage from '../Components/ErrorPage.jsx';
import MoviePage from '../Pages/MoviePage/index.jsx';
import MovieInfoLayout from '../Layout/MovieInfoLayout';

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
        path: 'actors/:id',
        element: <Actors />,
      },
      { path: 'profile/:id', element: <Profile /> },
    ],
  },
  {
    path: '/movie/:id',
    element: <MovieInfoLayout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <MovieInfo />,
      },
    
    ],
  },
]);

export default routes;
