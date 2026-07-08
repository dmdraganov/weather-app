import { useEffect, useState } from 'react';
import { getSystemTheme } from '../utils/get-system-theme';
import { observeSystemTheme } from '../utils/observe-system-theme';

export const useSystemTheme = () => {
  const [systemTheme, setSystemTheme] = useState(getSystemTheme());

  useEffect(() => {
    return observeSystemTheme(() => setSystemTheme(getSystemTheme()));
  }, []);

  return systemTheme;
};
