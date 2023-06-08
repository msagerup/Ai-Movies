import * as React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { MainLayout } from '../Layout';
import { Movies, MovieInfo, Actors, Profile } from '../Pages';
import ErrorPage from '../Components/ErrorPage.jsx';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
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

// Good example below..

//   {
//     path: '/movie/:id',
//     element: <Movies />,
//   },
//   { path: '/profile', element: <Profile /> },
//   { path: '/actors', element: <Actors /> },
//   {
//     path: '/',
//     children: [
//       {
//         path: '/',

//         layout: <MainLayout />,
//         element: <h2>hello4</h2>,
//       },
//     ],
//   },
// ]);

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Layout />,
//     children: [
//       {
//         index: true,
//         element: <Home />,
//       },
//       {
//         path: 'about',
//         // Single route in lazy file
//         lazy: () => import('./pages/About'),
//       },
//       {
//         path: 'dashboard',
//         async lazy() {
//           // Multiple routes in lazy file
//           const { DashboardLayout } = await import('./pages/Dashboard');
//           return { Component: DashboardLayout };
//         },
//         children: [
//           {
//             index: true,
//             async lazy() {
//               const { DashboardIndex } = await import('./pages/Dashboard');
//               return { Component: DashboardIndex };
//             },
//           },
//           {
//             path: 'messages',
//             async lazy() {
//               const { dashboardMessagesLoader, DashboardMessages } =
//                 await import('./pages/Dashboard');
//               return {
//                 loader: dashboardMessagesLoader,
//                 Component: DashboardMessages,
//               };
//             },
//           },
//         ],
//       },
//       {
//         path: '*',
//         element: <NoMatch />,
//       },
//     ],
//   },
// ]);

export default routes;
