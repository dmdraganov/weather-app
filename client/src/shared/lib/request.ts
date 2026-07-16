export const request = async (
  url: string | URL,
  options?: RequestInit
): Promise<unknown> => {
  const response = await fetch(url, {
    ...options,
  });
  if (!response.ok) throw new Error(String(response.status));
  const data: unknown = await response.json();
  return data;
};
