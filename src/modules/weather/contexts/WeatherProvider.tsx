import { type PropsWithChildren } from 'react';
import { WeatherContext } from './WeatherContext';
import { useWeather } from '../hooks/useWeather';

export const WeatherProvider = ({ children }: PropsWithChildren) => {
  const { data } = useWeather();

  return (
    <WeatherContext.Provider value={data ?? null}>
      {data && children}
    </WeatherContext.Provider>
  );
};
