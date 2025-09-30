import { FC } from 'react';
import { Box } from '@mui/material';

export interface ImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

const Image: FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  style,
}) => {
  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      className={className}
      sx={{
        width,
        height,
        ...style,
      }}
    />
  );
};

export default Image;
