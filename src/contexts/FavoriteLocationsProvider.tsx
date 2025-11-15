import type { PropsWithChildren } from 'react';
import type { Location } from '../types/locationApi';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { FavoriteLocationsContext } from './FavoriteLocationsContext';

export const FavoriteLocationsProvider = ({ children }: PropsWithChildren) => {
  const favoriteLocationsState = useLocalStorage<Location[]>(
    'favoriteLocations',
    []
  );

  return (
    <FavoriteLocationsContext.Provider value={favoriteLocationsState}>
      {children}
    </FavoriteLocationsContext.Provider>
  );
};
