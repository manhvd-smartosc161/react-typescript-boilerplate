import { FC, ReactNode } from 'react';
import { Badge as AntBadge, BadgeProps as AntBadgeProps } from 'antd';

export interface BadgeProps extends AntBadgeProps {
  children?: ReactNode;
}

const Badge: FC<BadgeProps> = ({ children, ...props }) => {
  return <AntBadge {...props}>{children}</AntBadge>;
};

export default Badge;
