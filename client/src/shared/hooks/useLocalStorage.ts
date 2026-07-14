import { useEffect, useState, type Dispatch } from 'react';

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() => {
    try {
      const savedValue = localStorage.getItem(key);
      if (!savedValue) return initialValue;
      return JSON.parse(savedValue) as T;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Keep the in-memory value when storage is unavailable or full.
    }
  }, [key, value]);

  return [value, setValue];
};
