import { FC } from 'react';
import { StyledImage } from './index.styled';

export interface ImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

const ImageAtom: FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  style,
}) => {
  return (
    <StyledImage
      component="img"
      src={src}
      alt={alt}
      className={className}
      $width={width}
      $height={height}
      sx={style}
    />
  );
};

export default ImageAtom;
