import styles from './NavMenu.module.scss';
import LinkButton from '../../../shared/ui/LinkButton/LinkButton';
import { useTranslation } from 'react-i18next';
import { NAV_MENU } from './NavMeny.data';

const NavMenu = () => {
  const { t } = useTranslation('shared');
  return (
    <nav className={styles.navMenu + ' division'}>
      {NAV_MENU.map(({ name, textKey, path }) => (
        <LinkButton key={textKey} to={path} name={name} text={t(textKey)} />
      ))}
    </nav>
  );
};

export default NavMenu;
