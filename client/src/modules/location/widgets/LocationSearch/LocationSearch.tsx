import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import styles from './LocationSearch.module.scss';
import { useSuggestLocations } from '../../api/suggestion/useSuggestLocations';
import SearchResults from '../../ui/SearchResults/SearchResults';
import SearchInput from '../../ui/SearchInput/SearchInput';
import { useLocationStore } from '../../model/store/store';

const LocationSearch = () => {
  const { query, setQuery, data, error } = useSuggestLocations();
  const { setCurrentLocation } = useLocationStore();
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
    <section className={styles.searchContainer} ref={containerRef}>
      <div className={'division ' + styles.inputContainer}>
        <SearchInput
          query={query}
          setQuery={setQuery}
          onEscape={handleEscape}
          onFocus={() => setIsHidden(false)}
        />
        {error && <p>{error.message}</p>}
      </div>

      {data && (
        <div className={styles.searchResults}>
          <SearchResults
            results={data}
            setCurrentLocation={setCurrentLocation}
            isHidden={isHidden || !query || data.length === 0}
          />
        </div>
      )}
    </section>
  );
};

export default LocationSearch;
