import React from 'react';
import iconMap from './icons';

export type IconName = keyof typeof iconMap;

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
}

const IconAtom = ({ name, size = 24, ...props }: IconProps) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found.`);
    return null;
  }

  return (
    <IconComponent
      style={{ fontSize: size }}
      aria-hidden="true"
      focusable="false"
      {...props}
    />
  );
};

export default IconAtom;
