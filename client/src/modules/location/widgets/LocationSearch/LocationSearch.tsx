import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import styles from './LocationSearch.module.scss';
import LocationItem from '../../ui/LocationItem/LocationItem';
import { useSuggestLocations } from '../../hooks/useSuggestLocations';
import { useTranslation } from 'react-i18next';
import { useCurrentLocation } from '../../hooks/useCurrentLocation';
import { useLocationStore } from '../../models/store';
import { useGeocodeLocation } from '../../hooks/useGeocodeLocation';

const LocationSearch = () => {
  const [maxHeight, setMaxHeight] = useState<number>(0);
  const listContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { query, setQuery, data } = useSuggestLocations();
  const { data: geocodeData, setLocationId, setAddress } = useGeocodeLocation();
  const [, setCurrentLocation] = useCurrentLocation();
  const { favoriteLocations, toggleFavorite } = useLocationStore();
  const { t } = useTranslation('location');

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    updateListHeight();
  }, [data]);

  useEffect(() => {
    if (!query) setMaxHeight(0);
  }, [query]);

  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as Node;
    const container = containerRef.current;
    if (!container?.contains(target)) setMaxHeight(0);
  };

  const updateListHeight = () => {
    const listContainer = listContainerRef.current;
    if (listContainer) setMaxHeight(listContainer.scrollHeight);
  };

  const handleEscape = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Escape') return;
    (e.target as HTMLInputElement).blur();
    setMaxHeight(0);
  };

  return (
    <section className={styles.searchContainer} ref={containerRef}>
      <div className={'division ' + styles.inputContainer}>
        <input
          className={styles.inputField}
          type='text'
          placeholder={t('search_placeholder')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => updateListHeight()}
          onKeyDown={handleEscape}
        />
      </div>

      <div
        className={styles.listContainer}
        style={{ maxHeight: maxHeight }}
        ref={listContainerRef}
      >
        {data?.length && (
          <ul className={styles.list}>
            {data.map((suggestion) => {
              const isFavorite = favoriteLocations.some(
                (favoriteLocation) => favoriteLocation.id === suggestion.id
              );
              return (
                <LocationItem
                  key={suggestion.id}
                  name={suggestion.title}
                  description={suggestion.subtitle}
                  isFavorite={isFavorite}
                  onSetCurrentLocation={() => setCurrentLocation(suggestion)}
                  onToggleFavorite={() => toggleFavorite(suggestion)}
                />
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
};

export default LocationSearch;
