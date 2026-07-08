import { useEffect, type PropsWithChildren } from 'react';
import ThemeContext from './ThemeContext';
import { useLocalStorage } from '../../../../shared/hooks/useLocalStorage';
import type { Theme } from '../entities/theme';
import { useSystemTheme } from '../../hooks/useSystemTheme';

const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'system');
  const systemTheme = useSystemTheme();

  const appliedTheme = theme === 'system' ? systemTheme : theme;

  useEffect(() => {
    document.documentElement.dataset.theme = appliedTheme;
  }, [appliedTheme]);

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
