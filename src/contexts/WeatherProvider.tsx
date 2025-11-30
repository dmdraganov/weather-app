import { useContext, type PropsWithChildren } from 'react';
import { LocationContext } from './LocationContext';
import type { WeatherData } from '../types/weatherAPI';
import { useFetch } from '../hooks/useFetch';
import getUrl from '../utilities/urlBuilder';
import { WeatherContext } from './WeatherContext';

const API = 'forecast';

export const WeatherProvider = ({ children }: PropsWithChildren) => {
  const { selectedLocation } = useContext(LocationContext);
  const weatherData = useFetch<WeatherData>(
    selectedLocation && getUrl(API, selectedLocation.name)
  );

  return (
    <WeatherContext.Provider value={weatherData}>
      {weatherData && children}
    </WeatherContext.Provider>
  );
};
