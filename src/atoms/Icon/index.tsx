import { FC, ReactNode } from 'react';
import { Box } from '@mui/material';

export interface IconProps {
  children: ReactNode;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  className?: string;
  onClick?: () => void;
}

const Icon: FC<IconProps> = ({
  children,
  size = 'medium',
  color,
  className,
  onClick,
}) => {
  const getSizeValue = () => {
    switch (size) {
      case 'small':
        return '14px';
      case 'large':
        return '24px';
      default:
        return '18px';
    }
  };

  return (
    <Box
      component="span"
      className={className}
      onClick={onClick}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: getSizeValue(),
        color: color || 'currentColor',
        cursor: onClick ? 'pointer' : 'default',
        '& svg': {
          width: '1em',
          height: '1em',
        },
      }}
    >
      {children}
    </Box>
  );
};

export default Icon;
