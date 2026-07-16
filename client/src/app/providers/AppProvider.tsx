import type { PropsWithChildren } from 'react';
import ThemeProvider from '../../shared/theme/ThemeProvider';
import { QueryProvider } from './query-client/QueryProvider';

export const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </QueryProvider>
  );
};
