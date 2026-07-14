import { useEffect, useState } from 'react';
import { getSystemTheme } from './get-system-theme';
import { observeSystemTheme } from './observe-system-theme';

export const useSystemTheme = () => {
  const [systemTheme, setSystemTheme] = useState(getSystemTheme);

  useEffect(() => {
    return observeSystemTheme(() => setSystemTheme(getSystemTheme()));
  }, []);

  return systemTheme;
};
