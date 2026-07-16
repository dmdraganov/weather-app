import type { Coordinates } from '../../../shared/model/coordinates';
import { ROUTES } from '../../../shared/config/routes';

const LATITUDE_KEY = 'lat';
const LONGITUDE_KEY = 'lon';
const COORDINATE_PRECISION = 5;

export type LocationSearchParamsState =
  | { status: 'missing' }
  | { status: 'invalid' }
  | { status: 'valid'; coordinates: Coordinates };

const formatCoordinate = (value: number): string => {
  return Number(value.toFixed(COORDINATE_PRECISION)).toFixed(
    COORDINATE_PRECISION
  );
};

const parseCoordinate = (value: string | null, min: number, max: number) => {
  if (value === null || value.trim() === '') return null;

  const coordinate = Number(value);
  if (!Number.isFinite(coordinate) || coordinate < min || coordinate > max) {
    return null;
  }

  return Number(formatCoordinate(coordinate));
};

export const parseLocationSearchParams = (
  searchParams: URLSearchParams
): LocationSearchParamsState => {
  const latitudeParam = searchParams.get(LATITUDE_KEY);
  const longitudeParam = searchParams.get(LONGITUDE_KEY);

  if (latitudeParam === null && longitudeParam === null) {
    return { status: 'missing' };
  }

  const latitude = parseCoordinate(latitudeParam, -90, 90);
  const longitude = parseCoordinate(longitudeParam, -180, 180);

  if (latitude === null || longitude === null) {
    return { status: 'invalid' };
  }

  return {
    status: 'valid',
    coordinates: { latitude, longitude },
  };
};

export const mapCoordinatesToSearchParams = (
  coordinates: Coordinates
): URLSearchParams => {
  return new URLSearchParams({
    [LATITUDE_KEY]: formatCoordinate(coordinates.latitude),
    [LONGITUDE_KEY]: formatCoordinate(coordinates.longitude),
  });
};

export const mapCoordinatesToSearch = (coordinates: Coordinates): string => {
  return `?${mapCoordinatesToSearchParams(coordinates).toString()}`;
};

export const canonicalizeLocationSearchParams = (
  searchParams: URLSearchParams,
  coordinates: Coordinates
): URLSearchParams => {
  const canonicalSearchParams = new URLSearchParams(searchParams);
  const locationSearchParams = mapCoordinatesToSearchParams(coordinates);

  canonicalSearchParams.set(
    LATITUDE_KEY,
    locationSearchParams.get(LATITUDE_KEY)!
  );
  canonicalSearchParams.set(
    LONGITUDE_KEY,
    locationSearchParams.get(LONGITUDE_KEY)!
  );

  return canonicalSearchParams;
};

export const getWeatherNavigationTarget = (
  coordinates: Coordinates | null | undefined
): string => {
  return coordinates
    ? `${ROUTES.home}${mapCoordinatesToSearch(coordinates)}`
    : ROUTES.location;
};

export const areSameCoordinates = (
  a: Coordinates | null | undefined,
  b: Coordinates | null | undefined
): boolean => {
  if (!a || !b) return false;

  return (
    formatCoordinate(a.latitude) === formatCoordinate(b.latitude) &&
    formatCoordinate(a.longitude) === formatCoordinate(b.longitude)
  );
};
