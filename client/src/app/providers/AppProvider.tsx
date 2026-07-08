import type { PropsWithChildren } from 'react';
import ThemeProvider from '../../modules/theme/model/context/ThemeProvider';
import { QueryProvider } from './QueryProvider';

export const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </QueryProvider>
  );
};
