import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeContext from '../../modules/settings/context/ThemeContext';
import RadioInput from '../../shared/ui/RadioInput/RadioInput';
import type { Theme } from '../../modules/settings/types';
import styles from './SettingsPage.module.scss';
import sprite from '../../shared/assets/icons/sprite.svg';

const SettingsPage = () => {
  const [theme, setTheme] = useContext(ThemeContext);
  const navigate = useNavigate();

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
            aria-label='Go back'
          >
            <svg className={styles.arrowIcon}>
              <use xlinkHref={`${sprite}#arrow`} />
            </svg>
          </button>
          <h1 className={styles.title}>Settings</h1>
        </header>

        <form className={styles.content} onSubmit={(e) => e.preventDefault()}>
          <fieldset className={styles.section}>
            <legend className={styles.sectionTitle}>Theme</legend>
            <div className={styles.radioGroup}>
              <RadioInput<Theme>
                className={styles.radioItem}
                name='theme'
                value='light'
                label='Light'
                isChecked={theme === 'light'}
                onSelect={setTheme}
              />
              <RadioInput<Theme>
                className={styles.radioItem}
                name='theme'
                value='dark'
                label='Dark'
                isChecked={theme === 'dark'}
                onSelect={setTheme}
              />
              <RadioInput<Theme>
                className={styles.radioItem}
                name='theme'
                value='system'
                label='System'
                isChecked={theme === 'system'}
                onSelect={setTheme}
              />
            </div>
          </fieldset>

          <fieldset className={styles.section}>
            <legend className={styles.sectionTitle}>Language</legend>
            <div className={styles.radioGroup}>
              <label htmlFor='lang-ru' className={styles.radioItem}>
                <input
                  type='radio'
                  id='lang-ru'
                  name='lang'
                  value='ru'
                  defaultChecked
                />
                Russian
              </label>
              <label htmlFor='lang-en' className={styles.radioItem}>
                <input type='radio' id='lang-en' name='lang' value='en' />
                English
              </label>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
