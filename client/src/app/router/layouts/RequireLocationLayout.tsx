import { Navigate, Outlet } from 'react-router-dom';
import { useCurrentLocation } from '../../../modules/location/model/store/useCurrentLocation';
import { useGeolocation } from '../../../modules/location/api/geolocation/useGeolocation';
import { ROUTES } from '../../../shared/config/routes';

export const RequireLocationLayout = () => {
  const [currentLocation] = useCurrentLocation();
  const { geolocationPos, isLoading } = useGeolocation();

  if (!currentLocation && !geolocationPos && !isLoading) {
    return <Navigate to={ROUTES.location} replace />;
  }
  return <Outlet />;
};
