import { createContext } from 'react';
import type { WeatherData } from '../types/weatherAPI';

export const WeatherContext = createContext<WeatherData | null>(null);
