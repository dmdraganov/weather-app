import { useEffect, useState } from 'react';

export const useFetch = <T>(url: string | null, options?: RequestInit) => {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    if (!url) return;
    const abortController = new AbortController();
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          ...options,
          signal: abortController.signal,
        });
        if (!response.ok) throw new Error(String(response.status));

        const data = await response.json();

        setData(data);
      } catch (error) {
        console.error(error, url);
      }
    };
    fetchData();
    return () => abortController.abort('abort reason: component unmount');
  }, [url, options]);

  return data;
};
