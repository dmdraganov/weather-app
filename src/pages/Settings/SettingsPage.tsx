import { ThemeSettings } from '../../modules/theme/widgets/ThemeSettings/ThemeSettings';
import { LanguageSettings } from '../../modules/localization/widgets/LanguageSettings/LanguageSettings';
import styles from './SettingsPage.module.scss';
import { useTranslation } from 'react-i18next';

const SettingsPage = () => {
  const { t } = useTranslation('shared');

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>{t('settings')}</h1>
      </header>

      <form className={styles.content} onSubmit={(e) => e.preventDefault()}>
        <ThemeSettings />
        <LanguageSettings />
      </form>
    </div>
  );
};

export default SettingsPage;
