import { useEffect, useRef, useState } from 'react';
import styles from './SearchLocation.module.scss';
import { useFetch } from '../../../../hooks/useFetch';
import getUrl from '../../../../utilities/urlBuilder';
import type { Location } from '../../../../types/locationApi';
import LocationItem from '../../../../components/LocationItem/LocationItem';

const SearchLocation = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [maxHeight, setMaxHeight] = useState<number>(0);
  const listContainerRef = useRef<HTMLDivElement>(null);

  const url = inputValue && getUrl('search', inputValue);
  const locationsList = useFetch<Location[]>(url);

  useEffect(() => {
    const listContainer = listContainerRef.current;
    if (listContainer) setMaxHeight(listContainer.scrollHeight);
  }, [locationsList]);

  useEffect(() => {
    if (!inputValue) setMaxHeight(0);
  }, [inputValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);

  return (
    <section className={styles.searchContainer}>
      <div className={'division ' + styles.inputContainer}>
        <input
          onChange={handleInputChange}
          className={styles.inputField}
          type='text'
          placeholder='Search location'
          value={inputValue}
        />
      </div>

      {!!locationsList?.length && (
        <div
          className={styles.listContainer}
          style={{ maxHeight: maxHeight }}
          ref={listContainerRef}
        >
          <ul className={styles.list}>
            {locationsList.map((location) => (
              <LocationItem key={location.id} location={location} />
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default SearchLocation;
