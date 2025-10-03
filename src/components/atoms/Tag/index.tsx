import { FC, ReactNode } from 'react';
import { ChipProps } from '@mui/material';
import { StyledTag } from './index.styled';

export interface TagProps
  extends Omit<ChipProps, 'variant' | 'color' | 'children'> {
  children: ReactNode;
  variant?: 'filled' | 'outlined';
  color?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'error'
    | 'info'
    | 'default';
  size?: 'small' | 'medium';
  closable?: boolean;
  onClose?: () => void;
}

const TagAtom: FC<TagProps> = ({
  children,
  variant = 'filled',
  color = 'default',
  size = 'medium',
  closable = false,
  onClose,
  ...props
}) => {
  const muiVariant = variant === 'outlined' ? 'outlined' : 'filled';

  return (
    <StyledTag
      label={children}
      variant={muiVariant}
      $color={color}
      size={size}
      onDelete={closable ? onClose : undefined}
      {...props}
    />
  );
};

export default TagAtom;
