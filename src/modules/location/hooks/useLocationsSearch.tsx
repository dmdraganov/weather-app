import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { findLocationsByQuery } from '../api/location.api';

export const useLocationsSearch = () => {
  const [query, setQuery] = useState<string>('');
  const queryResult = useQuery({
    queryKey: ['locations-search', query],
    queryFn: () => findLocationsByQuery(query),
    enabled: query.length > 0,
  });
  return { query, setQuery, ...queryResult };
};
