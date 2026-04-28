import { useContext } from 'react';
import ThemeContext from '../../contexts/ThemeContext';
import RadioInput from '../../components/RadioInput/RadioInput';
import type { Theme } from '../../types/contexts';

const SettingsPage = () => {
  const [theme, setTheme] = useContext(ThemeContext);

  return (
    <form>
      <fieldset>
        <legend>Theme</legend>
        <RadioInput<Theme>
          name='theme'
          value='light'
          label='Light'
          isChecked={theme === 'light'}
          onSelect={setTheme}
        />
        <RadioInput<Theme>
          name='theme'
          value='dark'
          label='Dark'
          isChecked={theme === 'dark'}
          onSelect={setTheme}
        />
        <RadioInput<Theme>
          name='theme'
          value='system'
          label='System'
          isChecked={theme === 'system'}
          onSelect={setTheme}
        />
      </fieldset>
      <fieldset>
        <legend>Language</legend>
        <input type='radio' id='lang-ru' name='lang' value='ru' />
        <label htmlFor='lang-ru'>Russian</label>
        <input type='radio' id='lang-en' name='lang' value='en' />
        <label htmlFor='lang-en'>English</label>
      </fieldset>
      <button type='submit'>Save</button>
    </form>
  );
};

export default SettingsPage;
