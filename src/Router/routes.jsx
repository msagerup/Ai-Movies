import * as React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { MainLayout } from '../Layout';
import { Movies, Profile, Actors } from '../Pages';

const routes = createBrowserRouter([
  {
    path: '/',
    exact: true,
    layout: <MainLayout />,
    routes: [{ path: '/', element: <h2>hello</h2> }],
  },
  {
    path: '/movie/:id',
    element: <Movies />,
  },
  { path: '/profile', element: <Profile /> },
  { path: '/actors', element: <Actors /> },
]);

export default routes;
