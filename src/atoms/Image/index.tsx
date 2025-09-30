import { FC } from 'react';

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
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={style}
    />
  );
};

export default Image;
