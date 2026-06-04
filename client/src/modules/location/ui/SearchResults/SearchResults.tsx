import styles from './SearchResults.module.scss';
import LocationItem from '../LocationItem/LocationItem';
import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { LocationSuggestion } from '../../models/location-suggestion.model';
import { useLocationStore } from '../../models/store';
import { useCurrentLocation } from '../../hooks/useCurrentLocation';
import { useGeocodeLocation } from '../../hooks/useGeocodeLocation';

interface SearchResultsProps {
  results: LocationSuggestion[];
  isHidden: boolean;
  maxLength?: number;
}

const SearchResults = ({
  results,
  isHidden,
  maxLength = 5,
}: SearchResultsProps) => {
  const [, setCurrentLocation] = useCurrentLocation();
  const { setLocationId, data } = useGeocodeLocation();
  const { favoriteLocations, toggleFavorite } = useLocationStore();
  const slicedSuggestion = useMemo(
    () => results.slice(0, maxLength),
    [results, maxLength]
  );
  const [height, setHeight] = useState(0);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (resultsContainerRef.current && !isHidden) {
      setHeight(resultsContainerRef.current.scrollHeight);
    }
  }, [results, resultsContainerRef, isHidden]);

  const handleSelect = (id: string) => {
    setLocationId(id);
    if (!data) return;
    setCurrentLocation(data);
  };

  const handleAddFavorite = (id: string) => {
    setLocationId(id);
    if (!data) return;
    toggleFavorite(data);
  };

  return (
    <div
      className={`${styles.listContainer} ${isHidden ? styles.hidden : ''}`}
      style={{ maxHeight: isHidden ? 0 : height }}
      ref={resultsContainerRef}
    >
      <ul className={styles.list}>
        {slicedSuggestion.map((suggestion) => {
          const isFavorite = favoriteLocations.some(
            (favoriteLocation) => favoriteLocation.id === suggestion.id
          );
          return (
            <LocationItem
              key={suggestion.id}
              name={suggestion.title}
              description={suggestion.subtitle || ''}
              isFavorite={isFavorite}
              onSelect={() => handleSelect(suggestion.id)}
              onToggleFavorite={() => handleAddFavorite(suggestion.id)}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default SearchResults;
