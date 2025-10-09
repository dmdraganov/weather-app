import type { Dispatch, SetStateAction } from 'react';

export type TCurrentLocationContext = [ILocation, TSetCurrentLocation];

export type TFavoriteLocationsContext = [
	ILocation[],
	React.Dispatch<React.SetStateAction<ILocation[]>>
];

export type TSetCurrentLocation = Dispatch<SetStateAction<ILocation>>;

export interface ILocation {
	id: number;
	name: string;
	region?: string;
	country: string;
	lat: number;
	lon: number;
	url: string;
}
