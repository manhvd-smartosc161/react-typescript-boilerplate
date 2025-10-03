import { FC } from 'react';
import { SxProps, Theme } from '@mui/material';
import { StyledLogo } from './index.styled';

export interface LogoProps {
  src?: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  variant?: 'default' | 'icon' | 'text';
  className?: string;
  sx?: SxProps<Theme>;
  onClick?: () => void;
}

const LogoAtom: FC<LogoProps> = ({
  src = '/logo.png',
  alt = 'Logo',
  width = 120,
  height = 40,
  variant = 'default',
  className,
  sx,
  onClick,
}) => {
  return (
    <StyledLogo
      className={className}
      onClick={onClick}
      $width={width}
      $height={height}
      $clickable={!!onClick}
      sx={sx}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          style={{
            width: variant === 'icon' ? height : width,
            height,
            objectFit: 'contain',
          }}
        />
      ) : (
        <span
          style={{
            fontSize: height ? `calc(${height}px * 0.6)` : '24px',
            fontWeight: 700,
          }}
        >
          LOGO
        </span>
      )}
    </StyledLogo>
  );
};

export default LogoAtom;
