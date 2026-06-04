import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import { RequireLocationLayout } from './layouts/RequireLocationLayout';
import { lazy, Suspense } from 'react';
import { AppLayout } from '../layouts/AppLayout/AppLayout';

const HomePage = lazy(() => {
  return import('../../pages/Home/HomePage');
});
const LocationPage = lazy(() => {
  return import('../../pages/Location/LocationPage');
});
const SettingsPage = lazy(() => {
  return import('../../pages/Settings/SettingsPage');
});

const routes: RouteObject[] = [
  {
    element: <AppLayout />,
    children: [
      {
        element: <RequireLocationLayout />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
        ],
      },
      { path: '/location', element: <LocationPage /> },
      { path: '/settings', element: <SettingsPage /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
