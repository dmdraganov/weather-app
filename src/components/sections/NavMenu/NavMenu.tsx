import styles from './NavMenu.module.scss';
import LinkButton from '../../LinkButton/LinkButton';

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
				<img
					className={styles.avatarImage}
					src='/src/assets/images/imageExapmle.jpg'
					alt=''
				/>
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
