import type { Dispatch, SetStateAction } from 'react';
import type { Theme } from '../types';

export type ThemeContextValue = [Theme, Dispatch<SetStateAction<Theme>>];
