import { styled, Stack, Box } from '@mui/material';
import { TextAtom } from '@src/components/atoms';
import type { StepStatus } from './index';

export const StyledRoot = styled(Stack)<{ $status: StepStatus }>(() => ({
  cursor: 'pointer',
  userSelect: 'none',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
}));

export const StyledIconContainer = styled(Box)<{ $status: StepStatus }>(
  ({ theme, $status }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    borderRadius: '50%',
    backgroundColor:
      $status === 'locked'
        ? theme.palette.grey[200]
        : theme.palette.primary.main,
  }),
);

export const StyledLabel = styled(TextAtom)<{ $status: StepStatus }>(
  ({ theme, $status }) => ({
    fontWeight: $status === 'active' ? 'bold' : 'normal',
    color:
      $status === 'locked'
        ? theme.palette.text.secondary
        : theme.palette.text.primary,
  }),
);
