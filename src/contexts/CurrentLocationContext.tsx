import {
	createContext,
	useEffect,
	useState,
	type PropsWithChildren,
} from 'react';
import type {
	Location,
	CurrentLocationContextValue,
	Coords,
} from '../types/locationApi';
import { useFetch } from '../hooks/useFetch';
import { fetchGeolocation } from '../utilities/geolocationProvider';
import getUrl from '../utilities/urlBuilder';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';

export const CurrentLocationContext =
	createContext<CurrentLocationContextValue>([null, () => {}, () => {}]);

export const CurrentLocationProvider = ({ children }: PropsWithChildren) => {
	const [coords, setCoords] = useState<Coords | null>(null);
	const [currentLocation, setCurrentLocation] =
		useLocalStorage<Location | null>('location', null);

	const navigate = useNavigate();

	const locationsList = useFetch<Location[]>(
		coords ? getUrl('search', coords) : null
	);

	useEffect(() => {
		(async () => {
			try {
				const response = await fetchGeolocation();
				if (response) setCoords(response);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	useEffect(() => {
		if (locationsList?.length) setCurrentLocation(locationsList[0]);
		else if (!currentLocation) navigate('/location');
	}, [locationsList]);

	return (
		<CurrentLocationContext.Provider
			value={[currentLocation, setCurrentLocation, setCoords]}
		>
			{children}
		</CurrentLocationContext.Provider>
	);
};
