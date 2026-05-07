import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { findLocationsByQuery } from '../api/location.api';
import { useLanguage } from '../../localization/hooks/useLanguage';

export const useLocationsSearch = () => {
  const [query, setQuery] = useState<string>('');
  const [language] = useLanguage();

  const queryResult = useQuery({
    queryKey: ['locations-search', query, language],
    queryFn: () => findLocationsByQuery(query, language),
    enabled: query.length > 0,
  });
  return { query, setQuery, ...queryResult };
};
