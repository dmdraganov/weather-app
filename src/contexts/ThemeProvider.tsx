import { useEffect, type PropsWithChildren } from 'react';
import ThemeContext from './ThemeContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Theme } from '../types/contexts';

const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'system');

  useEffect(() => {
    if (theme === 'system') return;
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
