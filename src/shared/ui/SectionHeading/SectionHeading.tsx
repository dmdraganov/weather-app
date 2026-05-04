import styles from './SectionHeading.module.scss';
import sprite from '../../assets/icons/sprite.svg';

interface IProps {
  iconId: string;
  text: string;
}

const SectionHeading = ({ iconId, text }: IProps) => {
  return (
    <h2 className={styles.sectionHeading}>
      <svg className={styles.icon}>
        <use xlinkHref={sprite + '#' + iconId} />
      </svg>
      {text}
    </h2>
  );
};

export default SectionHeading;
