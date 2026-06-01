import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { suggestLocations } from '../api/suggestion/suggestion.api';
import { useLanguage } from '../../localization/hooks/useLanguage';

export const useSuggestLocations = () => {
  const [query, setQuery] = useState<string>('');
  const [language] = useLanguage();

  const queryResult = useQuery({
    queryKey: ['locations-search', query, language],
    queryFn: () => suggestLocations(query, language),
    enabled: query.length > 0,
  });
  
  return { query, setQuery, ...queryResult };
};

