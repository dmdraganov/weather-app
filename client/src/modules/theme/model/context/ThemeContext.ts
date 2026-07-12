import { createContext, type Dispatch, type SetStateAction } from 'react';
import type { Theme } from '../entities/theme';

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: Omit<Theme, 'system'>;
  setTheme: Dispatch<SetStateAction<Theme>>;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'system',
  resolvedTheme: 'light',
  setTheme() {},
});

export default ThemeContext;
