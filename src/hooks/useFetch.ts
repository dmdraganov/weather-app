import { useEffect, useState } from 'react';

export const useFetch = <T>(url: string, options?: RequestInit) => {
	const [data, setData] = useState<T | null>(null);

	useEffect(() => {
		const abortController = new AbortController();
		const fetchData = async () => {
			try {
				const response = await fetch(url, {
					...options,
					signal: abortController.signal,
				});
				if (!response.ok) throw new Error(String(response.status));

				const data = await response.json();
				console.log('run');
				setData(data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
		return () => abortController.abort('abort reason: component unmount');
	}, [url]);

	return data;
};
