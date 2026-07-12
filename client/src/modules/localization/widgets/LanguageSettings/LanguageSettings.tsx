import RadioInput from '../../../../shared/ui/RadioInput/RadioInput';
import styles from './LanguageSettings.module.scss';
import type { Language } from '../../localization.model';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../hooks/useLanguage';
import { LANGUAGE_SETTINGS } from './LanguageSettings.data';
import { I18N_NAMESPACES } from '../../../../shared/config/i18n';

export const LanguageSettings = () => {
  const { t } = useTranslation(I18N_NAMESPACES.localization);
  const [language, setLanguage] = useLanguage();

  return (
    <fieldset className={styles.section}>
      <legend className={styles.sectionTitle}>{t('language')}</legend>
      <div className={styles.radioGroup}>
        {LANGUAGE_SETTINGS.map(({ value, labelKey }) => (
          <RadioInput<Language>
            key={labelKey}
            className={styles.radioItem}
            name='lang'
            value={value}
            label={t(labelKey)}
            isChecked={value === language}
            onSelect={setLanguage}
          />
        ))}
      </div>
    </fieldset>
  );
};
