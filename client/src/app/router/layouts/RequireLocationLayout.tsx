import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from '../../../shared/config/routes';
import { useSearchParamsLocation } from '../../../modules/location/hooks/useSearchParamsLocation';
import Spinner from '../../../shared/ui/Spinner/Spinner';

export const RequireLocationLayout = () => {
  const { status, isLoading, error } = useSearchParamsLocation();

  if (status !== 'valid') {
    return <Navigate to={ROUTES.location} replace />;
  }
  if (error) return <div>{error.message}</div>;
  if (isLoading) return <Spinner />;

  return <Outlet />;
};
