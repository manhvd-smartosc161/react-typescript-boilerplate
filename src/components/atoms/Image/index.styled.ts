import React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

interface StyledImageProps {
  $width?: number | string;
  $height?: number | string;
  component?: React.ElementType;
  src?: string;
  alt?: string;
}

export const StyledImage = styled(Box)<StyledImageProps>(
  ({ $width, $height }) => ({
    width: $width,
    height: $height,
  }),
);
