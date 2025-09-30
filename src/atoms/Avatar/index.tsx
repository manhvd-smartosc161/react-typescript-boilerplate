import { FC } from 'react';
import { Avatar as AntAvatar, AvatarProps as AntAvatarProps } from 'antd';
import { StyledAvatar } from './index.styled';

export interface AvatarProps extends Omit<AntAvatarProps, 'shape'> {
  variant?: 'circle' | 'square';
}

const Avatar: FC<AvatarProps> = ({ variant = 'circle', ...props }) => {
  return (
    <StyledAvatar $variant={variant}>
      <AntAvatar shape={variant} {...props} />
    </StyledAvatar>
  );
};

export default Avatar;
