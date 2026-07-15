import styles from './ArrowButton.module.scss';
import ArrowIcon from '../../assets/icons/ui/arrow.svg?react';

interface IProps {
  route?: 'left' | 'right';
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
}

const ArrowButton = ({
  route = 'right',
  onClick,
  disabled = false,
  ariaLabel,
  className = '',
}: IProps) => {
  return (
    <button
      aria-label={ariaLabel ?? (route === 'right' ? 'next' : 'prev')}
      className={`${styles.button} ${className}`}
      disabled={disabled}
      onClick={onClick}
      type='button'
    >
      <ArrowIcon
        className={`${route !== 'right' ? styles.invert : ''} ${styles.icon}`}
      />
    </button>
  );
};

export default ArrowButton;
