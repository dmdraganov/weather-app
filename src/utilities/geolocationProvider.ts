import type { GeolocationCoords } from '../types/geolocation';

export const fetchGeolocation = (): Promise<GeolocationCoords> => {
	return new Promise((resolve, reject) => {
		if (!navigator.geolocation)
			reject('Your browser does not support geolocation');
		else {
			navigator.geolocation.getCurrentPosition(
				({ coords }) => {
					const geolocationCoords = {
						lat: coords.latitude,
						lon: coords.longitude,
					};
					resolve(geolocationCoords);
				},
				error => reject(error.message)
			);
		}
	});
};
