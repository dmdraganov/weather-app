import styles from './NavMenu.module.scss';
import LinkButton from '../../LinkButton/LinkButton';
import avatarImage from '/src/assets/images/imageExapmle.jpg';

const buttonArr = [
	{
		iconID: 'rain-day',
		text: 'weather',
	},
	{
		iconID: 'explore',
		text: 'explore',
	},
	{
		iconID: 'location',
		text: 'cities',
	},
	{
		iconID: 'settings',
		text: 'settings',
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
					<LinkButton key={element.text} {...element} />
				))}
			</div>
		</nav>
	);
};

export default NavMenu;
