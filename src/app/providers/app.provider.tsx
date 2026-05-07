import type { PropsWithChildren } from 'react';
import ThemeProvider from '../../modules/theme/context/ThemeProvider';
import { QueryProvider } from './query.provider';

export const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </QueryProvider>
  );
};
