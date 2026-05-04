import { useEffect, useState } from 'react';
import { request } from '../api/request';

export const useFetch = <T>(url: string, options?: RequestInit) => {
  const [data, _setData] = useState<T | null>(null);

  useEffect(() => {
    if (!url) return;
    const abortController = new AbortController();
    void request(url, { ...options, signal: abortController.signal });
    return () => abortController.abort('abort reason: component unmount');
  }, [url, options]);


  return data;
};
