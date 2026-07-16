import type { Coordinates } from '../../../../shared/model/coordinates';

export const requestGeolocation = (): Promise<Coordinates> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation)
      return reject(new Error('Your browser does not support geolocation'));

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const coordinates: Coordinates = {
          latitude: coords.latitude,
          longitude: coords.longitude,
        };
        resolve(coordinates);
      },
      (error) => reject(new Error(error.message))
    );
  });
};
