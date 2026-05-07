import { useEffect, useState, type Dispatch } from 'react';

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() => {
    const savedValue = localStorage.getItem(key);
    return savedValue ? (JSON.parse(savedValue) as T) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
