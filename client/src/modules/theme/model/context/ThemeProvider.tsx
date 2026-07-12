import { useEffect, type PropsWithChildren } from 'react';
import ThemeContext from './ThemeContext';
import { useLocalStorage } from '../../../../shared/hooks/useLocalStorage';
import type { Theme } from '../entities/theme';
import { useSystemTheme } from '../../hooks/useSystemTheme';

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
