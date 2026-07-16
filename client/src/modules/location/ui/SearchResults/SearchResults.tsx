import styles from './SearchResults.module.scss';
import LocationItem from '../LocationItem/LocationItem';
import { memo, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { LocationSuggestion } from '../../model/entities/location-suggestion';
import { useLocationStore } from '../../model/store/store';
import type { Location } from '../../model/entities/location';
import { useGeocodeLocationById } from '../../api/geocode/hooks/useGeocodeLocation';

interface SearchResultsProps {
  results: LocationSuggestion[];
  changeCurrentLocation: (location: Location) => void;
  isHidden: boolean;
  maxLength?: number;
  variant?: 'popover' | 'inline';
}

const SearchResults = memo(
  ({
    results,
    isHidden,
    maxLength = 5,
    changeCurrentLocation,
    variant = 'popover',
  }: SearchResultsProps) => {
    const { mutate: geocodeLocationById } = useGeocodeLocationById();
    const favoriteLocations = useLocationStore(
      (state) => state.favoriteLocations
    );
    const toggleFavorite = useLocationStore((state) => state.toggleFavorite);
    const [height, setHeight] = useState(0);
    const resultsContainerRef = useRef<HTMLDivElement>(null);

    const slicedSuggestions = useMemo(
      () => results.slice(0, maxLength),
      [results, maxLength]
    );

    useLayoutEffect(() => {
      if (resultsContainerRef.current && !isHidden) {
        setHeight(resultsContainerRef.current.scrollHeight);
      }
    }, [results, resultsContainerRef, isHidden]);

    const handleSelect = (id: string) => {
      geocodeLocationById(id, { onSuccess: changeCurrentLocation });
    };

    const handleToggleFavorite = (id: string) => {
      geocodeLocationById(id, { onSuccess: toggleFavorite });
    };

    return (
      <div
        className={`${styles.listContainer} ${styles[variant]} ${isHidden ? styles.hidden : ''}`}
        style={{ maxHeight: isHidden ? 0 : height }}
        ref={resultsContainerRef}
      >
        <ul className={styles.list}>
          {slicedSuggestions.map((suggestion) => {
            const isFavorite = favoriteLocations.some(
              (favoriteLocation) => favoriteLocation.id === suggestion.id
            );
            return (
              <LocationItem
                key={suggestion.id}
                name={suggestion.title}
                description={suggestion.subtitle || ''}
                isFavorite={isFavorite}
                onSelect={() => {
                  handleSelect(suggestion.id);
                }}
                onToggleFavorite={() => handleToggleFavorite(suggestion.id)}
              />
            );
          })}
        </ul>
      </div>
    );
  }
);

export default SearchResults;
