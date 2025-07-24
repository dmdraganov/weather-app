import styles from './LinkButton.module.scss';
import sprite from '../../assets/icons/sprite.svg';

interface IProps {
	iconID: string;
	text: string;
}

const LinkButton = ({ iconID, text }: IProps) => {
	return (
		<button className={styles.button}>
			<svg className={styles.icon}>
				<use xlinkHref={sprite + '#' + iconID} />
			</svg>
			<span>{text}</span>
		</button>
	);
};

export default LinkButton;
