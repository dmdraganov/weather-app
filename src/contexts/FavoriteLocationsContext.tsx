import { createContext, type PropsWithChildren } from 'react';
import type {
	FavoriteLocationsContextValue,
	Location,
} from '../types/locationApi';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const FavoriteLocationsContext =
	createContext<FavoriteLocationsContextValue>([[], () => {}]);

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
