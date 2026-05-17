import { useEffect, useState } from 'react';
import { getSystemTheme } from '../utils/system-theme';
import { observeSystemTheme } from '../utils/system-theme-listener';

export const useSystemTheme = () => {
  const [systemTheme, setSystemTheme] = useState(getSystemTheme());

  useEffect(() => {
    return observeSystemTheme(() => setSystemTheme(getSystemTheme()));
  }, []);

  return systemTheme;
};
