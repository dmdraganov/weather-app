import {
  useContext,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';
import styles from './SearchLocation.module.scss';
import { useFetch } from '../../../../hooks/useFetch';
import getUrl from '../../../../utilities/urlBuilder';
import type { Location } from '../../../../types/locationApi';
import LocationItem from '../../../../components/LocationItem/LocationItem';
import { LocationContext } from '../../../../contexts/LocationContext';

const SearchLocation = () => {
  const { selectedLocation } = useContext(LocationContext);
  const [inputValue, setInputValue] = useState<string>('');
  const [maxHeight, setMaxHeight] = useState<number>(0);
  const listContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const url = inputValue && getUrl('search', inputValue);
  const locationsList = useFetch<Location[]>(url);

  const updateListHeight = () => {
    const listContainer = listContainerRef.current;
    if (listContainer) setMaxHeight(listContainer.scrollHeight);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const container = containerRef.current;
      if (container && !container.contains(e.target as Node)) setMaxHeight(0);
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    updateListHeight();
  }, [locationsList]);

  useEffect(() => {
    if (!inputValue) setMaxHeight(0);
  }, [inputValue]);

  useEffect(() => {
    if (selectedLocation) inputValue ? setInputValue('') : setMaxHeight(0);
  }, [selectedLocation]);

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
          placeholder='Search location'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => updateListHeight()}
          onKeyDown={handleEscape}
        />
      </div>

      <div
        className={styles.listContainer}
        style={{ maxHeight: maxHeight }}
        ref={listContainerRef}
      >
        {!!locationsList?.length && (
          <ul className={styles.list}>
            {locationsList.map((location) => (
              <LocationItem key={location.id} location={location} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default SearchLocation;
