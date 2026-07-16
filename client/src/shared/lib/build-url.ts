export function buildUrl(
  url: string,
  searchParams: Record<string, string | number | boolean>
): URL {
  const parsedUrl = new URL(url);
  Object.entries(searchParams).forEach(([key, value]) => {
    parsedUrl.searchParams.set(key, String(value));
  });
  return parsedUrl;
}
