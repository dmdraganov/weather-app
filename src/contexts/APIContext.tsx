import { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { IWeatherData } from '../types/weatherAPI';

const APIContext = createContext<IWeatherData | null>(null);

export default APIContext;
