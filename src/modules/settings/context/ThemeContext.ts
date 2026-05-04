import { createContext } from 'react';
import type { ThemeContextValue } from './types';

const ThemeContext = createContext<ThemeContextValue>(['system', () => {}]);

export default ThemeContext;
