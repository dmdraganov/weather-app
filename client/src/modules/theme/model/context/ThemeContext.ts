import { createContext, type Dispatch, type SetStateAction } from 'react';
import type { Theme } from '../entities/theme';

type ThemeContextValue = [Theme, Dispatch<SetStateAction<Theme>>];

const ThemeContext = createContext<ThemeContextValue>(['system', () => {}]);

export default ThemeContext;
