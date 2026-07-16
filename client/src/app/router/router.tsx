import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import { RequireLocationLayout } from './layouts/RequireLocationLayout';
import { lazy } from 'react';
import { AppLayout } from '../layouts/AppLayout/AppLayout';
import { ROUTES } from '../../shared/config/routes';

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
            path: ROUTES.home,
            element: <HomePage />,
          },
        ],
      },
      { path: ROUTES.location, element: <LocationPage /> },
      { path: ROUTES.settings, element: <SettingsPage /> },
    ],
  },
  {
    path: '*',
    element: <div>404</div>,
  },
];

export const router = createBrowserRouter(routes);
