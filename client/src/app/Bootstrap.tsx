import { useCurrentLocationInit } from '../modules/location/hooks/useCurrentLocationInit';
import type { PropsWithChildren } from 'react';

export const Bootstrap = ({ children }: PropsWithChildren) => {
  useCurrentLocationInit();

  return <>{children}</>;
};
