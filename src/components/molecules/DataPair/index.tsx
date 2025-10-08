import React from 'react';
import { Stack, SxProps, Theme } from '@mui/material';
import { LabelAtom, TextAtom } from '@src/components/atoms';

interface DataPairProps {
  label: string;
  value: React.ReactNode;
  direction?: 'column' | 'row';
  sx?: SxProps<Theme>;
}

const DataPair: React.FC<DataPairProps> = ({
  label,
  value,
  direction = 'column',
  sx,
}) => {
  return (
    <Stack
      direction={direction}
      spacing={direction === 'row' ? 2 : 0.25}
      sx={sx}
    >
      <LabelAtom
        variant="label"
        sx={{
          minWidth: direction === 'row' ? '120px' : 'auto',
          flexShrink: 0,
        }}
      >
        {label}
      </LabelAtom>
      <TextAtom variant="body2">{value || '—'}</TextAtom>
    </Stack>
  );
};

export default DataPair;
