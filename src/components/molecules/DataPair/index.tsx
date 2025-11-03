import React from 'react';
import { SxProps, Theme } from '@mui/material';
import { LabelAtom, TextAtom } from '@src/components/atoms';
import {
  StyledDataPairStack,
  getDataPairLabelStyles,
  getDataPairTextStyles,
} from './index.styled';

interface DataPairProps {
  label: string;
  value: React.ReactNode;
  direction?: 'column' | 'row';
  sx?: SxProps<Theme>;
  compact?: boolean;
  ellipsis?: boolean;
}

const DataPair: React.FC<DataPairProps> = ({
  label,
  value,
  direction = 'column',
  sx,
  compact = false,
  ellipsis = false,
}) => {
  const isEmpty = value == null || value === '';
  const labelMinWidth =
    direction === 'row' ? (compact ? '180px' : '160px') : 'auto';
  const isRow = direction === 'row';
  const spacing =
    direction === 'row' ? (compact ? 1 : 2) : compact ? 0.5 : 0.75;

  return (
    <StyledDataPairStack
      direction={direction}
      spacing={spacing}
      alignItems="flex-start"
      $direction={direction}
      $isRow={isRow}
      $labelMinWidth={labelMinWidth}
      $compact={compact}
      sx={sx}
    >
      <LabelAtom
        variant={compact ? 'body2' : 'label'}
        sx={getDataPairLabelStyles(labelMinWidth)}
      >
        {label}
      </LabelAtom>
      <TextAtom
        variant="body2"
        sx={getDataPairTextStyles(isEmpty, ellipsis, direction)}
        noWrap={ellipsis}
        title={typeof value === 'string' ? value : undefined}
      >
        {value ?? '—'}
      </TextAtom>
    </StyledDataPairStack>
  );
};

export default DataPair;
