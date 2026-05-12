import { useNavigate } from 'react-router-dom';
import { ThemeSettings } from '../../modules/theme/widgets/ThemeSettings/ThemeSettings';
import { LanguageSettings } from '../../modules/localization/widgets/LanguageSettings/LanguageSettings';
import styles from './SettingsPage.module.scss';
import ArrowIcon from '../../shared/assets/icons/ui/arrow.svg?react';
import { useTranslation } from 'react-i18next';

const SettingsPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('shared');

  const handleBack = () => {
    void navigate(-1);
  };

  return (
    <div className={styles.page}>
      <div className='container'>
        <header className={styles.header}>
          <button
            className={styles.backButton}
            onClick={handleBack}
            aria-label={t('go_back')}
          >
            <ArrowIcon className={styles.arrowIcon} />
          </button>
          <h1 className={styles.title}>{t('settings')}</h1>
        </header>

        <form className={styles.content} onSubmit={(e) => e.preventDefault()}>
          <ThemeSettings />
          <LanguageSettings />
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
