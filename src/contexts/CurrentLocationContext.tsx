import {
	createContext,
	useEffect,
	useState,
	type PropsWithChildren,
} from 'react';
import type {
	Location,
	CurrentLocationContextValue,
} from '../types/locationApi';
import { useFetch } from '../hooks/useFetch';
import { fetchGeolocation } from '../utilities/geolocationProvider';
import getUrl from '../utilities/urlBuilder';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const CurrentLocationContext =
	createContext<CurrentLocationContextValue>([null, () => {}]);

export const CurrentLocationProvider = ({ children }: PropsWithChildren) => {
	const [geolocationUrl, setGeolocationUrl] = useState<string | null>(null);
	const [currentLocation, setCurrentLocation] =
		useLocalStorage<Location | null>('location', null);

	const locationsList = useFetch<Location[]>(geolocationUrl);

	useEffect(() => {
		(async () => {
			const response = await fetchGeolocation();
			setGeolocationUrl(getUrl('search', response));
		})();
	}, []);

	useEffect(() => {
		if (locationsList?.length) setCurrentLocation(locationsList[0]);
	}, [locationsList]);

	return (
		<CurrentLocationContext.Provider
			value={[currentLocation, setCurrentLocation]}
		>
			{children}
		</CurrentLocationContext.Provider>
	);
};
