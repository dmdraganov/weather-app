import { useEffect, useState, type Dispatch } from 'react';

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() => {
    const savedValue = localStorage.getItem(key);
    if (!savedValue) return initialValue;
    try {
      return JSON.parse(savedValue) as T;
    } catch {
      return savedValue as unknown as T;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
