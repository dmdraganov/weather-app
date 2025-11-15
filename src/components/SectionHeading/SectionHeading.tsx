import styles from './SectionHeading.module.scss';
import sprite from '../../assets/icons/sprite.svg';

interface IProps {
  iconID: string;
  text: string;
}

const SectionHeading = ({ iconID, text }: IProps) => {
  return (
    <h2 className={styles.sectionHeading}>
      <svg className={styles.icon}>
        <use xlinkHref={sprite + '#' + iconID} />
      </svg>
      {text}
    </h2>
  );
};

export default SectionHeading;
