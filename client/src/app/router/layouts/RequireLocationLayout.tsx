import { Navigate, Outlet } from 'react-router-dom';
import { useCurrentLocation } from '../../../modules/location/hooks/useCurrentLocation';
import { useGeolocation } from '../../../modules/location/hooks/useGeolocation';
import { ROUTES } from '../../../shared/config/routes';

export const RequireLocationLayout = () => {
  const [currentLocation] = useCurrentLocation();
  const { data: geoCoordinates, isLoading } = useGeolocation();

  if (!currentLocation && !geoCoordinates && !isLoading) {
    return <Navigate to={ROUTES.location} replace />;
  }
  return <Outlet />;
};
