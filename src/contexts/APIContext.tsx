import { createContext } from 'react';
import type { IWeatherData } from '../types/weatherAPI';

const ApiContext = createContext<IWeatherData | null>(null);

export default ApiContext;
