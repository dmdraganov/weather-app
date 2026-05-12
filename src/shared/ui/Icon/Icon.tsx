import type { SVGProps } from 'react';
import styles from './Icon.module.scss';
import { iconMap, type IconName } from './icon-map';

export type { IconName };

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName;
}

const Icon = ({ name, className, ...props }: IconProps) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    // Fallback or error logging
    console.warn(`Icon with name "${name}" not found.`);
    return null;
  }

  return (
    <IconComponent className={`${styles.icon} ${className || ''}`} {...props} />
  );
};

export default Icon;
