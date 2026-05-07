import styles from './NavMenu.module.scss';
import LinkButton from '../LinkButton/LinkButton';
import { useTranslation } from 'react-i18next';

const buttonArr = [
  {
    iconId: 'rain-day',
    text: 'weather',
    path: '/',
  },
  {
    iconId: 'location',
    text: 'cities',
    path: '/location',
  },
  {
    iconId: 'settings',
    text: 'settings',
    path: '/settings',
  },
];

const NavMenu = () => {
  const { t } = useTranslation('shared');
  return (
    <nav className={styles.navMenu + ' division'}>
      {buttonArr.map((element) => (
        <LinkButton
          key={element.text}
          to={element.path}
          iconId={element.iconId}
          text={t(element.text)}
        />
      ))}
    </nav>
  );
};

export default NavMenu;
