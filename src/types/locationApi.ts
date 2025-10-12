import type { Dispatch, SetStateAction } from 'react';

export type CurrentLocationContextValue = [Location | null, SetCurrentLocation];
type SetCurrentLocation = Dispatch<SetStateAction<Location | null>>;

export type FavoriteLocationsContextValue = [
	Location[],
	React.Dispatch<React.SetStateAction<Location[]>>
];

export interface Location {
	id: number;
	name: string;
	region?: string;
	country: string;
	lat: number;
	lon: number;
	url: string;
}
