import { useEffect, type PropsWithChildren } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import ThemeContext from './ThemeContext';
import type { Theme } from './theme';
import { useSystemTheme } from './useSystemTheme';

const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'system');
  const systemTheme = useSystemTheme();
  const resolvedTheme = theme === 'system' ? systemTheme : theme;

  useEffect(() => {
    document.documentElement.dataset.theme = resolvedTheme;
  }, [resolvedTheme]);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
