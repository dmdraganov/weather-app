import RadioInput from '../../../../shared/ui/RadioInput/RadioInput';
import type { Theme } from '../../model/entities/theme';
import { useTheme } from '../../model/context/useTheme';
import styles from './ThemeSettings.module.scss';
import { useTranslation } from 'react-i18next';
import { I18N_NAMESPACES } from '../../../../shared/config/i18n';

export const ThemeSettings = () => {
  const [theme, setTheme] = useTheme();
  const { t } = useTranslation(I18N_NAMESPACES.theme);

  return (
    <fieldset className={styles.section}>
      <legend className={styles.sectionTitle}>{t('theme')}</legend>
      <div className={styles.radioGroup}>
        <RadioInput<Theme>
          className={styles.radioItem}
          name='theme'
          value='light'
          label={t('light')}
          isChecked={theme === 'light'}
          onSelect={setTheme}
        />
        <RadioInput<Theme>
          className={styles.radioItem}
          name='theme'
          value='dark'
          label={t('dark')}
          isChecked={theme === 'dark'}
          onSelect={setTheme}
        />
        <RadioInput<Theme>
          className={styles.radioItem}
          name='theme'
          value='system'
          label={t('system')}
          isChecked={theme === 'system'}
          onSelect={setTheme}
        />
      </div>
    </fieldset>
  );
};
