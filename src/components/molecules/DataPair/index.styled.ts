import { styled, SxProps, Theme } from '@mui/material/styles';
import { Stack } from '@mui/material';

interface StyledDataPairStackProps {
  $direction: 'column' | 'row';
  $isRow: boolean;
  $labelMinWidth: string;
  $compact: boolean;
}

export const StyledDataPairStack = styled(Stack)<StyledDataPairStackProps>(
  ({ theme, $isRow, $labelMinWidth, $compact }) => ({
    ...($isRow && {
      width: '100%',
      display: 'grid',
      gridTemplateColumns: `${$labelMinWidth} 1fr`,
      columnGap: $compact ? theme.spacing(1) : theme.spacing(2),
      rowGap: $compact ? theme.spacing(0.5) : theme.spacing(1),
    }),
  }),
);

export const getDataPairLabelStyles = (
  labelMinWidth: string,
): SxProps<Theme> => ({
  minWidth: labelMinWidth,
  flexShrink: 0,
  fontWeight: 600,
  color: 'text.secondary',
});

export const getDataPairTextStyles = (
  isEmpty: boolean,
  ellipsis: boolean,
  direction: 'column' | 'row',
): SxProps<Theme> => ({
  display: 'block',
  color: isEmpty ? 'text.disabled' : 'text.primary',
  overflowWrap: ellipsis ? 'normal' : 'anywhere',
  whiteSpace: ellipsis ? 'nowrap' : 'pre-wrap',
  textOverflow: ellipsis ? 'ellipsis' : 'unset',
  overflow: ellipsis ? 'hidden' : 'visible',
  ...(direction === 'row' && { flexGrow: 1 }),
});
