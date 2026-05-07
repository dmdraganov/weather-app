import RadioInput from '../../../../shared/ui/RadioInput/RadioInput';
import styles from './LanguageSettings.module.scss';
import type { Language } from '../../localization.model';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../hooks/useLanguage';

export const LanguageSettings = () => {
  const { t } = useTranslation('settings');
  const [language, setLanguage] = useLanguage();

  return (
    <fieldset className={styles.section}>
      <legend className={styles.sectionTitle}>{t('language')}</legend>
      <div className={styles.radioGroup}>
        <RadioInput<Language>
          className={styles.radioItem}
          name='lang'
          value='ru'
          label={t('russian')}
          isChecked={language === 'ru'}
          onSelect={setLanguage}
        />
        <RadioInput<Language>
          className={styles.radioItem}
          name='lang'
          value='en'
          label={t('english')}
          isChecked={language === 'en'}
          onSelect={setLanguage}
        />
      </div>
    </fieldset>
  );
};
