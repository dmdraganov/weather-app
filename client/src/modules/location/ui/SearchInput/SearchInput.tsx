import styles from './SearchInput.module.scss';
import { useTranslation } from 'react-i18next';
import type { KeyboardEvent } from 'react';
import { I18N_NAMESPACES } from '../../../../shared/config/i18n';

interface SearchInputProps {
  query: string;
  setQuery: (query: string) => void;
  onEscape: (e: KeyboardEvent) => void;
  onFocus: () => void;
}

const SearchInput = ({
  query,
  setQuery,
  onEscape,
  onFocus,
}: SearchInputProps) => {
  const { t } = useTranslation(I18N_NAMESPACES.location);

  return (
    <input
      className={styles.inputField}
      type='text'
      placeholder={t('search_placeholder')}
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={onEscape}
      onFocus={onFocus}
    />
  );
};

export default SearchInput;
