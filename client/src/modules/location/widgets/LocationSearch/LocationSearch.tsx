import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import styles from './LocationSearch.module.scss';
import { useSuggestLocations } from '../../api/suggestion/useSuggestLocations';
import SearchResults from '../../ui/SearchResults/SearchResults';
import SearchInput from '../../ui/SearchInput/SearchInput';
import { useChangeCurrentLocation } from '../../hooks/useChangeLocation';

interface LocationSearchProps {
  syncUrl?: boolean;
  autoFocus?: boolean;
  variant?: 'popover' | 'inline';
}

const LocationSearch = ({
  syncUrl = false,
  autoFocus = false,
  variant = 'popover',
}: LocationSearchProps) => {
  const { query, setQuery, data, error } = useSuggestLocations();
  const changeCurrentLocation = useChangeCurrentLocation({ syncUrl });
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleEscape = (e: KeyboardEvent) => {
    if (e.key !== 'Escape') return;
    (e.target as HTMLInputElement).blur();
    setIsHidden(true);
  };

  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as Node;

    if (!containerRef.current?.contains(target)) setIsHidden(true);
  };

  return (
    <section
      className={`${styles.searchContainer} ${variant === 'inline' ? styles.inline : ''}`}
      ref={containerRef}
    >
      <div
        className={`${styles.inputContainer} ${variant === 'popover' ? 'division' : ''}`}
      >
        <SearchInput
          query={query}
          setQuery={setQuery}
          onEscape={handleEscape}
          onFocus={() => setIsHidden(false)}
          autoFocus={autoFocus}
        />
        {error && <p>{error.message}</p>}
      </div>

      {data && (
        <div className={styles.searchResults}>
          <SearchResults
            results={data}
            changeCurrentLocation={changeCurrentLocation}
            isHidden={isHidden || !query || data.length === 0}
            variant={variant}
          />
        </div>
      )}
    </section>
  );
};

export default LocationSearch;
