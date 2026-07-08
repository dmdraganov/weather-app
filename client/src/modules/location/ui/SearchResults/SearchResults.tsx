import styles from './SearchResults.module.scss';
import LocationItem from '../LocationItem/LocationItem';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { LocationSuggestion } from '../../model/entities/location-suggestion';
import { useLocationStore } from '../../model/store/store';
import { useGeocodeLocation } from '../../api/geocode/hooks/useGeocodeLocation';
import type { Location } from '../../model/entities/location';

interface SearchResultsProps {
  results: LocationSuggestion[];
  setCurrentLocation: (location: Location) => void;
  isHidden: boolean;
  maxLength?: number;
}

const SearchResults = ({
  results,
  isHidden,
  maxLength = 5,
  setCurrentLocation,
}: SearchResultsProps) => {
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
  };

  const handleAddFavorite = (id: string) => {
    setLocationId(id);
  };

  useEffect(() => {
    if (!data) return;
    setCurrentLocation(data);
    toggleFavorite(data);
  }, [data, setCurrentLocation, toggleFavorite]);

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
