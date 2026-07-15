import type { SVGProps } from 'react';
import styles from './Icon.module.scss';
import { iconMap, iconToneMap, type IconName, type IconTone } from './icon-map';

export type { IconName, IconTone };

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName;
  tone?: IconTone;
}

const Icon = ({ name, tone = iconToneMap[name], className, ...props }: IconProps) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    // Fallback or error logging
    console.warn(`Icon with name "${name}" not found.`);
    return null;
  }

  return (
    <IconComponent
      className={`${styles.icon} ${className || ''}`}
      data-tone={tone}
      {...props}
    />
  );
};

export default Icon;
