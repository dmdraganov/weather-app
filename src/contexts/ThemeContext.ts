import { createContext, type Dispatch, type SetStateAction } from 'react';
import type { ThemeContextValue } from '../types/contexts';

const ThemeContext = createContext<ThemeContextValue>(['system', () => {}]);

export default ThemeContext;
