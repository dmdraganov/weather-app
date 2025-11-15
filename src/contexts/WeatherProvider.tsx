import { useContext, type PropsWithChildren } from 'react';
import { CurrentLocationContext } from './CurrentLocationContext';
import type { WeatherData } from '../types/weatherAPI';
import { useFetch } from '../hooks/useFetch';
import getUrl from '../utilities/urlBuilder';
import { WeatherContext } from './WeatherContext';

const API = 'forecast';

export const WeatherProvider = ({ children }: PropsWithChildren) => {
	const [currentLocation] = useContext(CurrentLocationContext);
	const weatherData = useFetch<WeatherData>(
		currentLocation ? getUrl(API, currentLocation.name) : null
	);
	console.log(currentLocation ? getUrl(API, currentLocation.name) : null);

	return (
		<WeatherContext.Provider value={weatherData}>
			{weatherData && children}
		</WeatherContext.Provider>
	);
};
