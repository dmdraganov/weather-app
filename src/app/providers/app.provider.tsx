import type { PropsWithChildren } from 'react';
import ThemeProvider from '../../modules/theme/context/ThemeProvider';
import { AppQueryProvider } from './query.provider';

export const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <AppQueryProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </AppQueryProvider>
  );
};
