export const fetchData = async (endpoint: string, options?: RequestInit) => {
	try {
		const response = await fetch(endpoint, options);
		if (!response.ok) throw new Error(String(response.status));
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
};
