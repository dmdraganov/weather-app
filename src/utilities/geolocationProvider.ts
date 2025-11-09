import type { Coords } from '../types/locationApi';

export const fetchGeolocation = (): Promise<Coords> => {
	return new Promise((resolve, reject) => {
		if (!navigator.geolocation)
			reject('Your browser does not support geolocation');
		else {
			navigator.geolocation.getCurrentPosition(
				({ coords }) => {
					const geolocationCoords: Coords = [coords.latitude, coords.longitude];
					resolve(geolocationCoords);
				},
				error => reject(error.message)
			);
		}
	});
};
