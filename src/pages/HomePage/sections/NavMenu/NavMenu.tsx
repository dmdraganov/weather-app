import styles from './NavMenu.module.scss';
import LinkButton from '../../../../components/LinkButton/LinkButton';

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
  return (
    <nav className={styles.navMenu + ' division'}>
      {buttonArr.map((element) => (
        <LinkButton key={element.text} to={element.path} {...element} />
      ))}
    </nav>
  );
};

export default NavMenu;
