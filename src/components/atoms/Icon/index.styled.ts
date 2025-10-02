import React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

interface StyledIconProps {
  $size?: 'small' | 'medium' | 'large';
  $color?: string;
  $clickable?: boolean;
  component?: React.ElementType;
}

export const StyledIcon = styled(Box)<StyledIconProps>(({
  $size = 'medium',
  $color,
  $clickable,
}) => {
  const getSizeValue = () => {
    switch ($size) {
      case 'small':
        return '14px';
      case 'large':
        return '24px';
      default:
        return '18px';
    }
  };

  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: getSizeValue(),
    color: $color || 'currentColor',
    cursor: $clickable ? 'pointer' : 'default',
    '& svg': {
      width: '1em',
      height: '1em',
    },
  };
});
