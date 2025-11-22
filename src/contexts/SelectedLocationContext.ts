import { createContext } from 'react';
import type { SelectedLocationContextValue } from '../types/locationApi';

export const SelectedLocationContext =
  createContext<SelectedLocationContextValue>([null, () => {}]);
