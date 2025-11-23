import styles from './LinkButton.module.scss';
import sprite from '../../assets/icons/sprite.svg';
import { Link } from 'react-router-dom';

interface IProps {
  iconId: string;
  text: string;
  to: string;
}

const LinkButton = ({ iconId, text, to }: IProps) => {
  return (
    <Link className={styles.linkButton} to={to}>
      <svg className={styles.icon}>
        <use xlinkHref={sprite + '#' + iconId} />
      </svg>
      <span>{text}</span>
    </Link>
  );
};

export default LinkButton;
