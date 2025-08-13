import styles from './NavMenu.module.scss';
import LinkButton from '../../LinkButton/LinkButton';
import avatarImage from '/src/assets/images/imageExample.jpg';

const buttonArr = [
	{
		iconID: 'rain-day',
		text: 'weather',
		path: '/',
	},
	{
		iconID: 'explore',
		text: 'explore',
		path: '/explore',
	},
	{
		iconID: 'location',
		text: 'cities',
		path: '/location',
	},
	{
		iconID: 'settings',
		text: 'settings',
		path: '/settings',
	},
];

const NavMenu = () => {
	return (
		<nav
			className={`${styles.navMenu} division flex-container flex-container--column flex-container--vert-align flex-container--space-between`}
		>
			<a href='#'>
				<img className={styles.avatarImage} src={avatarImage} alt='' />
			</a>
			<div
				className={`${styles.buttonsContainer} flex-container flex-container--column`}
			>
				{buttonArr.map(element => (
					<LinkButton key={element.text} to={element.path} {...element} />
				))}
			</div>
		</nav>
	);
};

export default NavMenu;
