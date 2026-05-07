import { Navigate, Outlet } from 'react-router-dom';
import { useCurrentLocation } from '../../../modules/location/hooks/useCurrentLocation';
import { useGeolocation } from '../../../modules/location/hooks/useGeolocation';

export const RequireLocationLayout = () => {
  const [currentLocation] = useCurrentLocation();
  const { data: geoCoordinates, isLoading } = useGeolocation();

  if (!currentLocation && !geoCoordinates && !isLoading) {
    return <Navigate to='/location' replace />;
  }
  return <Outlet />;
};
