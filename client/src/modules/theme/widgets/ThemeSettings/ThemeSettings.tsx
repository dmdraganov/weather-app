import RadioInput from '../../../../shared/ui/RadioInput/RadioInput';
import { THEMES, type Theme } from '../../../../shared/theme/theme';
import { useTheme } from '../../../../shared/theme/useTheme';
import styles from './ThemeSettings.module.scss';
import { useTranslation } from 'react-i18next';
import { I18N_NAMESPACES } from '../../../../shared/config/i18n';

export const ThemeSettings = () => {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation(I18N_NAMESPACES.theme);

  return (
    <fieldset className={styles.section}>
      <legend className={styles.sectionTitle}>{t('theme')}</legend>
      <div className={styles.radioGroup}>
        {THEMES.map((themeItem) => (
          <RadioInput<Theme>
            key={themeItem}
            className={styles.radioItem}
            name='theme'
            value={themeItem}
            label={t(themeItem)}
            isChecked={themeItem === theme}
            onSelect={setTheme}
          />
        ))}
      </div>
    </fieldset>
  );
};
