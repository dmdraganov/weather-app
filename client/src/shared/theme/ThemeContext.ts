import { createContext, type Dispatch, type SetStateAction } from 'react';
import type { ResolvedTheme, Theme } from './theme';

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: Dispatch<SetStateAction<Theme>>;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'system',
  resolvedTheme: 'light',
  setTheme() {},
});

export default ThemeContext;
