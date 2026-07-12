import styles from './SearchResults.module.scss';
import LocationItem from '../LocationItem/LocationItem';
import {
  memo,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { LocationSuggestion } from '../../model/entities/location-suggestion';
import { useLocationStore } from '../../model/store/store';
import type { Location } from '../../model/entities/location';
import { useGeocodeLocationById } from '../../api/geocode/hooks/useGeocodeLocation';

type ActionType = 'select' | 'toggleFavorite';

interface SearchResultsProps {
  results: LocationSuggestion[];
  setCurrentLocation: (location: Location) => void;
  isHidden: boolean;
  maxLength?: number;
}

const SearchResults = memo(
  ({
    results,
    isHidden,
    maxLength = 5,
    setCurrentLocation,
  }: SearchResultsProps) => {
    const { setLocationId, data } = useGeocodeLocationById();
    const [action, setAction] = useState<ActionType | null>(null);
    const { favoriteLocations, toggleFavorite } = useLocationStore();
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
      setLocationId(id);
      setAction('select');
    };

    const handleToggleFavorite = (id: string) => {
      setLocationId(id);
      setAction('toggleFavorite');
    };

    useEffect(() => {
      if (!data) return;

      switch (action) {
        case 'select':
          setCurrentLocation(data);
          break;
        case 'toggleFavorite':
          toggleFavorite(data);
          break;
      }
    }, [data, action, setCurrentLocation, toggleFavorite]);

    return (
      <div
        className={`${styles.listContainer} ${isHidden ? styles.hidden : ''}`}
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
