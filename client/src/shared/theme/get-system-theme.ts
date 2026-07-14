import type { ResolvedTheme } from './theme';

export const getSystemTheme = (): ResolvedTheme => {
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return isDark ? 'dark' : 'light';
};
