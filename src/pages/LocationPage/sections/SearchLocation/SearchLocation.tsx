import { useEffect, useRef, useState } from 'react';
import styles from './SearchLocation.module.scss';
import { useFetch } from '../../../../hooks/useFetch';
import getUrl from '../../../../utilities/urlBuilder';
import type { Location } from '../../../../types/locationApi';
import LocationItem from '../../../../components/LocationItem/LocationItem';

const SearchLocation = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [maxHeight, setMaxHeight] = useState<number>(0);
  const resultListRef = useRef<HTMLUListElement>(null);

  const url = getUrl('search', inputValue || ' ');
  const locationsList = useFetch<Location[]>(url);

  useEffect(() => {
    const resultList = resultListRef.current;
    if (resultList) setMaxHeight(resultList!.scrollHeight);
  }, [locationsList]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

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

      <ul
        className={'division ' + styles.list}
        ref={resultListRef}
        style={{ maxHeight: maxHeight }}
      >
        {locationsList &&
          inputValue &&
          locationsList.map((location, i) => (
            <LocationItem
              key={location.id}
              location={location}
              isFirst={i === 0}
            />
          ))}
      </ul>
    </section>
  );
};

export default SearchLocation;
