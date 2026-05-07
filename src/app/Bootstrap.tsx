import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import { useCurrentLocationInit } from '../modules/location/hooks/useCurrentLocationInit';

export const Bootstrap = () => {
  useCurrentLocationInit();

  return <RouterProvider router={router} />;
};
