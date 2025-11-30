import { useEffect, useState, type PropsWithChildren } from 'react';
import type { Location, Coords } from '../types/locationApi';
import { useFetch } from '../hooks/useFetch';
import { fetchGeolocation } from '../utilities/geolocationProvider';
import getUrl from '../utilities/urlBuilder';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';
import { LocationContext } from './LocationContext';

export const LocationProvider = ({ children }: PropsWithChildren) => {
  const [geolocationCoords, setGeolocationCoords] = useState<Coords | null>(
    null
  );
  const [locationCoords, setLocationCoords] = useState<Coords | null>(null);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [selectedLocation, setSelectedLocation] =
    useLocalStorage<Location | null>('location', null);
  const navigate = useNavigate();

  const [geolocationRes] =
    useFetch<Location[]>(
      geolocationCoords && getUrl('search', geolocationCoords)
    ) || [];
  const [searchRes] =
    useFetch<Location[]>(locationCoords && getUrl('search', locationCoords)) ||
    [];

  useEffect(() => {
    (async () => {
      try {
        const response = await fetchGeolocation();
        if (response) setGeolocationCoords(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    if (geolocationRes) setCurrentLocation(geolocationRes);
  }, [geolocationRes]);

  useEffect(() => {
    if (searchRes) setSelectedLocation(searchRes);
  }, [searchRes]);

  useEffect(() => {
    if (selectedLocation) return;
    currentLocation
      ? setSelectedLocation(currentLocation)
      : navigate('/location');
  }, [selectedLocation, currentLocation]);

  const setLocation = (location: Location | Coords) => {
    'id' in location
      ? setSelectedLocation(location)
      : setLocationCoords(location);
  };

  return (
    <LocationContext.Provider
      value={{ selectedLocation, setLocation, currentLocation }}
    >
      {children}
    </LocationContext.Provider>
  );
};
