import { FC, ReactNode } from 'react';
import { Icon, Text } from '@src/atoms';
import { StyledMenuItem } from './index.styled';

export interface MenuItemProps {
  icon?: ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
  collapsed?: boolean;
}

const MenuItem: FC<MenuItemProps> = ({
  icon,
  label,
  active = false,
  onClick,
  collapsed = false,
}) => {
  return (
    <StyledMenuItem $active={active} onClick={onClick}>
      {icon && <Icon size="medium">{icon}</Icon>}
      {!collapsed && <Text variant="body1">{label}</Text>}
    </StyledMenuItem>
  );
};

export default MenuItem;
