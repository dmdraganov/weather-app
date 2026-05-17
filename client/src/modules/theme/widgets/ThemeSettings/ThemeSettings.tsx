import RadioInput from '../../../../shared/ui/RadioInput/RadioInput';
import type { Theme } from '../../theme.model';
import { useTheme } from '../../hooks/useTheme';
import styles from './ThemeSettings.module.scss';
import { useTranslation } from 'react-i18next';

export const ThemeSettings = () => {
  const [theme, setTheme] = useTheme();
  const { t } = useTranslation('settings');

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
