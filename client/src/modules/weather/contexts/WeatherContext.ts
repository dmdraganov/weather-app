import { createContext } from 'react';
import type { WeatherData } from '../models';

export const WeatherContext = createContext<WeatherData | null>(null);
