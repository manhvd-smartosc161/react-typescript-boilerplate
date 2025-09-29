import { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Skeleton } from 'antd';

interface ImageProps {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  fallbackSrc?: string;
  className?: string;
  onClick?: () => void;
  lazy?: boolean;
}

const StyledImageWrapper = styled.div<{
  $width?: string | number;
  $height?: string | number;
}>`
  position: relative;
  width: ${({ $width }) =>
    typeof $width === 'number' ? `${$width}px` : $width || '100%'};
  height: ${({ $height }) =>
    typeof $height === 'number' ? `${$height}px` : $height || 'auto'};
  overflow: hidden;
  border-radius: 4px;
  background-color: #f5f5f5;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const StyledImage = styled.img<{ $objectFit?: string }>`
  width: 100%;
  height: 100%;
  object-fit: ${({ $objectFit }) => $objectFit || 'cover'};
  transition: opacity 0.3s ease;
`;

const Image: FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  objectFit = 'cover',
  fallbackSrc = '/images/image-placeholder.png',
  className,
  onClick,
  lazy = true,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>(src);

  useEffect(() => {
    setImageSrc(src);
    setLoading(true);
    setError(false);
  }, [src]);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setError(true);
    setLoading(false);
    if (fallbackSrc && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
    } else {
      // console.error(`Failed to load image: ${src}`);
    }
  };

  return (
    <StyledImageWrapper
      $width={width}
      $height={height}
      className={className}
      onClick={onClick}
    >
      {loading && (
        <Skeleton.Image active style={{ width: '100%', height: '100%' }} />
      )}

      <StyledImage
        src={imageSrc}
        alt={alt}
        $objectFit={objectFit}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          display: loading ? 'none' : 'block',
          opacity: error && imageSrc === fallbackSrc ? 0.6 : 1,
        }}
        loading={lazy ? 'lazy' : 'eager'}
      />
    </StyledImageWrapper>
  );
};

export default Image;
