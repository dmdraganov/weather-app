import styles from './ArrowButton.module.scss';
import ArrowIcon from '../../assets/icons/ui/arrow.svg?react';

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
      <ArrowIcon
        className={`${route !== 'right' ? styles.invert : ''} ${styles.icon}`}
      />
    </button>
  );
};

export default ArrowButton;
