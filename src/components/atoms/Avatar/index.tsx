import { FC } from 'react';
import {
  Avatar as MuiAvatar,
  AvatarProps as MuiAvatarProps,
} from '@mui/material';

export interface AvatarProps extends Omit<MuiAvatarProps, 'variant'> {
  variant?: 'circle' | 'square';
}

const AvatarAtom: FC<AvatarProps> = ({ variant = 'circle', ...props }) => {
  const muiVariant = variant === 'square' ? 'rounded' : 'circular';

  return <MuiAvatar variant={muiVariant} {...props} />;
};

export default AvatarAtom;
