import { createContext } from 'react';
import type { IWeatherData } from '../types/weatherAPI';
import type {
	TCurrentLocationContext,
	TFavoriteLocationsContext,
} from '../types/locationApi';

export const WeatherContext = createContext<IWeatherData | null>(null);
export const CurrentLocationContext = createContext<TCurrentLocationContext>([
	{
		id: 519690,
		name: 'Lobnya',
		region: 'Moscow City',
		country: 'Russia',
		lat: 56.011,
		lon: 37.483,
		url: 'lobnya-russia',
	},
	() => {},
]);

export const FavoriteLocationsContext =
	createContext<TFavoriteLocationsContext>([[], () => {}]);
