import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import SettingsPage from '../pages/Settings/SettingsPage';
import LocationPage from '../pages/Location/LocationPage';
import HomePage from '../pages/Home/HomePage';
import { WeatherProvider } from '../modules/weather/contexts/WeatherProvider';

const routes: RouteObject[] = [
  {
    index: true,
    element: (
      <WeatherProvider>
        <HomePage />
      </WeatherProvider>
    ),
  },
  { path: '/location', element: <LocationPage /> },
  { path: '/settings', element: <SettingsPage /> },
];

export const router = createBrowserRouter(routes);
