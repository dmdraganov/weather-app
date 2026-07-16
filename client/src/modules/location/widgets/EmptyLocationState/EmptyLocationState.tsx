import { useTranslation } from 'react-i18next';
import { I18N_NAMESPACES } from '../../../../shared/config/i18n';
import Icon from '../../../../shared/ui/Icon/Icon';
import { IconName } from '../../../../shared/ui/Icon/icon-map';
import styles from './EmptyLocationState.module.scss';

interface EmptyLocationStateProps {
  error: string | null;
  isLoading: boolean;
  onRequestLocation: () => void;
}

const EmptyLocationState = ({
  error,
  isLoading,
  onRequestLocation,
}: EmptyLocationStateProps) => {
  const { t } = useTranslation(I18N_NAMESPACES.location);

  return (
    <section className={`${styles.container} division`} aria-labelledby='empty-location-title'>
      <Icon name={IconName.Explore} className={styles.icon} aria-hidden='true' />
      <h1 id='empty-location-title' className={styles.title}>
        {t('quick_location_search_title')}
      </h1>
      <p className={styles.description}>{t('empty_location_description')}</p>
      <button
        className={styles.action}
        type='button'
        onClick={onRequestLocation}
        disabled={isLoading}
      >
        {isLoading ? t('locating_current_location') : t('use_current_location')}
      </button>
      {error && (
        <p className={styles.error} role='status'>
          {t('geolocation_error')}
        </p>
      )}
    </section>
  );
};

export default EmptyLocationState;
