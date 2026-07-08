import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { suggestLocations } from './suggestion.api';
import { useLanguage } from '../../../localization/hooks/useLanguage';
import { useDebounce } from '../../../../shared/hooks/useDebounce';

export const useSuggestLocations = () => {
  const [query, setQuery] = useState<string>('');
  const debouncedQuery = useDebounce(query);
  const [language] = useLanguage();

  const queryResult = useQuery({
    queryKey: ['locations-search', debouncedQuery, language],
    queryFn: () => suggestLocations(debouncedQuery, language),
    enabled: debouncedQuery.length > 0,
    placeholderData: (previousData) => previousData,
  });

  return { query, setQuery, ...queryResult };
};
