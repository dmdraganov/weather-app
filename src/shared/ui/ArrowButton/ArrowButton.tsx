import styles from './ArrowButton.module.scss';
import sprite from '../../assets/icons/sprite.svg';

interface IProps {
  route?: 'left' | 'right';
  onClick?: () => void;
}

const ArrowButton = ({ route = 'right', onClick }: IProps) => {
  return (
    <button
      aria-label={route === 'right' ? 'next' : 'prev'}
      className={styles.button}
      onClick={onClick}
    >
      <svg
        className={`${route !== 'right' ? styles.invert : ''} ${styles.icon}`}
      >
        <use xlinkHref={sprite + '#arrow'} />
      </svg>
    </button>
  );
};

export default ArrowButton;
